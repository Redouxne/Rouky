import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { getCurrentUserId, getPhaseProgress } from '@/lib/progress'
import { phases, roadmap } from '@/lib/roadmap-data'
import { formatNumber, getDifficultyColor, getDifficultyLabel, getStatusColor } from '@/lib/utils'
import { 
  CheckSquare, 
  Clock, 
  Target,
  Code,
  BookOpen,
  PlayCircle,
  CheckCircle,
  Trophy,
  Lightbulb,
  FileText
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function PhaseDetailPage({ 
  params }: { 
  params: { phaseId: string } 
}) {
  const userId = await getCurrentUserId()
  const phase = phases.find(p => p.id === params.phaseId) || roadmap.capstone
  
  if (!phase) {
    return notFound()
  }

  const phaseData = await getPhaseProgress(userId, params.phaseId)
  
  if (!phaseData) {
    return notFound()
  }

  const isCompleted = phaseData.userProgress.status === 'completed'
  const progressPercent = phaseData.userProgress.progressPercent

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <Link href="/roadmap" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
            ← Retour à la Roadmap
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold text-xl">
              {phase.phaseNumber}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{phase.title}</h1>
              <p className="text-lg text-muted-foreground">{phase.objective}</p>
            </div>
          </div>

          {/* Phase Stats */}
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-full">
              <Clock className="h-4 w-4" />
              {phase.estimatedTime}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-full">
              <Target className="h-4 w-4" />
              {phase.tasks.length} tâches
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-full">
              <Trophy className="h-4 w-4" />
              3 projets
            </span>
            <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${getDifficultyColor(phase.difficulty)}`}>
              <Lightbulb className="h-4 w-4" />
              {getDifficultyLabel(phase.difficulty)}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Progression de la phase</CardTitle>
            <CardDescription>
              {phaseData.userProgress.completedTasks} / {phaseData.tasks.length} tâches complétées
              {phaseData.userProgress.hasCompletedProject && ' + 1 projet validé'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {formatNumber(progressPercent)}% terminé
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(phaseData.userProgress.status)}`}>
                  {phaseData.userProgress.status === 'locked' ? 'Verrouillée' : 
                   phaseData.userProgress.status === 'available' ? 'Disponible' :
                   phaseData.userProgress.status === 'in_progress' ? 'En cours' : 'Terminée'}
                </span>
              </div>
              <Progress value={progressPercent} className="h-3" />
              
              {phaseData.userProgress.status === 'completed' && (
                <p className="text-sm text-primary flex items-center gap-1.5 mt-2">
                  <CheckCircle className="h-4 w-4" />
                  Phase terminée !
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed">
              {phase.description}
            </p>
          </CardContent>
        </Card>

        {/* Modules */}
        {phase.modules.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Modules ({phase.modules.length})
              </CardTitle>
              <CardDescription>
                Concepts théoriques à maîtriser
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {phase.modules.map((module) => (
                  <div 
                    key={module.id} 
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium">{module.title}</span>
                      {module.description && (
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {module.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Tâches ({phase.tasks.length})
            </CardTitle>
            <CardDescription>
              Tâches pratiques à accomplir
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {phase.tasks.map((task, index) => {
              return (
                <div 
                  key={task.id} 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Checkbox 
                    id={`task-${phase.id}-${index}`}
                    checked={false}
                    disabled={phaseData.userProgress.status === 'locked'}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label 
                    htmlFor={`task-${phase.id}-${index}`}
                    className="flex-1 text-sm cursor-pointer"
                  >
                    {task.title}
                    {task.description && (
                      <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                        {task.description}
                      </span>
                    )}
                    <span className="block text-xs text-muted-foreground">
                      +{task.xp} XP
                    </span>
                  </label>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    className="ml-auto h-8 w-8"
                    disabled
                    title="Validation bientôt disponible"
                  >
                    <CheckSquare className="h-4 w-4" />
                  </Button>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Projets ({Object.keys(phase.projects).length})
            </CardTitle>
            <CardDescription>
              Projets pour appliquer vos connaissances
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(phase.projects).map(([difficulty, project]) => {
              const isStarted = false
              const isCompleted = false

              return (
                <div 
                  key={project.id} 
                  className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{project.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(difficulty)}`}>
                          {getDifficultyLabel(difficulty)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <span className="text-sm font-medium">+{project.xp} XP</span>
                  </div>

                  <div className="space-y-2 mb-3">
                    <p className="text-sm text-muted-foreground">
                      <strong>Objectif:</strong> {project.objective}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Stack suggérée:</strong> {project.suggestedStack.join(', ')}
                    </p>
                    {project.requiresGithubRepo && (
                      <p className="inline-flex rounded-[2px] border border-primary/35 bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        Dépôt GitHub requis pour la future validation par Rouky
                      </p>
                    )}
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <strong className="text-sm text-muted-foreground">Livrables</strong>
                        <ul className="mt-1 list-disc list-inside space-y-0.5 text-xs text-muted-foreground">
                          {project.deliverables.map((deliverable) => (
                            <li key={deliverable}>{deliverable}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong className="text-sm text-muted-foreground">Critères de validation</strong>
                        <ul className="mt-1 list-disc list-inside space-y-0.5 text-xs text-muted-foreground">
                          {project.validationCriteria.map((criterion) => (
                            <li key={criterion}>{criterion}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {!isStarted && !isCompleted && (
                      <Button type="button" size="sm" variant="outline" disabled>
                        <PlayCircle className="h-4 w-4 mr-1" />
                        Commencer
                      </Button>
                    )}
                    
                    {isStarted && !isCompleted && (
                      <Button type="button" size="sm" disabled>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Valider
                      </Button>
                    )}

                    {isCompleted && (
                      <Button size="sm" variant="secondary" disabled>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Validé
                      </Button>
                    )}

                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`#`}>
                        <FileText className="h-4 w-4" />
                        Détails
                      </Link>
                    </Button>
                  </div>

                  {isCompleted && (
                    <p className="text-sm text-primary flex items-center gap-1.5 mt-2">
                      <CheckCircle className="h-4 w-4" />
                      Projet validé ! +{project.xp} XP
                    </p>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Phase Completion */}
        {isCompleted && (
          <Card className="border-2 border-primary bg-primary/5">
            <CardHeader className="text-center">
              <CardTitle className="text-primary">
                Phase terminée ! 🎉
              </CardTitle>
              <CardDescription className="text-center">
                Vous avez complété toutes les tâches et validé au moins un projet
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center gap-4">
                <div>
                  <div className="text-2xl font-bold text-primary">+100 XP</div>
                  <div className="text-sm text-muted-foreground">Récompense de phase</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{phase.tasks.length}</div>
                  <div className="text-sm text-muted-foreground">Tâches complétées</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1+</div>
                  <div className="text-sm text-muted-foreground">Projet validé</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
