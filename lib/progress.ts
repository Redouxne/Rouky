import { prisma } from './prisma'
import { roadmap, phases } from './roadmap-data'
import { awardXP, updateStreak, getUserStats } from './gamification'
//import { awardXP, updateStreak, checkAndAwardBadges, getUserStats } from './gamification' checkAndAwardBadges pas encore implémenté
import { checkBadgeRequirements } from './badges'
import type {
  PhaseStatus,
  ProjectStatus,
  ProfileLevel,
  ActivityLogType,
} from '@/types/roadmap'

// ============================================
// DEFAULT USER ID
// ============================================

export const DEFAULT_USER_ID = 'default-user'

// ============================================
// INITIALIZE DEFAULT USER
// ============================================

export const initializeDefaultUser = async () => {
  const existingUser = await prisma.user.findUnique({
    where: { id: DEFAULT_USER_ID },
  })

  if (!existingUser) {
    await prisma.user.create({
      data: {
        id: DEFAULT_USER_ID,
        name: 'Utilisateur',
        email: 'default@example.com',
      },
    })

    // Initialize user progress
    await prisma.userProgress.upsert({
      where: { userId: DEFAULT_USER_ID },
      update: {},
      create: {
        userId: DEFAULT_USER_ID,
        xp: 0,
        level: 1,
        currentStreak: 0,
        bestStreak: 0,
        dailyGoal: 3,
        profileLevel: 'beginner' as ProfileLevel,
      },
    })
  }

  return DEFAULT_USER_ID
}

// ============================================
// GET USER ID (for now, always return default user)
// ============================================

export const getCurrentUserId = async () => {
  await initializeDefaultUser()
  return DEFAULT_USER_ID
}

// ============================================
// PHASE PROGRESS
// ============================================

export const getPhaseProgress = async (userId: string, phaseId: string) => {
  const phase = phases.find(p => p.id === phaseId)
  if (!phase) return null

  const phaseProgress = await prisma.phaseProgress.findUnique({
    where: { userId_phaseId: { userId, phaseId } },
  })

  const taskProgresses = await prisma.taskProgress.findMany({
    where: { userId },
  })

  const completedTasks = taskProgresses.filter(tp => tp.completed).length
  const totalTasks = phase.tasks.length
  const progressPercent = Math.round((completedTasks / totalTasks) * 100)

  // Check if at least one project is completed
  const projectProgresses = await prisma.projectProgress.findMany({
    where: { userId, projectId: { startsWith: `${phaseId}-` } },
  })
  const hasCompletedProject = projectProgresses.some(pp => pp.status === 'completed')

  // Determine status
  let status: PhaseStatus = 'locked'
  
  if (phaseProgress?.status === 'completed') {
    status = 'completed'
  } else if (completedTasks === totalTasks && hasCompletedProject) {
    status = 'completed'
  } else if (completedTasks > 0 || phaseProgress?.status === 'in_progress') {
    status = 'in_progress'
  } else {
    // Check if previous phase is completed to unlock
    const phaseNumber = phase.phaseNumber
    if (phaseNumber === 0 || phaseProgress?.status === 'available') {
      status = 'available'
    } else {
      const previousPhaseId = `phase-${phaseNumber - 1}`
      const previousPhaseProgress = await prisma.phaseProgress.findUnique({
        where: { userId_phaseId: { userId, phaseId: previousPhaseId } },
      })
      if (previousPhaseProgress?.status === 'completed') {
        status = 'available'
      }
    }
  }

  return {
    ...phase,
    userProgress: {
      status,
      progressPercent,
      completedTasks,
      totalTasks,
      hasCompletedProject,
      completedAt: phaseProgress?.completedAt || null,
    },
  }
}

// ============================================
// TASK PROGRESS
// ============================================

export const toggleTaskProgress = async (
  userId: string,
  taskId: string,
  phaseId: string
) => {
  const taskProgress = await prisma.taskProgress.findUnique({
    where: { userId_taskId: { userId, taskId } },
  })

  const task = phases
    .find(p => p.id === phaseId)
    ?.tasks.find(t => t.id === taskId)

  if (!task) throw new Error('Task not found')

  let xpAwarded = 0
  let newStatus: boolean

  if (taskProgress) {
    // Toggle existing task
    newStatus = !taskProgress.completed
    
    if (newStatus) {
      // Already completed before, don't award XP again
      xpAwarded = taskProgress.xpAwarded > 0 ? 0 : task.xp
    }

    await prisma.taskProgress.update({
      where: { userId_taskId: { userId, taskId } },
      data: {
        completed: newStatus,
        completedAt: newStatus ? new Date() : null,
        xpAwarded: newStatus && xpAwarded > 0 ? task.xp : 0,
      },
    })
  } else {
    // Create new task progress
    newStatus = true
    xpAwarded = task.xp

    await prisma.taskProgress.create({
      data: {
        userId,
        taskId,
        completed: true,
        completedAt: new Date(),
        xpAwarded: task.xp,
      },
    })
  }

  // Update phase progress
  await updatePhaseProgress(userId, phaseId)

  // Award XP if earned
  if (newStatus && xpAwarded > 0) {
    await awardXP(userId, 'task_completed', xpAwarded, {
      taskId,
      phaseId,
    })
    await updateStreak(userId)
    await checkAndAwardBadges(userId)
  }

  return { completed: newStatus, xpAwarded }
}

