import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { getCurrentUserId, getRoadmapProgress } from '@/lib/progress'
import { roadmap, phases } from '@/lib/roadmap-data'
import { formatNumber, getDifficultyColor, getDifficultyLabel, getStatusColor } from '@/lib/utils'
import { 
  LayoutGrid, 
  Clock, 
  Users, 
  BarChart3, 
  Cpu,
  Brain,
  Database,
  Shield,
  Rocket,
  Target,
  BookOpen,
  Code,
  Network,
  Search,
  Bot,
  TrendingUp
} from 'lucide-react'

const phaseIcons: Record<string, React.ReactNode> = {
  'fundamentals': <BookOpen className="h-5 w-5" />,
  'programming': <Code className="h-5 w-5" />,
  'math': <BarChart3 className="h-5 w-5" />,
  'ml': <Target className="h-5 w-5" />,
  'deep-learning': <Brain className="h-5 w-5" />,
  'nlp': <Cpu className="h-5 w-5" />,
  'llm': <Rocket className="h-5 w-5" />,
  'orchestration': <Network className="h-5 w-5" />,
  'rag': <Search className="h-5 w-5" />,
  'agents': <Bot className="h-5 w-5" />,
  'fine-tuning': <Cpu className="h-5 w-5" />,
  'multimodal': <LayoutGrid className="h-5 w-5" />,
  'mlops': <Shield className="h-5 w-5" />,
  'system-design': <LayoutGrid className="h-5 w-5" />,
  'database': <Database className="h-5 w-5" />,
  'optimization': <TrendingUp className="h-5 w-5" />,
  'rl': <Users className="h-5 w-5" />,
  'ethics': <Shield className="h-5 w-5" />,
}

const phaseColors: Record<string, string> = {
  'fundamentals': 'from-blue-500 to-cyan-500',
  'programming': 'from-green-500 to-emerald-500',
  'math': 'from-purple-500 to-violet-500',
  'ml': 'from-orange-500 to-amber-500',
  'deep-learning': 'from-red-500 to-pink-500',
  'nlp': 'from-indigo-500 to-purple-500',
  'llm': 'from-yellow-500 to-orange-500',
  'orchestration': 'from-teal-500 to-green-500',
  'rag': 'from-cyan-500 to-blue-500',
  'agents': 'from-pink-500 to-red-500',
  'fine-tuning': 'from-violet-500 to-purple-500',
  'multimodal': 'from-rose-500 to-pink-500',
  'mlops': 'from-gray-500 to-slate-500',
  'system-design': 'from-sky-500 to-blue-500',
  'database': 'from-emerald-500 to-green-500',
  'optimization': 'from-amber-500 to-yellow-500',
  'rl': 'from-lime-500 to-green-500',
  'ethics': 'from-slate-500 to-gray-500',
}

export default async function RoadmapPage() {
  const userId = await getCurrentUserId()
  const progress = await getRoadmapProgress(userId)

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Roadmap</h1>
            <p className="text-muted-foreground">
              Votre parcours pour devenir Ingénieur IA
            </p>
          </div>
        </div>

        {/* Progress Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Progression globale</CardTitle>
            <CardDescription>
              {progress.totalProgressPercent}% du parcours terminé
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {progress.totalTasksCompleted} / {progress.totalTasks} tâches
                </span>
                <span className="text-sm font-medium">
                  {progress.completedPhases} / {progress.totalPhases} phases
                </span>
              </div>
              <Progress value={progress.totalProgressPercent} className="h-3" />
              
              <div className="grid grid-cols-3 gap-4 text-center pt-4">
                <div>
                  <div className="text-2xl font-bold">{progress.completedPhases}</div>
                  <div className="text-sm text-muted-foreground">Terminées</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{progress.inProgressPhases}</div>
                  <div className="text-sm text-muted-foreground">En cours</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{progress.availablePhases}</div>
                  <div className="text-sm text-muted-foreground">Disponibles</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <LayoutGrid className="h-4 w-4" />
            Toutes les phases
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <span className="h-4 w-4 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs">✓</span>
            Terminées
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <span className="h-4 w-4 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-xs">⟳</span>
            En cours
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <span className="h-4 w-4 rounded-full bg-gray-500/20 text-gray-500 flex items-center justify-center text-xs">🔒</span>
            Verrouillées
          </Button>
        </div>

        {/* Phases Grid */}
        <div className="grid gap-4">
          {phases.map((phase) => {
            const phaseProgress = progress.phases.find(p => p.id === phase.id)
            const isCompleted = phaseProgress?.status === 'completed'
            const isLocked = phaseProgress?.status === 'locked'
            const progressPercent = phaseProgress?.progressPercent || 0

            return (
              <Card
                key={phase.id}
                className={`hover:shadow-md transition-shadow ${isLocked ? 'opacity-60' : ''}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <span 
                          className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                        >
                          Phase {phase.phaseNumber}
                        </span>
                      </CardTitle>
                      <CardDescription className="mt-1 flex items-center gap-2">
                        {phaseIcons[phase.category] || <BookOpen className="h-4 w-4" />}
                        {phase.title}
                      </CardDescription>
                    </div>
                    <span 
                      className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(phaseProgress?.status || 'locked')}`}
                    >
                      {phaseProgress?.status === 'locked' ? 'Verrouillée' : 
                       phaseProgress?.status === 'available' ? 'Disponible' :
                       phaseProgress?.status === 'in_progress' ? 'En cours' : 'Terminée'}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{phase.objective}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Progression
                      </span>
                      <span className="text-sm font-medium">
                        {formatNumber(progressPercent)}%
                      </span>
                    </div>
                    <Progress 
                      value={progressPercent} 
                      className="h-2"
                      style={{ background: 'var(--muted)' }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-muted/50 rounded-full">
                      {phase.tasks.length} tâches
                    </span>
                    <span className="px-2 py-1 bg-muted/50 rounded-full">
                      3 projets
                    </span>
                    <span className="px-2 py-1 bg-muted/50 rounded-full">
                      <Clock className="h-3 w-3 inline" /> {phase.estimatedTime}
                    </span>
                    <span className={`px-2 py-1 rounded-full ${getDifficultyColor(phase.difficulty)}`}>
                      {getDifficultyLabel(phase.difficulty)}
                    </span>
                  </div>

                  <Link href={`/roadmap/${phase.id}`} className="inline-block">
                    <Button 
                      variant={isLocked ? 'ghost' : 'outline'} 
                      size="sm"
                      className="w-full"
                      disabled={isLocked}
                    >
                      {isCompleted ? 'Voir les détails' : isLocked ? 'Déverrouiller' : 'Continuer'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}

          {/* Capstone */}
          {progress.isCapstoneUnlocked && (
            <Card className="border-2 border-secondary">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/20 text-secondary-foreground">
                        Capstone
                      </span>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      <Crown className="h-5 w-5 inline" /> Projet final
                    </CardDescription>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    Spécial
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Plateforme IA complète - Démontrez votre maîtrise totale
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">1000 XP</span>
                    <span className="text-sm font-medium">Projet final</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <Link href={`/roadmap/capstone`} className="inline-block mt-3">
                  <Button variant="outline" size="sm" className="w-full">
                    Voir le Capstone
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// Simple Crown icon since we don't have it in lucide-react
const Crown = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L8 7H5L3 11L7 15H10L12 22L14 15H17L21 11L19 7H16L12 2Z" />
  </svg>
)
