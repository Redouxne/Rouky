'use client'
import Link from 'next/link'
import { useProgress } from '@/components/ProgressProvider'
import { getRoadmapSummary } from '@/lib/local-progress'
import { phases } from '@/lib/roadmap-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
export default function ProgressPage() {
  const { progress } = useProgress()
  const summary = getRoadmapSummary(phases, progress)
  const submitted = Object.values(progress.projects).filter(p=>p.status==='submitted').length
  return <div className="mx-auto max-w-5xl space-y-6"><div className="flex items-center justify-between"><h1 className="text-3xl font-bold">Progression</h1><Button asChild variant="outline"><Link href="/settings">Exporter les données</Link></Button></div><div className="grid gap-4 sm:grid-cols-3">{[[summary.totalTasksCompleted,'Tâches'],[summary.completedPhases,'Phases validées'],[submitted,'Dépôts à autoévaluer']].map(([value,label])=><Card key={label}><CardHeader><CardTitle>{value}</CardTitle></CardHeader><CardContent>{label}</CardContent></Card>)}</div><Card><CardHeader><CardTitle>Parcours · {summary.totalProgressPercent}%</CardTitle></CardHeader><CardContent className="space-y-4"><Progress value={summary.totalProgressPercent}/>{summary.phases.map(({phase,summary:s})=><div key={phase.id} className="flex justify-between gap-2 border-b border-border pb-2 text-sm"><Link className="underline" href={`/roadmap/${phase.id}`}>Phase {phase.phaseNumber} · {phase.title}</Link><span>{s.progressPercent}%</span></div>)}</CardContent></Card></div>
}
