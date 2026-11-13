'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useProgress } from '@/components/ProgressProvider'
import { getPhaseSummary, getProjectProgress, getProjectsForPhase } from '@/lib/local-progress'
import { phases } from '@/lib/roadmap-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
export default function ProjectsPage() {
  const { progress } = useProgress()
  const [status, setStatus] = useState('all')
  const [difficulty, setDifficulty] = useState('all')
  const projects = phases.flatMap(phase=>getProjectsForPhase(phase).map(project=>({phase,project,state:getProjectProgress(progress,project.id)})))
  const visible = projects.filter(({project,state})=>(status === 'all' || state.status === status) && (difficulty === 'all' || project.difficulty === difficulty))
  return <div className="mx-auto max-w-6xl space-y-6"><div><h1 className="text-3xl font-bold">Projets</h1><p className="text-muted-foreground">{projects.length} projets pour mettre les notions en pratique</p></div><div className="flex flex-wrap gap-2">{[['all','Tous'],['not_started','Non commencés'],['in_progress','En cours'],['submitted','Dépôts soumis'],['completed','Autoévalués']].map(([value,label])=><Button key={value} size="sm" variant={status===value?'default':'outline'} onClick={()=>setStatus(value)}>{label}</Button>)}</div><label className="text-sm">Difficulté <select className="ml-2 rounded border bg-background p-2" value={difficulty} onChange={e=>setDifficulty(e.target.value)}><option value="all">Toutes</option><option value="easy">Facile</option><option value="medium">Moyen</option><option value="hard">Difficile</option></select></label><div className="grid gap-4 md:grid-cols-2">{visible.map(({phase,project,state})=><Card key={project.id}><CardHeader><CardTitle className="text-lg">{project.title}</CardTitle></CardHeader><CardContent className="space-y-3"><p className="text-sm text-muted-foreground">Phase {phase.phaseNumber} · {project.difficulty} · {getPhaseSummary(phase,phases,progress).isUnlocked ? state.status === 'submitted' ? 'Dépôt soumis' : state.status === 'completed' ? 'Autoévalué' : state.status === 'in_progress' ? 'En cours' : 'Non commencé' : 'Bloqué'}</p><p className="text-sm">{project.objective}</p><Button asChild variant="outline" size="sm"><Link href={`/roadmap/${phase.id}`}>Voir les consignes</Link></Button></CardContent></Card>)}</div></div>
}
