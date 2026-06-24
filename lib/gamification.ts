import { prisma } from './prisma'
import { XP_VALUES } from './roadmap-data'
import type {
  ActivityLogType,
  ProfileLevel,
} from '@/types/roadmap'

const isDatabaseUnavailable = (error: unknown) => {
  const code = (error as { code?: string })?.code
  const message = error instanceof Error ? error.message : ''
  const normalizedMessage = message.toLowerCase()

  return (
    code?.startsWith('P10') ||
    code === 'P2021' ||
    code === 'P2022' ||
    normalizedMessage.includes('database_url') ||
    normalizedMessage.includes('does not exist') ||
    normalizedMessage.includes('can\'t reach database') ||
    normalizedMessage.includes('relation') ||
    normalizedMessage.includes('table') ||
    normalizedMessage.includes('prepared statement') ||
    normalizedMessage.includes('pgbouncer')
  )
}

const hasDatabaseConfig = () => Boolean(process.env.DATABASE_URL || process.env.STORAGE_POSTGRES_PRISMA_URL)

const getEmptyUserStats = () => ({
  user: {
    name: 'Utilisateur',
    email: 'default@example.com',
    createdAt: new Date(),
  },
  progress: {
    xp: 0,
    level: 1,
    currentStreak: 0,
    bestStreak: 0,
    dailyGoal: 3,
    profileLevel: 'beginner',
  },
  stats: {
    totalTasks: 0,
    totalProjects: 0,
    totalPhases: 0,
    recentActivity: [],
  },
})

// ============================================
// LEVEL THRESHOLDS
// ============================================

export const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  900,    // Level 5
  1400,   // Level 6
  2000,   // Level 7
  2800,   // Level 8
  3800,   // Level 9
  5000,   // Level 10
]

// After level 10, use progressive formula
// Level N requires: 5000 + (N - 10) * 1000 XP
export const getLevelFromXP = (xp: number): number => {
  if (xp < LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]) {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (xp >= LEVEL_THRESHOLDS[i]) {
        return i + 1
      }
    }
    return 1
  }
  // For levels above 10
  const levelAbove10 = Math.floor((xp - 5000) / 1000) + 11
  return levelAbove10
}

export const getXPForNextLevel = (currentLevel: number): number => {
  if (currentLevel < LEVEL_THRESHOLDS.length) {
    return LEVEL_THRESHOLDS[currentLevel] - LEVEL_THRESHOLDS[currentLevel - 1]
  }
  // For levels above 10
  return 1000
}

export const getXPToNextLevel = (xp: number): number => {
  const currentLevel = getLevelFromXP(xp)
  if (currentLevel < LEVEL_THRESHOLDS.length) {
    return LEVEL_THRESHOLDS[currentLevel] - xp
  }
  // For levels above 10
  const nextLevelThreshold = 5000 + (currentLevel - 10) * 1000
  return nextLevelThreshold - xp
}

// ============================================
// XP AWARD FUNCTIONS
// ============================================

export const awardXP = async (
  userId: string,
  type: ActivityLogType,
  xp: number,
  metadata: Record<string, unknown> = {}
) => {
  const userProgress = await prisma.userProgress.upsert({
    where: { userId },
    update: {},
    create: {
      userId,
      xp: 0,
      level: 1,
      currentStreak: 0,
      bestStreak: 0,
      dailyGoal: 3,
      profileLevel: 'beginner' as ProfileLevel,
    },
  })

  const newXP = userProgress.xp + xp
  const newLevel = getLevelFromXP(newXP)

  // Update user progress
  await prisma.userProgress.update({
    where: { userId },
    data: {
      xp: newXP,
      level: newLevel,
      lastActiveDate: new Date(),
    },
  })

  // Create activity log
  await prisma.activityLog.create({
    data: {
      userId,
      type,
      xp,
      metadata: metadata as unknown as Record<string, unknown>,
    },
  })

  return { xp: newXP, level: newLevel }
}

// ============================================
// DAILY GOAL
// ============================================

export const checkDailyGoal = async (userId: string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const logs = await prisma.activityLog.count({
    where: {
      userId,
      date: { gte: today },
      type: { in: ['task_completed', 'project_completed'] },
    },
  })

  const userProgress = await prisma.userProgress.findUnique({
    where: { userId },
  })

  if (!userProgress) return false

  return logs >= userProgress.dailyGoal
}

