import { prisma } from './prisma'
import type { Badge } from '@/types/roadmap'

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

// ============================================
// BADGE DEFINITIONS
// ============================================

export const badges: Badge[] = [
  {
    id: 'first-step',
    title: 'Premier pas',
    description: 'Terminez votre première tâche',
    icon: 'footprints',
    category: 'debut',
    requirement: 'completed_tasks',
    requirementValue: 1,
    xp: 25,
  },
  {
    id: 'serieux',
    title: 'Sérieux',
    description: '7 jours de streak consécutifs',
    icon: 'flame',
    category: 'streak',
    requirement: 'current_streak',
    requirementValue: 7,
    xp: 100,
  },
  {
    id: 'machine',
    title: 'Machine',
    description: '30 jours de streak consécutifs',
    icon: 'bot',
    category: 'streak',
    requirement: 'current_streak',
    requirementValue: 30,
    xp: 300,
  },
  {
    id: 'pythoniste',
    title: 'Pythoniste',
    description: 'Terminez la phase Python',
    icon: 'code',
    category: 'phase',
    requirement: 'completed_phase',
    requirementValue: 'phase-1',
    xp: 50,
  },
  {
    id: 'math-solide',
    title: 'Math solide',
    description: 'Terminez la phase Mathématiques',
    icon: 'calculator',
    category: 'phase',
    requirement: 'completed_phase',
    requirementValue: 'phase-2',
    xp: 50,
  },
  {
    id: 'builder',
    title: 'Builder',
    description: 'Terminez votre premier projet',
    icon: 'hammer',
    category: 'project',
    requirement: 'completed_projects',
    requirementValue: 1,
    xp: 50,
  },
  {
    id: 'architecte-ia',
    title: 'Architecte IA',
    description: 'Terminez la phase AI System Design',
    icon: 'layout-dashboard',
    category: 'phase',
    requirement: 'completed_phase',
    requirementValue: 'phase-13',
    xp: 100,
  },
  {
    id: 'expert-llm',
    title: 'Expert LLM',
    description: 'Terminez la phase LLM Engineering',
    icon: 'brain',
    category: 'phase',
    requirement: 'completed_phase',
    requirementValue: 'phase-6',
    xp: 100,
  },
  {
    id: 'agent-builder',
    title: 'Agent Builder',
    description: 'Terminez la phase Agents IA',
    icon: 'robot',
    category: 'phase',
    requirement: 'completed_phase',
    requirementValue: 'phase-9',
    xp: 100,
  },
  {
    id: 'finisher',
    title: 'Finisher',
    description: 'Terminez toutes les phases de la roadmap',
    icon: 'trophy',
    category: 'achievement',
    requirement: 'completed_all_phases',
    requirementValue: true,
    xp: 500,
  },
  {
    id: 'capstone-master',
    title: 'Capstone Master',
    description: 'Validez le projet Capstone',
    icon: 'crown',
    category: 'capstone',
    requirement: 'completed_capstone',
    requirementValue: true,
    xp: 250,
  },
  {
    id: 'social',
    title: 'Social',
    description: 'Terminez 10 tâches en une journée',
    icon: 'users',
    category: 'daily',
    requirement: 'daily_tasks',
    requirementValue: 10,
    xp: 50,
  },
  {
    id: 'marathon',
    title: 'Marathon',
    description: 'Gagnez 500 XP en une journée',
    icon: 'run',
    category: 'daily',
    requirement: 'daily_xp',
    requirementValue: 500,
    xp: 100,
  },
  {
    id: 'collecteur',
    title: 'Collectionneur',
    description: 'Déverrouillez 10 badges',
    icon: 'medal',
    category: 'meta',
    requirement: 'unlocked_badges',
    requirementValue: 10,
    xp: 100,
  },
  {
    id: 'maitre',
    title: 'Maître',
    description: 'Atteignez le niveau 10',
    icon: 'star',
    category: 'level',
    requirement: 'level',
    requirementValue: 10,
    xp: 200,
  },
]

// ============================================
// BADGE CHECKING AND AWARDING
// ============================================

