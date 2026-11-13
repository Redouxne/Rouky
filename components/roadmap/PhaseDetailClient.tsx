'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useProgress } from '@/components/ProgressProvider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { getPhaseSummary, getProjectsForPhase, getProjectProgress, isGithubUrlValid } from '@/lib/local-progress'
import type { Phase, Project } from '@/types/roadmap'

export function PhaseDetailClient({ phase, phases }: { phase: Phase; phases: Phase[] }) {
  const { progress, user, loading, act } = useProgress()
  const summary = getPhaseSummary(phase, phases, progress)
  const previous = phases.find(p => p.phaseNumber === phase.phaseNumber - 1)
  const next = phases.find(p => p.phaseNumber === phase.phaseNumber + 1)
  return <div className="mx-auto max-w-4xl space-y-6">
    <Link href="/roadmap" className="text-sm underline">← Roadmap</Link>
    <div><p className="text-sm text-muted-foreground">Phase {phase.phaseNumber}</p><h1 className="text-3xl font-bold">{phase.title}</h1><p className="mt-2 text-muted-foreground">{phase.objective}</p></div>
    {summary.status === 'locked' && <Card><CardContent className="pt-6">Phase bloquée. Validez d’abord la phase {previous?.phaseNumber}.</CardContent></Card>}
    <Card><CardHeader><CardTitle>Progression · {summary.progressPercent}%</CardTitle></CardHeader><CardContent className="space-y-2"><Progress value={summary.progressPercent} /><p className="text-sm text-muted-foreground">{summary.completedTasks}/{summary.totalTasks} tâches · {summary.completedProjects} projet autoévalué · {summary.status === 'completed' ? 'Phase validée' : summary.status === 'locked' ? 'Bloquée' : summary.status === 'available' ? 'Non commencée' : 'En cours'}</p></CardContent></Card>
    <Card><CardHeader><CardTitle>Objectif</CardTitle></CardHeader><CardContent><p>{phase.description}</p></CardContent></Card>
    {phase.phaseNumber <= 2 && <Card><CardHeader><CardTitle>Ressources pour démarrer</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-4 text-sm underline">{phase.phaseNumber === 0 ? <Link href="/tutorials/local-environment">Préparer son environnement</Link> : phase.phaseNumber === 1 ? <a href="https://docs.python.org/3/tutorial/index.html" target="_blank" rel="noreferrer">Tutoriel officiel Python ↗</a> : <a href="https://numpy.org/doc/stable/user/quickstart" target="_blank" rel="noreferrer">Guide NumPy ↗</a>}<a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories" target="_blank" rel="noreferrer">Créer un dépôt GitHub ↗</a></CardContent></Card>}
    <Card><CardHeader><CardTitle>Modules</CardTitle></CardHeader><CardContent className="grid gap-3 md:grid-cols-2">{phase.modules.map(module => <div key={module.id} className="rounded border border-border p-3"><strong>{module.title}</strong><p className="text-sm text-muted-foreground">{module.description}</p></div>)}</CardContent></Card>
    <Card><CardHeader><CardTitle>Tâches · {summary.completedTasks}/{summary.totalTasks}</CardTitle></CardHeader><CardContent className="space-y-3">{phase.tasks.map(task => <label key={task.id} className="flex items-start gap-3 rounded border border-border p-3"><input type="checkbox" className="mt-1" checked={!!progress.tasks[task.id]?.completed} disabled={!user || loading || !summary.isUnlocked || summary.status === 'completed'} onChange={event => void act({ type: 'task', taskId: task.id, completed: event.target.checked })} /><span><strong>{task.title}</strong><span className="block text-sm text-muted-foreground">{task.description}</span>{task.resourceHref && <Link className="text-sm underline" href={task.resourceHref}>↗ {task.resourceLabel || 'Ressource'}</Link>}</span></label>)}</CardContent></Card>
    <Card><CardHeader><CardTitle>Projets</CardTitle></CardHeader><CardContent className="space-y-5">{getProjectsForPhase(phase).map(project => <ProjectPanel key={project.id} project={project} disabled={!user || loading || !summary.isUnlocked || summary.status === 'completed'} />)}</CardContent></Card>
    <Card><CardHeader><CardTitle>Validation de phase</CardTitle></CardHeader><CardContent className="space-y-3"><p className="text-sm text-muted-foreground">Cochez toutes les tâches et terminez l’autoévaluation d’au moins un projet. Rouky ne corrige pas le code automatiquement.</p><Button disabled={!user || loading || !summary.canValidatePhase || summary.status === 'completed'} onClick={() => void act({ type: 'phase_validate', phaseId: phase.id })}>{summary.status === 'completed' ? 'Phase validée' : 'Valider la phase'}</Button>{summary.status === 'completed' && next && <Button asChild variant="outline"><Link href={`/roadmap/${next.id}`}>Ouvrir la phase {next.phaseNumber} →</Link></Button>}</CardContent></Card>
  </div>
}
function ProjectPanel({ project, disabled }: { project: Project; disabled: boolean }) {
  const { progress, act } = useProgress()
  const state = getProjectProgress(progress, project.id)
  const [url, setUrl] = useState(state.githubUrl || '')
  const [criteria, setCriteria] = useState<boolean[]>(project.validationCriteria.map(() => false))
  return <div className="rounded border border-border p-4 space-y-3">
    <div><h3 className="font-semibold">{project.title}</h3><p className="text-sm text-muted-foreground">{project.description}</p><p className="mt-2 text-sm">Objectif : {project.objective}</p></div>
    <div className="text-sm"><strong>Livrables</strong><ul className="list-disc pl-5">{project.deliverables.map(item => <li key={item}>{item}</li>)}</ul></div>
    <p className="text-xs text-muted-foreground">État : {state.status === 'not_started' ? 'Non commencé' : state.status === 'in_progress' ? 'En cours' : state.status === 'submitted' ? 'Dépôt soumis · autoévaluation en attente' : 'Terminé par autoévaluation, sans correction automatique'}</p>
    {state.status === 'not_started' && <Button disabled={disabled} onClick={() => void act({ type: 'project_start', projectId: project.id })}>Commencer</Button>}
    {state.status === 'in_progress' && <div className="space-y-2"><label className="block text-sm">URL du dépôt GitHub<input type="url" className="mt-1 w-full rounded border bg-background p-2" placeholder="https://github.com/compte/depot" value={url} onChange={e => setUrl(e.target.value)} /></label><Button disabled={disabled || !isGithubUrlValid(url)} onClick={() => void act({ type: 'project_submit', projectId: project.id, githubUrl: url })}>Soumettre le dépôt</Button></div>}
    {state.githubUrl && <a className="block text-sm underline" href={state.githubUrl} target="_blank" rel="noreferrer">Voir le dépôt GitHub ↗</a>}
    {state.status === 'submitted' && <div className="space-y-2"><p className="text-sm">Autoévaluation manuelle : vérifiez chaque critère dans votre dépôt. Cette attestation ne constitue pas une correction par Rouky.</p>{project.validationCriteria.map((item, i) => <label key={i} className="flex gap-2 text-sm"><input type="checkbox" checked={criteria[i]} onChange={e => setCriteria(old => old.map((value, index) => index === i ? e.target.checked : value))} />{item}</label>)}<Button disabled={disabled || !criteria.every(Boolean)} onClick={() => void act({ type: 'project_attest', projectId: project.id, criteria })}>Je certifie avoir vérifié ces critères</Button></div>}
  </div>
}
