'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle2, GitBranch, Sparkles } from 'lucide-react'
import { useProgress } from '@/components/ProgressProvider'
import { getRoadmapSummary } from '@/lib/local-progress'
import { phases, roadmap } from '@/lib/roadmap-data'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export default function HomePage() {
  const { progress } = useProgress()
  const summary = getRoadmapSummary(phases, progress)
  const next = summary.phases.find(item => item.summary.status === 'in_progress' || item.summary.status === 'available')

  return <div className="mx-auto max-w-7xl space-y-16 pb-12">
    <section className="sketch-panel bg-[#fffdf8]">
      <div className="grid min-h-[500px] items-center gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10 px-7 pb-4 pt-12 sm:px-10 lg:px-14 lg:py-14">
          <p className="eyebrow mb-5">Le parcours d’ingénierie IA</p>
          <h1 className="max-w-2xl text-5xl font-semibold sm:text-6xl lg:text-[4.5rem]">Apprenez l’IA.<br /><em className="font-normal text-primary">Construisez pour de vrai.</em></h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">Un chemin clair, du premier script Python aux systèmes IA en production. Chaque étape mène à un projet concret et documenté.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href={next ? `/roadmap/${next.phase.id}` : '/roadmap'}>{summary.totalTasksCompleted ? 'Continuer mon parcours' : 'Commencer le parcours'} <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/roadmap">Voir les étapes</Link></Button>
          </div>
          <p className="mt-8 border-t border-border pt-5 text-xs text-muted-foreground">À votre rythme · progression sauvegardée dans ce navigateur · projets sur GitHub</p>
        </div>
        <div className="relative flex h-[280px] items-end justify-center overflow-hidden sm:h-[390px] lg:h-full lg:min-h-[500px]">
          <div className="absolute inset-x-8 bottom-8 h-48 rounded-full bg-[#e8e0d0]/50 blur-3xl" aria-hidden="true" />
          <Image src="/images/rouky-cartographer.png" alt="Une apprenante dessine sa carte de progression à la main" width={1774} height={887} priority className="relative h-auto w-full max-w-full object-contain lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2" />
        </div>
      </div>
    </section>

    <section aria-label="Le parcours en chiffres" className="grid gap-3 sm:grid-cols-3">
      {([[roadmap.totalPhases, 'étapes guidées', BookOpen], [roadmap.totalTasks, 'exercices à pratiquer', CheckCircle2], [roadmap.totalProjects, 'projets à construire', GitBranch]] as const).map(([value, label, Icon]) => <div key={String(label)} className="flex items-center gap-5 rounded-2xl border border-border bg-card px-6 py-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f3ece1] text-primary"><Icon className="h-5 w-5" strokeWidth={1.6} /></span>
        <div><p className="font-display text-4xl font-semibold leading-none">{String(value)}</p><p className="mt-1 text-xs text-muted-foreground">{String(label)}</p></div>
      </div>)}
    </section>

    {summary.totalTasksCompleted > 0 && <section className="sketch-panel flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div className="flex-1"><p className="eyebrow">Votre carnet de route</p><h2 className="mt-2 text-3xl font-semibold">Vous avez déjà parcouru {summary.totalProgressPercent}% du chemin.</h2><p className="mt-2 text-sm text-muted-foreground">{summary.completedPhases} phases validées · {summary.totalTasksCompleted} exercices terminés</p><Progress className="mt-5 max-w-xl" value={summary.totalProgressPercent} /></div>
      <Button asChild variant="outline"><Link href="/dashboard">Ouvrir mon tableau de bord <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
    </section>}

    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Premiers chapitres</p><h2 className="section-title mt-2">Le début d’un vrai parcours.</h2></div><Link href="/roadmap" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Toutes les étapes <ArrowRight className="h-4 w-4" /></Link></div>
      <div className="grid gap-4 md:grid-cols-3">{phases.slice(0, 3).map(phase => <Link key={phase.id} href={`/roadmap/${phase.id}`} className="group sketch-panel p-6 transition-transform hover:-translate-y-1">
        <div className="flex items-start justify-between"><span className="chapter-number">{String(phase.phaseNumber).padStart(2, '0')}</span><Sparkles className="h-5 w-5 text-primary/50" strokeWidth={1.4} /></div>
        <h3 className="mt-8 text-[2rem] font-semibold">{phase.title}</h3><p className="mt-2 min-h-[4.5rem] text-sm text-muted-foreground">{phase.objective}</p>
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs font-semibold text-primary"><span>{phase.tasks.length} exercices · 3 projets</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
      </Link>)}</div>
    </section>
  </div>
}