export const awardDailyGoalXP = async (userId: string) => {
  const goalCompleted = await checkDailyGoal(userId)
  
  if (goalCompleted) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const existingLog = await prisma.activityLog.findFirst({
      where: {
        userId,
        date: { gte: today },
        type: 'daily_goal',
      },
    })

    if (!existingLog) {
      await awardXP(userId, 'daily_goal', XP_VALUES.dailyGoal, {
        goal: 'daily',
      })
      return true
    }
  }
  return false
}

// ============================================
// STREAK MANAGEMENT
// ============================================

export const updateStreak = async (userId: string) => {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  yesterday.setHours(0, 0, 0, 0)

  const userProgress = await prisma.userProgress.findUnique({
    where: { userId },
  })

  if (!userProgress) {
    await prisma.userProgress.create({
      data: {
        userId,
        xp: 0,
        level: 1,
        currentStreak: 1,
        bestStreak: 1,
        dailyGoal: 3,
        profileLevel: 'beginner' as ProfileLevel,
        lastActiveDate: today,
      },
    })
    return { currentStreak: 1, bestStreak: 1, streakIncreased: true }
  }

  const lastActive = userProgress.lastActiveDate
    ? new Date(userProgress.lastActiveDate)
    : null

  let newCurrentStreak = userProgress.currentStreak
  let newBestStreak = userProgress.bestStreak

  if (!lastActive) {
    // First activity
    newCurrentStreak = 1
    newBestStreak = Math.max(newBestStreak, 1)
  } else {
    const lastActiveDate = new Date(lastActive)
    lastActiveDate.setHours(0, 0, 0, 0)

    if (lastActiveDate.getTime() === yesterday.getTime()) {
      // Continued streak
      newCurrentStreak = userProgress.currentStreak + 1
      newBestStreak = Math.max(userProgress.bestStreak, newCurrentStreak)
    } else if (lastActiveDate.getTime() < yesterday.getTime()) {
      // Broken streak
      newCurrentStreak = 1
    }
    // If lastActive is today, no change needed
  }

  await prisma.userProgress.update({
    where: { userId },
    data: {
      currentStreak: newCurrentStreak,
      bestStreak: newBestStreak,
      lastActiveDate: today,
    },
  })

  return {
    currentStreak: newCurrentStreak,
    bestStreak: newBestStreak,
    streakIncreased: newCurrentStreak > userProgress.currentStreak,
  }
}

// ============================================
// XP CALCULATION FOR ACTIONS
// ============================================

export const getXPForAction = (type: string, difficulty?: string) => {
  switch (type) {
    case 'task_completed':
      return XP_VALUES.task
    case 'module_completed':
      return XP_VALUES.module
    case 'phase_completed':
      return XP_VALUES.phase
    case 'project_completed':
      switch (difficulty) {
        case 'easy':
          return XP_VALUES.project.easy
        case 'medium':
          return XP_VALUES.project.medium
        case 'hard':
          return XP_VALUES.project.hard
        default:
          return XP_VALUES.project.easy
      }
    case 'daily_goal':
      return XP_VALUES.dailyGoal
    case 'capstone':
      return XP_VALUES.capstone
    default:
      return 0
  }
}

// ============================================
// Get user stats
// ============================================

export const getUserStats = async (userId: string) => {
  if (!hasDatabaseConfig()) return getEmptyUserStats()

  try {
    const userProgress = await prisma.userProgress.findUnique({
      where: { userId },
      include: {
        user: {
          select: { name: true, email: true, createdAt: true },
        },
      },
    })

    if (!userProgress) {
      return getEmptyUserStats()
    }

    const totalTasks = await prisma.taskProgress.count({
      where: { userId, completed: true },
    })

    const totalProjects = await prisma.projectProgress.count({
      where: { userId, status: 'completed' },
    })

    const totalPhases = await prisma.phaseProgress.count({
      where: { userId, status: 'completed' },
    })

    const recentActivity = await prisma.activityLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    return {
      user: userProgress.user,
      progress: userProgress,
      stats: {
        totalTasks,
        totalProjects,
        totalPhases,
        recentActivity,
      },
    }
  } catch (error) {
    if (isDatabaseUnavailable(error)) return getEmptyUserStats()
    throw error
  }
}
