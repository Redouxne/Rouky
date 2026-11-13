'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, LockKeyhole } from 'lucide-react'
import { useProgress } from '@/components/ProgressProvider'
import { getRoadmapSummary } from '@/lib/local-progress'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import type { Phase } from '@/types/roadmap'

const statusLabel = { locked: 'Bloquée', available: 'À découvrir', in_progress: 'En cours', completed: 'Validée' } as const

export function RoadmapClient({ phases }: { phases: Phase[]; capstone: Phase }) {
  const { progress } = useProgress()
  const [filter, setFilter] = useState<'all' | 'completed' | 'in_progress' | 'locked'>('all')
  const summary = getRoadmapSummary(phases, progress)
  const visible = summary.phases.filter(item => filter === 'all' || item.summary.status === filter)

  return <div className="mx-auto max-w-7xl space-y-8 pb-12">
    <div className="max-w-3xl"><p className="eyebrow">La carte du voyage</p><h1 className="page-title mt-3">Votre roadmap<span className="text-primary">.</span></h1><p className="mt-4 text-base text-muted-foreground">Avancez chapitre après chapitre. Un projet attesté et les exercices terminés ouvrent l’étape suivante.</p></div>

    <div className="sketch-panel flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
      <div className="min-w-0 flex-1"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Progression globale</p><p className="mt-1 font-display text-4xl font-semibold">{summary.completedPhases} <span className="text-2xl font-normal text-muted-foreground">/ {summary.totalPhases} étapes</span></p></div><span className="font-display text-4xl font-semibold text-primary">{summary.totalProgressPercent}%</span></div><Progress value={summary.totalProgressPercent} className="mt-4" /><p className="mt-2 text-xs text-muted-foreground">{summary.totalTasksCompleted} exercices terminés sur {summary.totalTasks}</p></div>
    </div>

    <div className="flex flex-wrap gap-2" aria-label="Filtrer les phases">{([['all','Toutes'],['in_progress','En cours'],['completed','Validées'],['locked','Bloquées']] as const).map(([value,label]) => <Button key={value} size="sm" variant={filter === value ? 'default' : 'outline'} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</Button>)}</div>

    {visible.length === 0 ? <p className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">Aucune étape dans cette sélection.</p> : <div className="grid gap-4 md:grid-cols-2">{visible.map(({ phase, summary: state }) => <Link key={phase.id} href={`/roadmap/${phase.id}`} className="group sketch-panel block p-6 transition-transform hover:-translate-y-0.5 hover:border-primary/40">
      <div className="flex items-start justify-between gap-3"><span className="chapter-number">{String(phase.phaseNumber).padStart(2, '0')}</span><span className="status-pill" data-status={state.status}>{state.status === 'locked' && <LockKeyhole className="h-3 w-3" />}{statusLabel[state.status]}</span></div>
      <h2 className="mt-5 text-[2rem] font-semibold">{phase.title}</h2><p className="mt-2 min-h-[2.75rem] text-sm text-muted-foreground">{phase.objective}</p>
      <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground"><span>{state.completedTasks}/{state.totalTasks} exercices · {phase.modules.length} modules</span><span>{phase.estimatedTime}</span></div><Progress value={state.progressPercent} className="mt-3" />
      <span className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs font-semibold text-primary">{state.status === 'locked' ? 'Découvrir le contenu' : 'Ouvrir ce chapitre'} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
    </Link>)}</div>}
  </div>
}