// ============================================
// PHASE PROGRESS UPDATE
// ============================================

export const updatePhaseProgress = async (userId: string, phaseId: string) => {
  const phase = phases.find(p => p.id === phaseId)
  if (!phase) return

  const taskProgresses = await prisma.taskProgress.findMany({
    where: { userId, taskId: { startsWith: `${phaseId}-` } },
  })

  const completedTasks = taskProgresses.filter(tp => tp.completed).length
  const totalTasks = phase.tasks.length
  const progressPercent = Math.round((completedTasks / totalTasks) * 100)

  const projectProgresses = await prisma.projectProgress.findMany({
    where: { userId, projectId: { startsWith: `${phaseId}-` } },
  })
  const hasCompletedProject = projectProgresses.some(pp => pp.status === 'completed')

  let status: PhaseStatus = 'locked'
  
  if (completedTasks === totalTasks && hasCompletedProject) {
    status = 'completed'
  } else if (completedTasks > 0) {
    status = 'in_progress'
  } else {
    // Check if previous phase is completed
    const phaseNumber = phase.phaseNumber
    if (phaseNumber === 0) {
      status = 'available'
    } else {
      const previousPhaseId = `phase-${phaseNumber - 1}`
      const previousPhaseProgress = await prisma.phaseProgress.findUnique({
        where: { userId_phaseId: { userId, phaseId: previousPhaseId } },
      })
      if (previousPhaseProgress?.status === 'completed') {
        status = 'available'
      }
    }
  }

  await prisma.phaseProgress.upsert({
    where: { userId_phaseId: { userId, phaseId } },
    update: {
      status,
      progressPercent,
      completedAt: status === 'completed' ? new Date() : null,
    },
    create: {
      userId,
      phaseId,
      status,
      progressPercent,
      completedAt: status === 'completed' ? new Date() : null,
    },
  })

  // If phase just completed, award XP
  if (status === 'completed') {
    const existingPhaseProgress = await prisma.phaseProgress.findUnique({
      where: { userId_phaseId: { userId, phaseId } },
    })
    
    if (existingPhaseProgress?.completedAt) {
      // Already completed, don't award again
      return
    }

    await awardXP(userId, 'phase_completed', 100, {
      phaseId,
    })
    await checkAndAwardBadges(userId)
  }
}

// ============================================
// PROJECT PROGRESS
// ============================================

export const getProjectProgress = async (userId: string, projectId: string) => {
  const projectProgress = await prisma.projectProgress.findUnique({
    where: { userId_projectId: { userId, projectId } },
  })

  // Find which phase this project belongs to
  let phaseId = ''
  for (const phase of phases) {
    if (phase.projects.easy.id === projectId || 
        phase.projects.medium.id === projectId || 
        phase.projects.hard.id === projectId) {
      phaseId = phase.id
      break
    }
  }

  return {
    projectId,
    phaseId,
    status: projectProgress?.status || 'not_started',
    startedAt: projectProgress?.startedAt || null,
    completedAt: projectProgress?.completedAt || null,
  }
}

export const startProject = async (userId: string, projectId: string) => {
  const existingProgress = await prisma.projectProgress.findUnique({
    where: { userId_projectId: { userId, projectId } },
  })

  if (existingProgress && existingProgress.status === 'in_progress') {
    return { success: false, message: 'Projet déjà commencé' }
  }

  await prisma.projectProgress.upsert({
    where: { userId_projectId: { userId, projectId } },
    update: {
      status: 'in_progress',
      startedAt: new Date(),
      completedAt: null,
    },
    create: {
      userId,
      projectId,
      status: 'in_progress',
      startedAt: new Date(),
    },
  })

  return { success: true }
}

export const completeProject = async (userId: string, projectId: string) => {
  // Find the project to get its XP value
  let projectXP = 75 // default to easy
  let projectDifficulty: string = 'easy'
  let phaseId = ''

  for (const phase of phases) {
    if (phase.projects.easy.id === projectId) {
      projectXP = phase.projects.easy.xp
      projectDifficulty = 'easy'
      phaseId = phase.id
      break
    } else if (phase.projects.medium.id === projectId) {
      projectXP = phase.projects.medium.xp
      projectDifficulty = 'medium'
      phaseId = phase.id
      break
    } else if (phase.projects.hard.id === projectId) {
      projectXP = phase.projects.hard.xp
      projectDifficulty = 'hard'
      phaseId = phase.id
      break
    }
  }

  const existingProgress = await prisma.projectProgress.findUnique({
    where: { userId_projectId: { userId, projectId } },
  })

  if (existingProgress?.status === 'completed') {
    return { success: false, message: 'Projet déjà validé', xpAwarded: 0 }
  }

  await prisma.projectProgress.upsert({
    where: { userId_projectId: { userId, projectId } },
    update: {
      status: 'completed',
      completedAt: new Date(),
      xpAwarded: projectXP,
    },
    create: {
      userId,
      projectId,
      status: 'completed',
      startedAt: new Date(),
      completedAt: new Date(),
      xpAwarded: projectXP,
    },
  })

  // Update phase progress
  if (phaseId) {
    await updatePhaseProgress(userId, phaseId)
  }

  // Award XP
  await awardXP(userId, 'project_completed', projectXP, {
    projectId,
    difficulty: projectDifficulty,
  })
  await updateStreak(userId)
  await checkAndAwardBadges(userId)

  return { success: true, xpAwarded: projectXP }
}

