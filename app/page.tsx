'use client'
import Link from 'next/link'
import { useProgress } from '@/components/ProgressProvider'
import { getRoadmapSummary } from '@/lib/local-progress'
import { phases, roadmap } from '@/lib/roadmap-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
export default function HomePage() {
  const { progress, user } = useProgress()
  const summary = getRoadmapSummary(phases, progress)
  return <div className="mx-auto max-w-5xl space-y-10"><section className="py-12 text-center"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-3xl font-bold text-primary-foreground">R</div><h1 className="text-4xl font-bold">Deviens ingénieur IA étape par étape</h1><p className="mx-auto my-6 max-w-2xl text-muted-foreground">Un parcours de modules, tâches et projets, du premier environnement de travail aux systèmes IA.</p><div className="flex justify-center gap-3"><Button asChild><Link href={user ? '/roadmap' : '/account'}>{user ? 'Reprendre le parcours' : 'Créer un compte'}</Link></Button><Button asChild variant="outline"><Link href="/roadmap">Explorer la roadmap</Link></Button></div></section>
    <div className="grid gap-4 sm:grid-cols-3">{[[roadmap.totalPhases,'Phases'],[roadmap.totalTasks,'Tâches'],[phases.reduce((n,p)=>n+Object.values(p.projects).length,0),'Projets']].map(([value,label])=><Card key={label}><CardHeader><CardTitle>{value}</CardTitle></CardHeader><CardContent>{label}</CardContent></Card>)}</div>
    {user && <Card><CardHeader><CardTitle>Votre progression · {summary.totalProgressPercent}%</CardTitle></CardHeader><CardContent><Progress value={summary.totalProgressPercent} /><p className="mt-2 text-sm">{summary.completedPhases} phases validées · {summary.totalTasksCompleted} tâches cochées</p></CardContent></Card>}
    <div className="grid gap-3">{phases.slice(0,3).map(phase=><Card key={phase.id}><CardContent className="flex items-center justify-between gap-4 pt-6"><div><strong>Phase {phase.phaseNumber} · {phase.title}</strong><p className="text-sm text-muted-foreground">{phase.objective}</p></div><Button asChild variant="outline" size="sm"><Link href={`/roadmap/${phase.id}`}>Découvrir</Link></Button></CardContent></Card>)}</div>
  </div>
}
