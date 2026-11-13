'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useProgress } from '@/components/ProgressProvider'
import { getRoadmapSummary } from '@/lib/local-progress'
import { phases } from '@/lib/roadmap-data'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

export default function ProgressPage() {
  const { progress } = useProgress()
  const summary = getRoadmapSummary(phases, progress)
  const submitted = Object.values(progress.projects).filter(project => project.status === 'submitted').length

  return <div className="mx-auto max-w-7xl space-y-8 pb-12"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Le chemin parcouru</p><h1 className="page-title mt-3">Votre progression<span className="text-primary">.</span></h1><p className="mt-3 text-muted-foreground">Chaque exercice et chaque projet attesté compte.</p></div><Button asChild variant="outline"><Link href="/settings">Exporter mes données <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
    <section className="sketch-panel bg-[#fffdf8] p-7 md:p-9"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">Vue d’ensemble</p><h2 className="mt-2 text-4xl font-semibold">Un pas après l’autre.</h2></div><strong className="font-display text-6xl font-semibold text-primary">{summary.totalProgressPercent}%</strong></div><Progress value={summary.totalProgressPercent} className="mt-6" /><div className="mt-6 grid gap-4 border-t border-border pt-5 text-sm sm:grid-cols-3"><div><strong className="font-display text-3xl">{summary.totalTasksCompleted}</strong><p className="text-xs text-muted-foreground">Exercices terminés</p></div><div><strong className="font-display text-3xl">{summary.completedPhases}</strong><p className="text-xs text-muted-foreground">Étapes validées</p></div><div><strong className="font-display text-3xl">{submitted}</strong><p className="text-xs text-muted-foreground">Dépôts à autoévaluer</p></div></div></section>
    <section><p className="eyebrow">Chapitre par chapitre</p><h2 className="section-title mb-5 mt-2">Le carnet de route</h2><div className="overflow-hidden rounded-2xl border border-border bg-card">{summary.phases.map(({ phase, summary: state }) => <Link key={phase.id} href={`/roadmap/${phase.id}`} className="grid gap-2 border-b border-border px-5 py-4 transition-colors last:border-b-0 hover:bg-[#fffdf8] sm:grid-cols-[42px_1fr_150px_45px] sm:items-center"><span className="font-display text-2xl text-primary/60">{String(phase.phaseNumber).padStart(2, '0')}</span><span className="font-semibold">{phase.title}</span><Progress value={state.progressPercent} className="max-w-[150px]" /><span className="text-right text-xs text-muted-foreground">{state.progressPercent}%</span></Link>)}</div></section>
  </div>
}
