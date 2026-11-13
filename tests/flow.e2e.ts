import assert from 'node:assert/strict'
import { phases } from '../lib/roadmap-data'
import { getProjectsForPhase } from '../lib/local-progress'
const base = process.env.BASE_URL || 'http://localhost:3100'
const email = `flow-${Date.now()}@example.test`
let cookie = ''
async function request(path: string, body?: unknown) {
  const response = await fetch(base + path, { method: body ? 'POST' : 'GET', headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(cookie ? { Cookie: cookie } : {}) }, body: body ? JSON.stringify(body) : undefined })
  if (response.headers.get('set-cookie')) cookie = response.headers.get('set-cookie')!.split(';')[0]
  return { status: response.status, data: await response.json() }
}
async function main() {
  const phase = phases[0], next = phases[1], project = getProjectsForPhase(phase)[0]
  assert.equal((await request('/api/progress')).status, 401)
  assert.equal((await request('/api/auth', { action: 'register', name: 'Parcours test', email, password: 'test-password-123' })).status, 200)
  for (const task of phase.tasks) assert.equal((await request('/api/progress', { type: 'task', taskId: task.id, completed: true })).status, 200)
  assert.equal((await request('/api/progress', { type: 'phase_validate', phaseId: phase.id })).status, 400)
  assert.equal((await request('/api/progress', { type: 'project_start', projectId: project.id })).status, 200)
  assert.equal((await request('/api/progress', { type: 'project_submit', projectId: project.id, githubUrl: 'https://github.com/example/rouky' })).status, 200)
  let state = (await request('/api/progress')).data.progress
  assert.equal(state.projects[project.id].status, 'submitted')
  assert.equal((await request('/api/progress', { type: 'phase_validate', phaseId: phase.id })).status, 400)
  assert.equal((await request('/api/progress', { type: 'project_attest', projectId: project.id, criteria: project.validationCriteria.map(() => true) })).status, 200)
  assert.equal((await request('/api/progress', { type: 'phase_validate', phaseId: phase.id })).status, 200)
  assert.equal((await request('/api/progress', { type: 'task', taskId: next.tasks[0].id, completed: true })).status, 200)
  await request('/api/auth', { action: 'logout' })
  assert.equal((await request('/api/auth', { action: 'login', email, password: 'test-password-123' })).status, 200)
  state = (await request('/api/progress')).data.progress
  assert.equal(state.phases[phase.id].status, 'completed')
  assert.equal(state.tasks[next.tasks[0].id].completed, true)
  await request('/api/auth', { action: 'logout' })
  assert.equal((await request('/api/auth', { action: 'register', name: 'Autre compte', email: `other-${Date.now()}@example.test`, password: 'other-password-123' })).status, 200)
  state = (await request('/api/progress')).data.progress
  assert.equal(state.phases[phase.id], undefined)
  assert.equal(state.tasks[next.tasks[0].id], undefined)
  console.log('Parcours API complet : compte, tâches, dépôt, attestation, phase, reconnexion OK')
}
main().catch(error => { console.error(error); process.exitCode = 1 })
