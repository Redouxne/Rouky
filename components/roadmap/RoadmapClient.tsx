'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useProgress } from '@/components/ProgressProvider'
import { getRoadmapSummary } from '@/lib/local-progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import type { Phase } from '@/types/roadmap'
export function RoadmapClient({ phases }: { phases: Phase[]; capstone: Phase }) {
  const { progress } = useProgress()
  const [filter, setFilter] = useState<'all' | 'completed' | 'in_progress' | 'locked'>('all')
  const summary = getRoadmapSummary(phases, progress)
  const visible = summary.phases.filter(item => filter === 'all' || item.summary.status === filter)
  return <div className="mx-auto max-w-6xl space-y-6"><div><h1 className="text-3xl font-bold">Roadmap</h1><p className="text-muted-foreground">Votre parcours d’ingénierie IA</p></div>
    <Card><CardHeader><CardTitle>Progression globale · {summary.totalProgressPercent}%</CardTitle></CardHeader><CardContent><Progress value={summary.totalProgressPercent} /><p className="mt-2 text-sm text-muted-foreground">{summary.totalTasksCompleted}/{summary.totalTasks} tâches · {summary.completedPhases}/{summary.totalPhases} phases validées</p></CardContent></Card>
    <div className="flex flex-wrap gap-2">{([['all','Toutes'],['completed','Validées'],['in_progress','En cours'],['locked','Bloquées']] as const).map(([value,label]) => <Button key={value} size="sm" variant={filter === value ? 'default' : 'outline'} onClick={() => setFilter(value)}>{label}</Button>)}</div>
    <div className="grid gap-4 md:grid-cols-2">{visible.map(({ phase, summary: status }) => <Card key={phase.id} className={status.status === 'locked' ? 'opacity-70' : ''}><CardHeader><CardTitle>Phase {phase.phaseNumber} · {phase.title}</CardTitle></CardHeader><CardContent className="space-y-3"><p className="text-sm text-muted-foreground">{phase.objective}</p><Progress value={status.progressPercent} /><p className="text-xs">{status.status === 'locked' ? 'Bloquée' : status.status === 'available' ? 'Non commencée' : status.status === 'completed' ? 'Validée' : 'En cours'} · {status.completedTasks}/{status.totalTasks} tâches</p><Button asChild variant="outline" size="sm"><Link href={`/roadmap/${phase.id}`}>Consulter la phase</Link></Button></CardContent></Card>)}</div>
  </div>
}
