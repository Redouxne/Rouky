'use client'
import { useProgress } from '@/components/ProgressProvider'
import { phases } from '@/lib/roadmap-data'
import { getRoadmapSummary } from '@/lib/local-progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
export default function BadgesPage() {
  const { progress } = useProgress()
  const summary = getRoadmapSummary(phases, progress)
  const projects = Object.values(progress.projects).filter(p=>p.status==='completed').length
  const badges = [{name:'Premier pas',detail:'Cocher une tâche',earned:summary.totalTasksCompleted>=1},{name:'Bâtisseur',detail:'Autoévaluer un projet',earned:projects>=1},{name:'Phase 0',detail:'Valider la première phase',earned:!!progress.phases['phase-0']},{name:'Pythoniste',detail:'Valider la phase 1',earned:!!progress.phases['phase-1']}]
  return <div className="mx-auto max-w-5xl space-y-6"><div><h1 className="text-3xl font-bold">Badges</h1><p className="text-muted-foreground">{badges.filter(b=>b.earned).length}/{badges.length} obtenus selon votre progression réelle</p></div><div className="grid gap-4 sm:grid-cols-2">{badges.map(b=><Card key={b.name} className={b.earned?'':'opacity-60'}><CardHeader><CardTitle>{b.earned?'✓ ':'○ '}{b.name}</CardTitle></CardHeader><CardContent>{b.detail}</CardContent></Card>)}</div></div>
}
