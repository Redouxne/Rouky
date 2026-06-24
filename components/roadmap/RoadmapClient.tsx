'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  createEmptyLocalProgress,
  getRoadmapSummary,
  readLocalProgress,
  type LocalProgressState,
} from '@/lib/local-progress'
import { formatNumber, getDifficultyColor, getDifficultyLabel, getStatusColor } from '@/lib/utils'
import type { Phase } from '@/types/roadmap'
import {
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  CheckCircle,
  Clock,
  Cpu,
  Database,
  LayoutGrid,
  Lock,
  Network,
  Rocket,
  Search,
  Shield,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'

interface RoadmapClientProps {
  phases: Phase[]
  capstone: Phase
}

const phaseIcons: Record<string, ReactNode> = {
  fundamentals: <BookOpen className="h-5 w-5" />,
  programming: <CodeIcon />,
  math: <BarChart3 className="h-5 w-5" />,
  ml: <Target className="h-5 w-5" />,
  'deep-learning': <Brain className="h-5 w-5" />,
  nlp: <Cpu className="h-5 w-5" />,
  llm: <Rocket className="h-5 w-5" />,
  orchestration: <Network className="h-5 w-5" />,
  rag: <Search className="h-5 w-5" />,
  agents: <Bot className="h-5 w-5" />,
  'fine-tuning': <Cpu className="h-5 w-5" />,
  multimodal: <LayoutGrid className="h-5 w-5" />,
  mlops: <Shield className="h-5 w-5" />,
  'system-design': <LayoutGrid className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
  optimization: <TrendingUp className="h-5 w-5" />,
  rl: <Users className="h-5 w-5" />,
  ethics: <Shield className="h-5 w-5" />,
}

export function RoadmapClient({ phases, capstone }: RoadmapClientProps) {
  const [progress, setProgress] = useState<LocalProgressState>(createEmptyLocalProgress)

  useEffect(() => {
    const syncProgress = () => setProgress(readLocalProgress())

    syncProgress()
    window.addEventListener('storage', syncProgress)
    window.addEventListener('focus', syncProgress)
    window.addEventListener('rouky-progress-updated', syncProgress)

    return () => {
      window.removeEventListener('storage', syncProgress)
      window.removeEventListener('focus', syncProgress)
      window.removeEventListener('rouky-progress-updated', syncProgress)
    }
  }, [])

  const summary = useMemo(() => getRoadmapSummary(phases, progress), [phases, progress])

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Roadmap</h1>
            <p className="text-muted-foreground">Votre parcours pour devenir Ingénieur IA</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Progression globale</CardTitle>
            <CardDescription>{summary.totalProgressPercent}% du parcours terminé</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {summary.totalTasksCompleted} / {summary.totalTasks} tâches
                </span>
                <span className="text-sm font-medium">
                  {summary.completedPhases} / {summary.totalPhases} phases
                </span>
              </div>
              <Progress value={summary.totalProgressPercent} className="h-3" />

              <div className="grid grid-cols-3 gap-4 pt-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{summary.completedPhases}</div>
                  <div className="text-sm text-muted-foreground">Terminées</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{summary.inProgressPhases}</div>
                  <div className="text-sm text-muted-foreground">En cours</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{summary.availablePhases}</div>
                  <div className="text-sm text-muted-foreground">Disponibles</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <LayoutGrid className="h-4 w-4" />
            Toutes les phases
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <CheckCircle className="h-4 w-4" />
            Terminées
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-secondary/35 text-xs text-foreground">↻</span>
            En cours
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <Lock className="h-4 w-4" />
            Verrouillées
          </Button>
        </div>

        <div className="grid gap-4">
          {summary.phases.map(({ phase, summary: phaseSummary }) => {
            const isCompleted = phaseSummary.status === 'completed'
            const isLocked = phaseSummary.status === 'locked'

            return (
              <Card key={phase.id} className={`transition-shadow hover:shadow-md ${isLocked ? 'opacity-60' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          Phase {phase.phaseNumber}
                        </span>
                      </CardTitle>
                      <CardDescription className="mt-1 flex items-center gap-2">
                        {phaseIcons[phase.category] || <BookOpen className="h-4 w-4" />}
                        {phase.title}
                      </CardDescription>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${getStatusColor(phaseSummary.status)}`}>
                      {phaseSummary.status === 'locked' ? 'Verrouillée' :
                        phaseSummary.status === 'available' ? 'Disponible' :
                          phaseSummary.status === 'in_progress' ? 'En cours' : 'Terminée'}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{phase.objective}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Progression</span>
                      <span className="text-sm font-medium">{formatNumber(phaseSummary.progressPercent)}%</span>
                    </div>
                    <Progress value={phaseSummary.progressPercent} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-muted/50 px-2 py-1">
                      {phaseSummary.completedTasks} / {phase.tasks.length} tâches
                    </span>
                    <span className="rounded-full bg-muted/50 px-2 py-1">
                      {phaseSummary.completedProjects} / 3 projets validés
                    </span>
                    <span className="rounded-full bg-muted/50 px-2 py-1">
                      <Clock className="inline h-3 w-3" /> {phase.estimatedTime}
                    </span>
                    <span className={`rounded-full px-2 py-1 ${getDifficultyColor(phase.difficulty)}`}>
                      {getDifficultyLabel(phase.difficulty)}
                    </span>
                  </div>

                  {isLocked ? (
                    <Button variant="ghost" size="sm" className="w-full" disabled>
                      Déverrouiller
                    </Button>
                  ) : (
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href={`/roadmap/${phase.id}`}>
                        {isCompleted ? 'Voir les détails' : 'Continuer'}
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}

          {summary.isCapstoneUnlocked && (
            <Card className="border-2 border-secondary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-xs text-secondary-foreground">
                        Capstone
                      </span>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      <Crown className="inline h-5 w-5" /> {capstone.title}
                    </CardDescription>
                  </div>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">Spécial</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground">{capstone.objective}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">1000 XP</span>
                    <span className="text-sm font-medium">Projet final</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <Button asChild variant="outline" size="sm" className="mt-3 w-full">
                  <Link href="/roadmap/capstone">Voir le Capstone</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function CodeIcon() {
  return <Cpu className="h-5 w-5" />
}

function Crown({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2L8 7H5L3 11L7 15H10L12 22L14 15H17L21 11L19 7H16L12 2Z" />
    </svg>
  )
}