// ============================================
// ROADMAP PROGRESS
// ============================================

export const getRoadmapProgress = async (userId: string) => {
  const phaseProgresses = await prisma.phaseProgress.findMany({
    where: { userId },
  })

  const completedPhases = phaseProgresses.filter(pp => pp.status === 'completed').length
  const inProgressPhases = phaseProgresses.filter(pp => pp.status === 'in_progress').length
  const availablePhases = phaseProgresses.filter(pp => pp.status === 'available').length

  // Calculate total progress
  let totalTasksCompleted = 0
  let totalTasks = 0

  for (const phase of phases) {
    totalTasks += phase.tasks.length
    const phaseProgress = await prisma.phaseProgress.findUnique({
      where: { userId_phaseId: { userId, phaseId: phase.id } },
    })
    
    if (phaseProgress?.status === 'completed') {
      totalTasksCompleted += phase.tasks.length
    } else {
      const taskProgresses = await prisma.taskProgress.count({
        where: { userId, taskId: { startsWith: `${phase.id}-` }, completed: true },
      })
      totalTasksCompleted += taskProgresses
    }
  }

  const totalProgressPercent = Math.round((totalTasksCompleted / totalTasks) * 100)

  // Check if capstone is unlocked (majority of phases completed)
  const isCapstoneUnlocked = completedPhases >= Math.ceil(phases.length / 2)

  return {
    completedPhases,
    inProgressPhases,
    availablePhases,
    totalPhases: phases.length,
    totalProgressPercent,
    totalTasksCompleted,
    totalTasks,
    isCapstoneUnlocked,
    phases: phases.map(phase => ({
      id: phase.id,
      title: phase.title,
      phaseNumber: phase.phaseNumber,
      status: phaseProgresses.find(pp => pp.phaseId === phase.id)?.status || 'locked',
      progressPercent: phaseProgresses.find(pp => pp.phaseId === phase.id)?.progressPercent || 0,
    })),
  }
}

// ============================================
// ACTIVITY AND STATS
// ============================================

export const getActivityStats = async (userId: string, days: number = 7) => {
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - days)

  // Get activity by date
  const activities = await prisma.activityLog.groupBy({
    by: ['date'],
    where: {
      userId,
      date: { gte: startDate },
    },
    _sum: { xp: true },
    _count: { _all: true },
  })

  // Fill in missing dates
  const statsByDate: Record<string, { xp: number; count: number }> = {}
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    
    const activity = activities.find(a => 
      a.date.toISOString().split('T')[0] === dateStr
    )
    
    statsByDate[dateStr] = {
      xp: activity?._sum.xp || 0,
      count: activity?._count._all || 0,
    }
  }

  return statsByDate
}

// ============================================
// PROFILE SETTINGS
// ============================================

export const updateProfileSettings = async (
  userId: string,
  settings: { dailyGoal?: number; profileLevel?: ProfileLevel }
) => {
  await prisma.userProgress.update({
    where: { userId },
    data: {
      dailyGoal: settings.dailyGoal,
      profileLevel: settings.profileLevel,
    },
  })
}

// ============================================
// RESET PROGRESS
// ============================================

export const resetProgress = async (userId: string) => {
  await prisma.taskProgress.deleteMany({ where: { userId } })
  await prisma.projectProgress.deleteMany({ where: { userId } })
  await prisma.phaseProgress.deleteMany({ where: { userId } })
  await prisma.activityLog.deleteMany({ where: { userId } })
  await prisma.badgeProgress.deleteMany({ where: { userId } })

  await prisma.userProgress.update({
    where: { userId },
    data: {
      xp: 0,
      level: 1,
      currentStreak: 0,
      bestStreak: 0,
      lastActiveDate: null,
    },
  })

  return { success: true }
}

// ============================================
// EXPORT/IMPORT PROGRESS
// ============================================

export const exportProgress = async (userId: string) => {
  const userProgress = await prisma.userProgress.findUnique({
    where: { userId },
  })

  const taskProgresses = await prisma.taskProgress.findMany({
    where: { userId },
  })

  const projectProgresses = await prisma.projectProgress.findMany({
    where: { userId },
  })

  const phaseProgresses = await prisma.phaseProgress.findMany({
    where: { userId },
  })

  const badgeProgresses = await prisma.badgeProgress.findMany({
    where: { userId },
  })

  return {
    userProgress,
    taskProgresses,
    projectProgresses,
    phaseProgresses,
    badgeProgresses,
    exportedAt: new Date(),
  }
}

// Note: Import would need to handle data validation and merging
// For MVP, we'll focus on export only
