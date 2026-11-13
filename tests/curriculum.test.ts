import assert from 'node:assert/strict'
import test from 'node:test'
import { phases, roadmap } from '../lib/roadmap-data'
import { createEmptyLocalProgress, getPhaseSummary, getRoadmapSummary } from '../lib/local-progress'

test('le catalogue publié a des consignes, ressources et critères vérifiables', () => {
  assert.equal(phases.length, 19)
  const taskIds = new Set<string>()
  const projectIds = new Set<string>()
  for (const phase of phases) {
    assert.ok(phase.modules.length > 0, phase.id)
    assert.ok(phase.tasks.length > 0, phase.id)
    for (const module of phase.modules) assert.ok(module.description?.trim(), module.id)
    for (const task of phase.tasks) {
      assert.ok(task.description?.trim(), task.id)
      assert.ok(!taskIds.has(task.id), `Tâche dupliquée : ${task.id}`)
      taskIds.add(task.id)
    }
    for (const project of Object.values(phase.projects)) {
      assert.ok(!projectIds.has(project.id), `Projet dupliqué : ${project.id}`)
      projectIds.add(project.id)
      assert.ok(project.deliverables.length >= 3, project.id)
      assert.ok(project.validationCriteria.length >= 3, project.id)
    }
    if (phase.phaseNumber >= 3) {
      assert.ok(phase.resources?.length, `${phase.id} sans ressources`)
      for (const resource of phase.resources || []) {
        assert.equal(new URL(resource.href).protocol, 'https:')
      }
    }
  }
  assert.equal(roadmap.totalTasks, taskIds.size)
  assert.equal(roadmap.totalProjects, projectIds.size)
})

test('MCP, agentique et OCR proposent pratique, sécurité et évaluation', () => {
  const text = (number: number) => {
    const phase = phases[number]
    return [phase.modules.map(module => `${module.title} ${module.description}`).join(' '), phase.tasks.map(task => `${task.title} ${task.description}`).join(' '), Object.values(phase.projects).map(project => `${project.title} ${project.description} ${project.validationCriteria.join(' ')}`).join(' ')].join(' ')
  }
  assert.match(text(7), /MCP[\s\S]*(?:outil|serveur)/i)
  assert.match(text(7), /authentification|autorisation|contrôle d’accès/i)
  assert.match(text(9), /idempotence|sans doublon/i)
  assert.match(text(9), /approbation humaine/i)
  assert.match(text(11), /OCR[\s\S]*(?:CER|WER)/i)
  assert.match(text(11), /revue humaine/i)
  assert.match(text(8), /PDF[\s\S]*OCR/i)
})

test('les identifiants des tâches antérieures restent stables pour la progression', () => {
  assert.equal(phases[7].tasks[7].id, 'task-7-7')
  assert.equal(phases[8].tasks[13].id, 'task-8-13')
  assert.equal(phases[9].tasks[11].id, 'task-9-11')
  assert.equal(phases[11].tasks[9].id, 'task-11-9')
})

test('le Capstone est visible et se débloque après la phase 17', () => {
  const capstone = roadmap.capstone
  const progress = createEmptyLocalProgress()
  assert.equal(phases.at(-1)?.id, capstone.id)
  assert.equal(getPhaseSummary(capstone, phases, progress).status, 'locked')
  assert.equal(getRoadmapSummary(phases, progress).isCapstoneUnlocked, false)
  progress.phases['phase-17'] = { status: 'completed', completedAt: '2026-11-13T00:00:00.000Z' }
  assert.equal(getPhaseSummary(capstone, phases, progress).status, 'available')
})

test('la sécurité arrive avant les exercices de déploiement et ne repose pas sur un prompt seul', () => {
  const basics = phases[1]
  assert.match(basics.modules.map(module => module.title).join(' '), /Cybersécurité de base/i)
  assert.ok(basics.tasks.some(task => /task-1-security-/.test(task.id) && /deux comptes/.test(task.description || '')))
  assert.ok(basics.resources?.some(resource => /OWASP/.test(resource.label)))

  const llm = phases[6]
  assert.ok(llm.tasks.some(task => /spécification de prompt testable/.test(task.title)))
  assert.ok(llm.tasks.some(task => /injection et fuite/.test(task.title)))
  assert.match(llm.tasks.find(task => task.id === 'task-6-15')?.description || '', /prompt défensif seul ne constitue pas une protection/i)
  assert.ok(llm.projects.hard.validationCriteria.some(criterion => /avant déploiement/.test(criterion)))

  const mlops = phases[12]
  assert.match(mlops.tasks[0].title, /frontières de confiance/)
  assert.match(mlops.tasks[5].title, /retour arrière/)
  assert.equal(mlops.tasks[6].id, 'task-12-0')
  for (const project of Object.values(mlops.projects)) {
    assert.ok(project.validationCriteria.some(criterion => /autorisation, validation des entrées, secrets/.test(criterion)))
  }
  assert.match(phases[17].projects.medium.description, /sans promettre un blocage parfait/)
})
