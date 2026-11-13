'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, GitBranch } from 'lucide-react'
import { useProgress } from '@/components/ProgressProvider'
import { getPhaseSummary, getProjectProgress, getProjectsForPhase } from '@/lib/local-progress'
import { phases } from '@/lib/roadmap-data'
import { Button } from '@/components/ui/button'

const statusNames = { not_started: 'Non commencé', in_progress: 'En cours', submitted: 'Dépôt soumis', completed: 'Autoévalué' } as const
const difficultyNames = { easy: 'Découverte', medium: 'Intermédiaire', hard: 'Avancé' } as const

export default function ProjectsPage() {
  const { progress } = useProgress()
  const [status, setStatus] = useState('all')
  const [difficulty, setDifficulty] = useState('all')
  const projects = phases.flatMap(phase => getProjectsForPhase(phase).map(project => ({ phase, project, state: getProjectProgress(progress, project.id) })))
  const visible = projects.filter(({ project, state }) => (status === 'all' || state.status === status) && (difficulty === 'all' || project.difficulty === difficulty))

  return <div className="mx-auto max-w-7xl space-y-8 pb-12"><div className="max-w-3xl"><p className="eyebrow">Le laboratoire</p><h1 className="page-title mt-3">Des idées aux projets<span className="text-primary">.</span></h1><p className="mt-4 text-base text-muted-foreground">{projects.length} projets pour transformer ce que vous apprenez en preuves concrètes de compétence.</p></div>
    <div className="sketch-panel flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"><div className="flex flex-wrap gap-2" aria-label="Filtrer les projets par état">{[['all','Tous'],['not_started','À commencer'],['in_progress','En cours'],['submitted','Dépôts soumis'],['completed','Autoévalués']].map(([value,label]) => <Button key={value} size="sm" variant={status === value ? 'default' : 'outline'} aria-pressed={status === value} onClick={() => setStatus(value)}>{label}</Button>)}</div><label className="shrink-0 text-xs font-semibold">Niveau <select className="ml-2 rounded-lg border border-input bg-card px-3 py-2" value={difficulty} onChange={event => setDifficulty(event.target.value)}><option value="all">Tous</option><option value="easy">Découverte</option><option value="medium">Intermédiaire</option><option value="hard">Avancé</option></select></label></div>
    {visible.length === 0 ? <p className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">Aucun projet dans cette sélection.</p> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map(({ phase, project, state }) => { const locked = !getPhaseSummary(phase, phases, progress).isUnlocked; return <div key={project.id} className="sketch-panel flex flex-col p-6"><div className="flex items-start justify-between gap-3"><span className="eyebrow">Phase {String(phase.phaseNumber).padStart(2, '0')} · {difficultyNames[project.difficulty]}</span><GitBranch className="h-4 w-4 text-primary/60" strokeWidth={1.5} /></div><h2 className="mt-5 text-3xl font-semibold">{project.title}</h2><p className="mt-3 flex-1 text-sm text-muted-foreground">{project.objective}</p><div className="mt-6 flex items-center justify-between gap-2 border-t border-border pt-4"><span className="status-pill" data-status={locked ? 'locked' : state.status}>{locked ? 'Bloqué' : statusNames[state.status]}</span><Link href={`/roadmap/${phase.id}`} className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">Consignes <ArrowRight className="h-4 w-4" /></Link></div></div> })}</div>}
  </div>
}
