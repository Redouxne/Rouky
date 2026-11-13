import { test } from 'node:test'
import assert from 'node:assert/strict'
import { applyAction } from '../lib/progress-rules'
import { createEmptyLocalProgress, getPhaseSummary, getProjectsForPhase } from '../lib/local-progress'
import { phases } from '../lib/roadmap-data'
const first = phases[0]
const second = phases[1]
const project = getProjectsForPhase(first)[0]
test('la phase suivante reste bloquée avant validation', () => {
  const state = createEmptyLocalProgress()
  assert.equal(getPhaseSummary(second, phases, state).status, 'locked')
  assert.throws(() => applyAction(state, { type: 'task', taskId: second.tasks[0].id, completed: true }))
})
test('une URL seule ne valide jamais un projet', () => {
  let state = applyAction(createEmptyLocalProgress(), { type: 'project_start', projectId: project.id })
  state = applyAction(state, { type: 'project_submit', projectId: project.id, githubUrl: 'https://github.com/user/repo' })
  assert.equal(state.projects[project.id].status, 'submitted')
  assert.equal(getPhaseSummary(first, phases, state).completedProjects, 0)
  assert.throws(() => applyAction(state, { type: 'project_attest', projectId: project.id, criteria: [true] }))
})
test('les critères attestés et toutes les tâches débloquent la phase suivante', () => {
  let state = createEmptyLocalProgress()
  for (const task of first.tasks) state = applyAction(state, { type: 'task', taskId: task.id, completed: true })
  assert.equal(getPhaseSummary(first, phases, state).canValidatePhase, false)
  state = applyAction(state, { type: 'project_start', projectId: project.id })
  state = applyAction(state, { type: 'project_submit', projectId: project.id, githubUrl: 'https://github.com/user/repo' })
  state = applyAction(state, { type: 'project_attest', projectId: project.id, criteria: project.validationCriteria.map(() => true) })
  assert.equal(getPhaseSummary(first, phases, state).canValidatePhase, true)
  state = applyAction(state, { type: 'phase_validate', phaseId: first.id })
  assert.equal(getPhaseSummary(second, phases, state).isUnlocked, true)
})
test('l’import ancien repasse les projets à dépôt soumis', () => {
  const legacy = createEmptyLocalProgress()
  legacy.projects[project.id] = { status: 'completed', githubUrl: 'https://github.com/user/repo' }
  legacy.phases[first.id] = { status: 'completed', completedAt: new Date().toISOString() }
  const state = applyAction(createEmptyLocalProgress(), { type: 'import', data: legacy })
  assert.equal(state.projects[project.id].status, 'submitted')
  assert.equal(state.phases[first.id], undefined)
})
