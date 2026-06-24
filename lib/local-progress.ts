import type { Phase, PhaseStatus, Project, ProjectStatus } from '@/types/roadmap'

export const LOCAL_PROGRESS_KEY = 'rouky-progress-v1'

export interface LocalTaskProgress {
  completed: boolean
  completedAt?: string
}

export interface LocalProjectProgress {
  status: ProjectStatus
  startedAt?: string
  completedAt?: string
  githubUrl?: string
}

export interface LocalPhaseProgress {
  status: 'completed'
  completedAt: string
}

export interface LocalProgressState {
  version: 1
  tasks: Record<string, LocalTaskProgress>
  projects: Record<string, LocalProjectProgress>
  phases: Record<string, LocalPhaseProgress>
}

export interface PhaseSummary {
  status: PhaseStatus
  progressPercent: number
  completedTasks: number
  totalTasks: number
  completedProjects: number
  startedProjects: number
  canValidatePhase: boolean
  isUnlocked: boolean
}

export const createEmptyLocalProgress = (): LocalProgressState => ({
  version: 1,
  tasks: {},
  projects: {},
  phases: {},
})

export const normalizeLocalProgress = (value: unknown): LocalProgressState => {
  if (!value || typeof value !== 'object') return createEmptyLocalProgress()

  const progress = value as Partial<LocalProgressState>

  return {
    version: 1,
    tasks: progress.tasks && typeof progress.tasks === 'object' ? progress.tasks : {},
    projects: progress.projects && typeof progress.projects === 'object' ? progress.projects : {},
    phases: progress.phases && typeof progress.phases === 'object' ? progress.phases : {},
  }
}

export const readLocalProgress = () => {
  if (typeof window === 'undefined') return createEmptyLocalProgress()

  try {
    return normalizeLocalProgress(JSON.parse(window.localStorage.getItem(LOCAL_PROGRESS_KEY) || 'null'))
  } catch {
    return createEmptyLocalProgress()
  }
}

export const saveLocalProgress = (progress: LocalProgressState) => {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(progress))
  window.dispatchEvent(new Event('rouky-progress-updated'))
}

export const getProjectsForPhase = (phase: Phase) =>
  Object.values(phase.projects) as Project[]

export const getProjectProgress = (
  progress: LocalProgressState,
  projectId: string
): LocalProjectProgress => progress.projects[projectId] || { status: 'not_started' }

export const isGithubUrlValid = (url: string | undefined) => {
  if (!url) return false

  try {
    const parsedUrl = new URL(url.trim())
    const [, owner, repo] = parsedUrl.pathname.split('/')

    return parsedUrl.hostname === 'github.com' && Boolean(owner) && Boolean(repo)
  } catch {
    return false
  }
}

export const getPreviousPhase = (phase: Phase, phases: Phase[]) =>
  phases.find(candidate => candidate.phaseNumber === phase.phaseNumber - 1)

export const getNextPhase = (phase: Phase, phases: Phase[]) =>
  phases.find(candidate => candidate.phaseNumber === phase.phaseNumber + 1)

export const isPhaseUnlocked = (
  phase: Phase,
  phases: Phase[],
  progress: LocalProgressState
) => {
  if (phase.phaseNumber === 0) return true

  const previousPhase = getPreviousPhase(phase, phases)

  return Boolean(previousPhase && progress.phases[previousPhase.id]?.status === 'completed')
}

export const getPhaseSummary = (
  phase: Phase,
  phases: Phase[],
  progress: LocalProgressState
): PhaseSummary => {
  const completedTasks = phase.tasks.filter(task => progress.tasks[task.id]?.completed).length
  const totalTasks = phase.tasks.length
  const projects = getProjectsForPhase(phase)
  const completedProjects = projects.filter(project => getProjectProgress(progress, project.id).status === 'completed').length
  const startedProjects = projects.filter(project => getProjectProgress(progress, project.id).status !== 'not_started').length
  const isCompleted = progress.phases[phase.id]?.status === 'completed'
  const isUnlocked = isPhaseUnlocked(phase, phases, progress)
  const canValidatePhase = isUnlocked && completedTasks === totalTasks && completedProjects > 0
  const hasActivity = completedTasks > 0 || startedProjects > 0
  const taskRatio = totalTasks > 0 ? completedTasks / totalTasks : 0
  const progressPercent = isCompleted
    ? 100
    : Math.min(99, Math.round(taskRatio * 80 + (completedProjects > 0 ? 20 : 0)))
  let status: PhaseStatus = 'locked'

  if (isCompleted) {
    status = 'completed'
  } else if (!isUnlocked) {
    status = 'locked'
  } else if (hasActivity || canValidatePhase) {
    status = 'in_progress'
  } else {
    status = 'available'
  }

  return {
    status,
    progressPercent,
    completedTasks,
    totalTasks,
    completedProjects,
    startedProjects,
    canValidatePhase,
    isUnlocked,
  }
}

export const getRoadmapSummary = (phases: Phase[], progress: LocalProgressState) => {
  const phaseSummaries = phases.map(phase => ({
    phase,
    summary: getPhaseSummary(phase, phases, progress),
  }))
  const completedPhases = phaseSummaries.filter(item => item.summary.status === 'completed').length
  const inProgressPhases = phaseSummaries.filter(item => item.summary.status === 'in_progress').length
  const availablePhases = phaseSummaries.filter(item => item.summary.status === 'available').length
  const totalTasks = phases.reduce((sum, phase) => sum + phase.tasks.length, 0)
  const totalTasksCompleted = phases.reduce(
    (sum, phase) => sum + phase.tasks.filter(task => progress.tasks[task.id]?.completed).length,
    0
  )
  const totalProgressPercent = phases.length > 0
    ? Math.round(phaseSummaries.reduce((sum, item) => sum + item.summary.progressPercent, 0) / phases.length)
    : 0

  return {
    completedPhases,
    inProgressPhases,
    availablePhases,
    totalPhases: phases.length,
    totalProgressPercent,
    totalTasksCompleted,
    totalTasks,
    isCapstoneUnlocked: completedPhases >= Math.ceil(phases.length / 2),
    phases: phaseSummaries,
  }
}
