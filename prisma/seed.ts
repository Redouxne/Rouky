import { PrismaClient, Prisma } from '@prisma/client'
import { DEFAULT_USER_ID } from '../lib/progress'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create default user if not exists
  const defaultUser = await prisma.user.upsert({
    where: { id: DEFAULT_USER_ID },
    update: {},
    create: {
      id: DEFAULT_USER_ID,
      name: 'Utilisateur',
      email: 'default@example.com',
    },
  })

  // Create user progress for default user
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
      profileLevel: 'beginner',
    },
  })

  console.log('Created default user:', defaultUser)

  // Seed some initial data for demonstration
  // Mark first task of phase 0 as completed to show progress
  await prisma.taskProgress.upsert({
    where: { userId_taskId: { userId: DEFAULT_USER_ID, taskId: 'task-0-0' } },
    update: {},
    create: {
      userId: DEFAULT_USER_ID,
      taskId: 'task-0-0',
      completed: true,
      completedAt: new Date(),
      xpAwarded: 10,
    },
  })

  // Mark first project as started
  await prisma.projectProgress.upsert({
    where: { userId_projectId: { userId: DEFAULT_USER_ID, projectId: 'project-0-easy-0' } },
    update: {},
    create: {
      userId: DEFAULT_USER_ID,
      projectId: 'project-0-easy-0',
      status: 'in_progress',
      startedAt: new Date(),
    },
  })

  // Create some activity logs
  await prisma.activityLog.createMany({
    data: [
      {
        userId: DEFAULT_USER_ID,
        type: 'task_completed',
        xp: 10,
        metadata: { taskId: 'task-0-0', phaseId: 'phase-0' },
        date: new Date(),
      },
    ],
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
