'use client'
import Link from 'next/link'
import { useProgress } from '@/components/ProgressProvider'
import { getRoadmapSummary } from '@/lib/local-progress'
import { phases } from '@/lib/roadmap-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
export default function DashboardPage() {
  const { progress, user } = useProgress()
  const summary = getRoadmapSummary(phases, progress)
  const projects = Object.values(progress.projects).filter(p=>p.status === 'completed').length
  return <div className="mx-auto max-w-6xl space-y-6"><div className="flex items-center justify-between"><div><h1 className="text-3xl font-bold">Dashboard</h1><p className="text-muted-foreground">{user ? `Bonjour ${user.name}` : 'Connectez-vous pour suivre votre parcours'}</p></div><Button asChild><Link href="/roadmap">Reprendre</Link></Button></div>
    <div className="grid gap-4 sm:grid-cols-3">{[[`${summary.totalProgressPercent}%`,'Progression'],[summary.totalTasksCompleted,'Tâches cochées'],[projects,'Projets autoévalués']].map(([value,label])=><Card key={label}><CardHeader><CardTitle>{value}</CardTitle></CardHeader><CardContent>{label}</CardContent></Card>)}</div>
    <Card><CardHeader><CardTitle>Phases</CardTitle></CardHeader><CardContent className="space-y-3">{summary.phases.map(({phase,summary:s})=><Link key={phase.id} href={`/roadmap/${phase.id}`} className="block rounded border border-border p-3 hover:bg-muted"><div className="mb-2 flex justify-between gap-2"><span>Phase {phase.phaseNumber} · {phase.title}</span><span className="text-xs text-muted-foreground">{s.status === 'completed' ? 'Validée' : s.status === 'locked' ? 'Bloquée' : s.status === 'available' ? 'Non commencée' : 'En cours'}</span></div><Progress value={s.progressPercent} /></Link>)}</CardContent></Card>
  </div>
}
