'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle2, GitBranch } from 'lucide-react'
import { useProgress } from '@/components/ProgressProvider'
import { getRoadmapSummary } from '@/lib/local-progress'
import { phases } from '@/lib/roadmap-data'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export default function DashboardPage() {
  const { progress } = useProgress()
  const summary = getRoadmapSummary(phases, progress)
  const projects = Object.values(progress.projects).filter(project => project.status === 'completed').length
  const next = summary.phases.find(item => item.summary.status === 'in_progress' || item.summary.status === 'available')

  return <div className="mx-auto max-w-7xl space-y-8 pb-12">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Votre atelier</p><h1 className="page-title mt-3">Bonjour<span className="text-primary">.</span></h1><p className="mt-3 text-muted-foreground">Voici où vous en êtes dans votre apprentissage.</p></div><Button asChild><Link href={next ? `/roadmap/${next.phase.id}` : '/roadmap'}>Reprendre <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>

    <section className="sketch-panel bg-[#fffdf8] p-7 md:p-9"><div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end"><div><p className="eyebrow">Le prochain chapitre</p><h2 className="mt-4 text-4xl font-semibold md:text-5xl">{next ? next.phase.title : 'Le parcours est terminé'}</h2><p className="mt-3 max-w-xl text-sm text-muted-foreground">{next ? next.phase.objective : 'Toutes les étapes ont été validées. Votre portfolio raconte le chemin parcouru.'}</p><Button asChild variant="outline" className="mt-6"><Link href={next ? `/roadmap/${next.phase.id}` : '/roadmap'}>{next ? 'Ouvrir le chapitre' : 'Revoir la roadmap'} <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div><div><div className="flex items-baseline justify-between"><span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Avancement total</span><span className="font-display text-5xl font-semibold text-primary">{summary.totalProgressPercent}%</span></div><Progress className="mt-4" value={summary.totalProgressPercent} /><p className="mt-3 text-xs text-muted-foreground">{summary.completedPhases} étapes validées sur {summary.totalPhases}</p></div></div></section>

    <section aria-label="Vos résultats" className="grid gap-3 sm:grid-cols-3">{([[summary.totalTasksCompleted, 'Exercices terminés', CheckCircle2], [projects, 'Projets autoévalués', GitBranch], [summary.completedPhases, 'Étapes validées', BookOpen]] as const).map(([value, label, Icon]) => <div key={String(label)} className="rounded-2xl border border-border bg-card p-6"><Icon className="h-5 w-5 text-primary" strokeWidth={1.7} /><p className="mt-5 font-display text-5xl font-semibold leading-none">{String(value)}</p><p className="mt-2 text-xs text-muted-foreground">{String(label)}</p></div>)}</section>

    <section><div className="mb-5 flex items-end justify-between gap-4"><div><p className="eyebrow">Le carnet de route</p><h2 className="section-title mt-2">Vos étapes.</h2></div><Link href="/roadmap" className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline">Voir la carte <ArrowRight className="h-4 w-4" /></Link></div><div className="overflow-hidden rounded-2xl border border-border bg-card">{summary.phases.map(({ phase, summary: state }) => <Link key={phase.id} href={`/roadmap/${phase.id}`} className="flex flex-wrap items-center gap-3 border-b border-border px-5 py-4 transition-colors last:border-b-0 hover:bg-[#fffdf8] sm:flex-nowrap"><span className="w-9 shrink-0 font-display text-2xl font-semibold text-primary/60">{String(phase.phaseNumber).padStart(2,'0')}</span><span className="min-w-0 flex-1 font-semibold">{phase.title}</span><span className="status-pill" data-status={state.status}>{state.status === 'completed' ? 'Validée' : state.status === 'locked' ? 'Bloquée' : state.status === 'available' ? 'À découvrir' : 'En cours'}</span><span className="w-12 text-right text-xs text-muted-foreground">{state.progressPercent}%</span></Link>)}</div></section>
  </div>
}