export const checkBadgeRequirements = async (userId: string, badgeId: string) => {
  const badge = badges.find(b => b.id === badgeId)
  if (!badge) return false
  if (!hasDatabaseConfig()) return false

  try {
    switch (badge.requirement) {
    case 'completed_tasks':
      const taskCount = await prisma.taskProgress.count({
        where: { userId, completed: true },
      })
      return taskCount >= (badge.requirementValue as number)

    case 'current_streak':
      const userProgress = await prisma.userProgress.findUnique({
        where: { userId },
      })
      return userProgress?.currentStreak >= (badge.requirementValue as number)

    case 'completed_phase':
      const phaseProgress = await prisma.phaseProgress.findFirst({
        where: { userId, phaseId: badge.requirementValue as string, status: 'completed' },
      })
      return !!phaseProgress

    case 'completed_projects':
      const projectCount = await prisma.projectProgress.count({
        where: { userId, status: 'completed' },
      })
      return projectCount >= (badge.requirementValue as number)

    case 'completed_all_phases':
      const allPhases = await prisma.phaseProgress.count({
        where: { userId, status: 'completed' },
      })
      return allPhases >= 18 // 18 phases (0-17)

    case 'completed_capstone':
      const capstoneProgress = await prisma.projectProgress.findFirst({
        where: { userId, projectId: { contains: 'capstone' }, status: 'completed' },
      })
      return !!capstoneProgress

    case 'daily_tasks': {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const dailyTaskCount = await prisma.taskProgress.count({
        where: {
          userId,
          completed: true,
          completedAt: { gte: today },
        },
      })
      return dailyTaskCount >= (badge.requirementValue as number)
    }

    case 'daily_xp': {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const dailyXP = await prisma.activityLog.aggregate({
        where: { userId, date: { gte: today } },
        _sum: { xp: true },
      })
      return (dailyXP._sum.xp || 0) >= (badge.requirementValue as number)
    }

    case 'unlocked_badges':
      const unlockedCount = await prisma.badgeProgress.count({
        where: { userId, unlocked: true },
      })
      return unlockedCount >= (badge.requirementValue as number)

    case 'level':
      const userLevel = await prisma.userProgress.findUnique({
        where: { userId },
      })
      return userLevel?.level >= (badge.requirementValue as number)

    default:
      return false
    }
  } catch (error) {
    if (isDatabaseUnavailable(error)) return false
    throw error
  }
}

export const checkAndAwardBadges = async (userId: string) => {
  const awardedBadges: string[] = []
  if (!hasDatabaseConfig()) return awardedBadges

  try {
    for (const badge of badges) {
    // Check if badge is already unlocked
    const existingBadge = await prisma.badgeProgress.findFirst({
      where: { userId, badgeId: badge.id },
    })

    if (existingBadge?.unlocked) continue

    // Check if requirement is met
    const requirementMet = await checkBadgeRequirements(userId, badge.id)

    if (requirementMet) {
      // Award the badge
      if (existingBadge) {
        await prisma.badgeProgress.update({
          where: { id: existingBadge.id },
          data: {
            unlocked: true,
            unlockedAt: new Date(),
          },
        })
      } else {
        await prisma.badgeProgress.create({
          data: {
            userId,
            badgeId: badge.id,
            unlocked: true,
            unlockedAt: new Date(),
          },
        })
      }

      // Award XP for badge
      await prisma.userProgress.update({
        where: { userId },
        data: {
          xp: { increment: badge.xp },
        },
      })

      // Create activity log
      await prisma.activityLog.create({
        data: {
          userId,
          type: 'badge_unlocked',
          xp: badge.xp,
          metadata: { badgeId: badge.id },
        },
      })

      awardedBadges.push(badge.id)
    }
  }

    return awardedBadges
  } catch (error) {
    if (isDatabaseUnavailable(error)) return []
    throw error
  }
}

export const getUserBadges = async (userId: string) => {
  if (!hasDatabaseConfig()) {
    return badges.map(badge => ({
      ...badge,
      unlocked: false,
      unlockedAt: null,
    }))
  }

  try {
    const badgeProgresses = await prisma.badgeProgress.findMany({
      where: { userId },
      include: {
        user: false,
      },
    })

    return badges.map(badge => {
      const userBadge = badgeProgresses.find(bp => bp.badgeId === badge.id)
      return {
        ...badge,
        unlocked: userBadge?.unlocked || false,
        unlockedAt: userBadge?.unlockedAt || null,
      }
    })
  } catch (error) {
    if (!isDatabaseUnavailable(error)) throw error

    return badges.map(badge => ({
      ...badge,
      unlocked: false,
      unlockedAt: null,
    }))
  }
}

export const getBadgeById = (badgeId: string) => {
  return badges.find(b => b.id === badgeId)
}
