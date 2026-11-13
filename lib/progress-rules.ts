import { phases } from './roadmap-data'
import { createEmptyLocalProgress, getPhaseSummary, getProjectProgress, getProjectsForPhase, isGithubUrlValid, normalizeLocalProgress, type LocalProgressState } from './local-progress'
const date = () => new Date().toISOString()
function phaseForProject(projectId: string) {
  return phases.find(phase => getProjectsForPhase(phase).some(project => project.id === projectId))
}


export type ProgressAction =
  | { type: 'task'; taskId: string; completed: boolean }
  | { type: 'project_start'; projectId: string }
  | { type: 'project_submit'; projectId: string; githubUrl: string }
  | { type: 'project_attest'; projectId: string; criteria: boolean[] }
  | { type: 'phase_validate'; phaseId: string }
  | { type: 'import'; data: unknown }
  | { type: 'reset' }

export function applyAction(state: LocalProgressState, action: ProgressAction): LocalProgressState {
  const next: LocalProgressState = structuredClone(state)
  if (action.type === 'reset') return createEmptyLocalProgress()
  if (action.type === 'import') {
    const imported = normalizeLocalProgress(action.data)
    for (const phase of phases) {
      for (const task of phase.tasks) if (imported.tasks[task.id]?.completed) next.tasks[task.id] = { completed: true, completedAt: imported.tasks[task.id].completedAt || date() }
      for (const project of getProjectsForPhase(phase)) {
        const old = imported.projects[project.id]
        if (!old) continue
        if (next.projects[project.id]?.status === 'completed') continue
        if (old.githubUrl && isGithubUrlValid(old.githubUrl)) next.projects[project.id] = { status: 'submitted', githubUrl: old.githubUrl, startedAt: old.startedAt || date() }
        else if (old.status !== 'not_started') next.projects[project.id] = { status: 'in_progress', startedAt: old.startedAt || date() }
      }
    }
    return next
  }
  if (action.type === 'task') {
    if (typeof action.completed !== 'boolean') throw new Error('Action invalide')
    const phase = phases.find(p => p.tasks.some(t => t.id === action.taskId))
    if (!phase || !getPhaseSummary(phase, phases, next).isUnlocked || next.phases[phase.id]) throw new Error('Tâche inaccessible')
    next.tasks[action.taskId] = { completed: action.completed, completedAt: action.completed ? date() : undefined }
  } else if (action.type === 'phase_validate') {
    const phase = phases.find(p => p.id === action.phaseId)
    if (!phase || !getPhaseSummary(phase, phases, next).canValidatePhase) throw new Error('Phase non validable')
    next.phases[phase.id] = { status: 'completed', completedAt: date() }
  } else {
    const phase = phaseForProject(action.projectId)
    if (!phase || !getPhaseSummary(phase, phases, next).isUnlocked || next.phases[phase.id]) throw new Error('Projet inaccessible')
    const project = getProjectsForPhase(phase).find(p => p.id === action.projectId)!
    const old = getProjectProgress(next, project.id)
    if (action.type === 'project_start') next.projects[project.id] = { ...old, status: 'in_progress', startedAt: old.startedAt || date() }
    if (action.type === 'project_submit') {
      if (!isGithubUrlValid(action.githubUrl)) throw new Error('URL GitHub invalide')
      next.projects[project.id] = { status: 'submitted', startedAt: old.startedAt || date(), githubUrl: action.githubUrl.trim() }
    }
    if (action.type === 'project_attest') {
      if (old.status !== 'submitted' || action.criteria.length !== project.validationCriteria.length || !action.criteria.every(value => value === true)) throw new Error('Critères non attestés')
      next.projects[project.id] = { ...old, status: 'completed', completedAt: date() }
    }
  }
  return next
}
