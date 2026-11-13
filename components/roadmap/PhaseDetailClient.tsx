'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ExternalLink, LockKeyhole } from 'lucide-react'
import { useProgress } from '@/components/ProgressProvider'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { getPhaseSummary, getProjectsForPhase, getProjectProgress, isGithubUrlValid } from '@/lib/local-progress'
import type { Phase, Project } from '@/types/roadmap'

export function PhaseDetailClient({ phase, phases }: { phase: Phase; phases: Phase[] }) {
  const { progress, loading, act } = useProgress()
  const summary = getPhaseSummary(phase, phases, progress)
  const previous = phases.find(item => item.phaseNumber === phase.phaseNumber - 1)
  const next = phases.find(item => item.phaseNumber === phase.phaseNumber + 1)
  const disabled = loading || !summary.isUnlocked || summary.status === 'completed'

  return <div className="mx-auto max-w-7xl space-y-8 pb-12">
    <Link href="/roadmap" className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"><ArrowLeft className="h-4 w-4" /> Retour à la roadmap</Link>
    <section className="sketch-panel bg-[#fffdf8] p-7 md:p-10"><div className="grid gap-8 md:grid-cols-[1fr_240px] md:items-end"><div><p className="eyebrow">{phase.id === 'capstone' ? 'Projet final' : `Chapitre ${String(phase.phaseNumber).padStart(2, '0')}`} · {phase.estimatedTime}</p><h1 className="mt-4 text-5xl font-semibold md:text-6xl">{phase.title}<span className="text-primary">.</span></h1><p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{phase.objective}</p></div><div className="rounded-xl border border-border bg-card p-5"><div className="flex items-center justify-between"><span className="status-pill" data-status={summary.status}>{summary.status === 'locked' && <LockKeyhole className="h-3 w-3" />}{summary.status === 'completed' ? 'Validée' : summary.status === 'locked' ? 'Bloquée' : summary.status === 'available' ? 'À découvrir' : 'En cours'}</span><strong className="font-display text-3xl text-primary">{summary.progressPercent}%</strong></div><Progress className="mt-4" value={summary.progressPercent} /><p className="mt-2 text-xs text-muted-foreground">{summary.completedTasks}/{summary.totalTasks} exercices · {summary.completedProjects} projet autoévalué</p></div></div></section>

    {summary.status === 'locked' && <div className="flex items-center gap-3 rounded-xl border border-border bg-[#f2eadc] p-4 text-sm"><LockKeyhole className="h-4 w-4 shrink-0 text-primary" /> Ce chapitre s’ouvre après validation de la phase {previous?.phaseNumber}.</div>}

    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="space-y-8">
        <section><div className="mb-5"><p className="eyebrow">01 · Comprendre</p><h2 className="section-title mt-2">Ce que vous allez apprendre</h2></div><p className="mb-5 max-w-3xl text-sm leading-7 text-muted-foreground">{phase.description}</p><div className="grid gap-3 sm:grid-cols-2">{phase.modules.map((module, index) => <div key={module.id} className="sketch-panel p-5"><span className="text-xs font-semibold text-primary/70">MODULE {String(index + 1).padStart(2, '0')}</span><h3 className="mt-2 text-2xl font-semibold">{module.title}</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">{module.description}</p></div>)}</div></section>

        <section><div className="mb-5 flex items-end justify-between gap-4"><div><p className="eyebrow">02 · Pratiquer</p><h2 className="section-title mt-2">Les exercices</h2></div><span className="text-xs text-muted-foreground">{summary.completedTasks} / {summary.totalTasks} terminés</span></div><div className="space-y-2.5">{phase.tasks.map(task => <label key={task.id} className="task-row"><input type="checkbox" className="mt-1 shrink-0" checked={!!progress.tasks[task.id]?.completed} disabled={disabled} onChange={event => void act({ type: 'task', taskId: task.id, completed: event.target.checked })} /><span className="min-w-0"><strong className="text-sm">{task.title}</strong><span className="mt-1 block text-xs leading-6 text-muted-foreground">{task.description}</span>{task.resourceHref && <Link className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline" href={task.resourceHref}>↗ {task.resourceLabel || 'Ressource'}</Link>}</span></label>)}</div></section>

        <section><div className="mb-5"><p className="eyebrow">03 · Construire</p><h2 className="section-title mt-2">Les projets</h2><p className="mt-2 text-sm text-muted-foreground">Choisissez un niveau. Un projet terminé par autoévaluation suffit pour valider ce chapitre.</p></div><div className="space-y-4">{getProjectsForPhase(phase).map(project => <ProjectPanel key={project.id} project={project} disabled={disabled} />)}</div></section>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start"><div className="sketch-panel p-5"><p className="eyebrow">Ressources</p><h2 className="mt-2 text-2xl font-semibold">Pour aller plus loin</h2><div className="mt-4 space-y-3 text-xs">
        {phase.phaseNumber === 0 && <Link className="flex items-center justify-between gap-2 border-b border-border pb-2 hover:text-primary" href="/tutorials/local-environment">Préparer son environnement <ArrowRight className="h-3.5 w-3.5" /></Link>}
        {phase.phaseNumber === 1 && <a className="flex items-center justify-between gap-2 border-b border-border pb-2 hover:text-primary" href="https://docs.python.org/3/tutorial/index.html" target="_blank" rel="noreferrer">Tutoriel officiel Python <ExternalLink className="h-3.5 w-3.5" /></a>}
        {phase.phaseNumber === 2 && <a className="flex items-center justify-between gap-2 border-b border-border pb-2 hover:text-primary" href="https://numpy.org/doc/stable/user/quickstart" target="_blank" rel="noreferrer">Guide NumPy <ExternalLink className="h-3.5 w-3.5" /></a>}
        {phase.resources?.map(resource => <a key={resource.href} href={resource.href} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-2 border-b border-border pb-2 hover:text-primary">{resource.label}<ExternalLink className="h-3.5 w-3.5 shrink-0" /></a>)}
        <a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-2 hover:text-primary">Créer un dépôt GitHub <ExternalLink className="h-3.5 w-3.5 shrink-0" /></a>
      </div></div>
      <div className="sketch-panel p-5"><p className="eyebrow">Validation</p><h2 className="mt-2 text-2xl font-semibold">Passer au chapitre suivant</h2><p className="mt-3 text-xs leading-6 text-muted-foreground">Terminez tous les exercices et autoévaluez un projet. Rouky ne corrige pas le code automatiquement.</p><Button className="mt-5 w-full" disabled={loading || !summary.canValidatePhase || summary.status === 'completed'} onClick={() => void act({ type: 'phase_validate', phaseId: phase.id })}>{summary.status === 'completed' ? 'Phase validée' : 'Valider la phase'}</Button>{summary.status === 'completed' && next && <Button asChild variant="outline" className="mt-2 w-full"><Link href={`/roadmap/${next.id}`}>Phase {next.phaseNumber} <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>}</div></aside>
    </div>
  </div>
}

function ProjectPanel({ project, disabled }: { project: Project; disabled: boolean }) {
  const { progress, act } = useProgress()
  const state = getProjectProgress(progress, project.id)
  const [url, setUrl] = useState(state.githubUrl || '')
  const [criteria, setCriteria] = useState<boolean[]>(project.validationCriteria.map(() => false))
  const status = state.status === 'not_started' ? 'Non commencé' : state.status === 'in_progress' ? 'En cours' : state.status === 'submitted' ? 'Dépôt soumis · autoévaluation en attente' : 'Terminé par autoévaluation'

  return <div className="sketch-panel p-5 md:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><span className="eyebrow">Projet {project.difficulty === 'easy' ? 'découverte' : project.difficulty === 'medium' ? 'intermédiaire' : 'avancé'}</span><h3 className="mt-2 text-3xl font-semibold">{project.title}</h3></div><span className="status-pill" data-status={state.status}>{status}</span></div><p className="mt-2 text-sm text-muted-foreground">{project.description}</p><p className="mt-3 text-xs"><strong>Objectif :</strong> {project.objective}</p>
    <div className="mt-5 rounded-xl bg-[#f8f4eb] p-4 text-xs"><strong className="font-semibold">Livrables attendus</strong><ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">{project.deliverables.map(item => <li key={item}>{item}</li>)}</ul></div>
    {state.status === 'not_started' && <Button className="mt-5" disabled={disabled} onClick={() => void act({ type: 'project_start', projectId: project.id })}>Commencer ce projet <ArrowRight className="ml-2 h-4 w-4" /></Button>}
    {state.status === 'in_progress' && <div className="mt-5 space-y-3"><label className="block text-xs font-semibold">URL du dépôt GitHub<input type="url" className="field-input" placeholder="https://github.com/compte/depot" value={url} onChange={event => setUrl(event.target.value)} /></label><Button disabled={disabled || !isGithubUrlValid(url)} onClick={() => void act({ type: 'project_submit', projectId: project.id, githubUrl: url })}>Soumettre le dépôt</Button></div>}
    {state.githubUrl && <a className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline" href={state.githubUrl} target="_blank" rel="noreferrer">Voir le dépôt GitHub <ExternalLink className="h-3.5 w-3.5" /></a>}
    {state.status === 'submitted' && <div className="mt-5 space-y-3 border-t border-border pt-5"><p className="text-xs text-muted-foreground">Vérifiez chaque critère dans votre dépôt. Cette attestation ne constitue pas une correction par Rouky.</p>{project.validationCriteria.map((item, index) => <label key={index} className="flex items-start gap-3 text-xs"><input type="checkbox" className="mt-0.5 shrink-0" checked={criteria[index]} onChange={event => setCriteria(old => old.map((value, itemIndex) => itemIndex === index ? event.target.checked : value))} />{item}</label>)}<Button disabled={disabled || !criteria.every(Boolean)} onClick={() => void act({ type: 'project_attest', projectId: project.id, criteria })}>Je certifie avoir vérifié ces critères</Button></div>}
  </div>
}
