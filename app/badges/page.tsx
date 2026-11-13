'use client'

import { Award, BookOpen, CheckCircle2, GitBranch } from 'lucide-react'
import { useProgress } from '@/components/ProgressProvider'
import { phases } from '@/lib/roadmap-data'
import { getRoadmapSummary } from '@/lib/local-progress'

export default function BadgesPage() {
  const { progress } = useProgress()
  const summary = getRoadmapSummary(phases, progress)
  const projects = Object.values(progress.projects).filter(project => project.status === 'completed').length
  const badges = [
    { name: 'Premier pas', detail: 'Cocher une tâche', earned: summary.totalTasksCompleted >= 1, icon: CheckCircle2 },
    { name: 'Bâtisseur', detail: 'Autoévaluer un projet', earned: projects >= 1, icon: GitBranch },
    { name: 'Phase 0', detail: 'Valider la première phase', earned: !!progress.phases['phase-0'], icon: Award },
    { name: 'Pythoniste', detail: 'Valider la phase 1', earned: !!progress.phases['phase-1'], icon: BookOpen },
  ]

  return <div className="mx-auto max-w-7xl space-y-8 pb-12"><div className="max-w-3xl"><p className="eyebrow">Les jalons</p><h1 className="page-title mt-3">Vos badges<span className="text-primary">.</span></h1><p className="mt-4 text-base text-muted-foreground">{badges.filter(badge => badge.earned).length} sur {badges.length} obtenus. Chacun reflète une action enregistrée dans votre parcours.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{badges.map(badge => <div key={badge.name} className={`sketch-panel p-6 ${badge.earned ? '' : 'opacity-65'}`}><span className={`flex h-12 w-12 items-center justify-center rounded-full ${badge.earned ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}><badge.icon className="h-6 w-6" strokeWidth={1.5} /></span><h2 className="mt-8 text-3xl font-semibold">{badge.name}</h2><p className="mt-2 text-xs text-muted-foreground">{badge.detail}</p><p className="mt-5 border-t border-border pt-4 text-xs font-semibold text-primary">{badge.earned ? 'Obtenu' : 'À débloquer'}</p></div>)}</div></div>
}
