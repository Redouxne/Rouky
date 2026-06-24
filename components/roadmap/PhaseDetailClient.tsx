'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import {
  createEmptyLocalProgress,
  getNextPhase,
  getPhaseSummary,
  getPreviousPhase,
  getProjectProgress,
  getProjectsForPhase,
  isGithubUrlValid,
  readLocalProgress,
  saveLocalProgress,
  type LocalProgressState,
} from '@/lib/local-progress'
import { formatNumber, getDifficultyColor, getDifficultyLabel, getStatusColor } from '@/lib/utils'
import type { Phase, Project } from '@/types/roadmap'
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  CheckSquare,
  Clock,
  ExternalLink,
  Github,
  Lightbulb,
  Lock,
  PlayCircle,
  Save,
  Target,
  Trophy,
} from 'lucide-react'

interface PhaseDetailClientProps {
  phase: Phase
  phases: Phase[]
}

const nowIso = () => new Date().toISOString()

export function PhaseDetailClient({ phase, phases }: PhaseDetailClientProps) {
  const [progress, setProgress] = useState<LocalProgressState>(createEmptyLocalProgress)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setProgress(readLocalProgress())
    setIsHydrated(true)
  }, [])

  const summary = useMemo(
    () => getPhaseSummary(phase, phases, progress),
    [phase, phases, progress]
  )
  const nextPhase = getNextPhase(phase, phases)
  const previousPhase = getPreviousPhase(phase, phases)
  const isCompleted = summary.status === 'completed'
  const isLocked = summary.status === 'locked'
  const isReadOnly = !isHydrated || isLocked || isCompleted

  const persist = (updater: (current: LocalProgressState) => LocalProgressState) => {
    setProgress(current => {
      const next = updater(current)
      saveLocalProgress(next)
      return next
    })
  }

  const toggleTask = (taskId: string) => {
    if (isReadOnly) return

    persist(current => {
      const currentTask = current.tasks[taskId]
      const completed = !currentTask?.completed

      return {
        ...current,
        tasks: {
          ...current.tasks,
          [taskId]: {
            completed,
            completedAt: completed ? nowIso() : undefined,
          },
        },
      }
    })
  }

  const startProject = (project: Project) => {
    if (isReadOnly) return

    persist(current => {
      const currentProject = getProjectProgress(current, project.id)

      return {
        ...current,
        projects: {
          ...current.projects,
          [project.id]: {
            ...currentProject,
            status: currentProject.status === 'completed' ? 'completed' : 'in_progress',
            startedAt: currentProject.startedAt || nowIso(),
          },
        },
      }
    })
  }

  const updateGithubUrl = (project: Project, githubUrl: string) => {
    if (isReadOnly) return

    persist(current => {
      const currentProject = getProjectProgress(current, project.id)

      return {
        ...current,
        projects: {
          ...current.projects,
          [project.id]: {
            ...currentProject,
            status: currentProject.status === 'not_started' ? 'in_progress' : currentProject.status,
            startedAt: currentProject.startedAt || nowIso(),
            githubUrl,
          },
        },
      }
    })
  }

  const completeProject = (project: Project) => {
    if (isReadOnly) return

    const currentProject = getProjectProgress(progress, project.id)
    if (project.requiresGithubRepo && !isGithubUrlValid(currentProject.githubUrl)) return

    persist(current => {
      const projectProgress = getProjectProgress(current, project.id)

      return {
        ...current,
        projects: {
          ...current.projects,
          [project.id]: {
            ...projectProgress,
            status: 'completed',
            startedAt: projectProgress.startedAt || nowIso(),
            completedAt: projectProgress.completedAt || nowIso(),
          },
        },
      }
    })
  }

  const validatePhase = () => {
    if (!summary.canValidatePhase || isCompleted) return

    persist(current => ({
      ...current,
      phases: {
        ...current.phases,
        [phase.id]: {
          status: 'completed',
          completedAt: nowIso(),
        },
      },
    }))
  }

  const renderProjectAction = (project: Project) => {
    const projectProgress = getProjectProgress(progress, project.id)
    const githubUrl = projectProgress.githubUrl || ''
    const needsGithubUrl = Boolean(project.requiresGithubRepo)
    const hasValidGithubUrl = isGithubUrlValid(githubUrl)

    if (projectProgress.status === 'completed') {
      return (
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="secondary" disabled>
            <CheckCircle className="mr-1 h-4 w-4" />
            Projet validé
          </Button>
          {githubUrl && (
            <Button size="sm" variant="ghost" asChild>
              <Link href={githubUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-1 h-4 w-4" />
                Voir le dépôt
              </Link>
            </Button>
          )}
        </div>
      )
    }

    if (projectProgress.status === 'not_started') {
      return (
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={isReadOnly}
          onClick={() => startProject(project)}
        >
          <PlayCircle className="mr-1 h-4 w-4" />
          Commencer
        </Button>
      )
    }

    return (
      <div className="space-y-3">
        {needsGithubUrl && (
          <div className="space-y-2">
            <label htmlFor={`github-${project.id}`} className="text-xs font-medium text-muted-foreground">
              Dépôt GitHub du projet
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id={`github-${project.id}`}
                type="url"
                value={githubUrl}
                onChange={event => updateGithubUrl(project, event.target.value)}
                placeholder="https://github.com/votre-compte/votre-repo"
                disabled={isReadOnly}
                className="h-10 min-w-0 flex-1 rounded-[2px] border border-input bg-background/50 px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
              <span className={`inline-flex h-10 items-center justify-center rounded-[2px] border px-3 text-xs font-medium ${hasValidGithubUrl ? 'border-primary/35 bg-primary/10 text-primary' : 'border-border bg-muted/40 text-muted-foreground'}`}>
                <Save className="mr-1 h-4 w-4" />
                {hasValidGithubUrl ? 'Dépôt enregistré' : 'URL attendue'}
              </span>
            </div>
            {githubUrl && !hasValidGithubUrl && (
              <p className="text-xs text-destructive">
                Utilise une URL de dépôt GitHub valide, par exemple https://github.com/user/repo.
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            disabled={isReadOnly || (needsGithubUrl && !hasValidGithubUrl)}
            onClick={() => completeProject(project)}
          >
            <CheckCircle className="mr-1 h-4 w-4" />
            Valider le projet
          </Button>
          {needsGithubUrl && (
            <span className="text-xs text-muted-foreground">
              La validation Rouky automatisée viendra ensuite. Pour le MVP, une URL GitHub valide suffit.
            </span>
          )}
        </div>
      </div>
    )
  }

  const missingTasks = summary.totalTasks - summary.completedTasks
  const needsProject = summary.completedProjects === 0

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <Link href="/roadmap" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            ← Retour à la Roadmap
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-xl font-bold text-primary-foreground">
              {phase.phaseNumber}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{phase.title}</h1>
              <p className="text-lg text-muted-foreground">{phase.objective}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1.5">
              <Clock className="h-4 w-4" />
              {phase.estimatedTime}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1.5">
              <Target className="h-4 w-4" />
              {phase.tasks.length} tâches
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1.5">
              <Trophy className="h-4 w-4" />
              3 projets
            </span>
            <span className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ${getDifficultyColor(phase.difficulty)}`}>
              <Lightbulb className="h-4 w-4" />
              {getDifficultyLabel(phase.difficulty)}
            </span>
          </div>
        </div>

        {isLocked && (
          <Card className="border-primary/35 bg-primary/5">
            <CardContent className="flex items-start gap-3 pt-6">
              <Lock className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Phase verrouillée</p>
                <p className="text-sm text-muted-foreground">
                  Termine et valide {previousPhase ? `la phase ${previousPhase.phaseNumber}` : 'la phase précédente'} pour commencer celle-ci.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Progression de la phase</CardTitle>
            <CardDescription>
              {summary.completedTasks} / {summary.totalTasks} tâches complétées
              {summary.completedProjects > 0 && ` + ${summary.completedProjects} projet validé`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {formatNumber(summary.progressPercent)}% terminé
                </span>
                <span className={`rounded-full px-2 py-0.5 text-xs ${getStatusColor(summary.status)}`}>
                  {summary.status === 'locked' ? 'Verrouillée' :
                    summary.status === 'available' ? 'Disponible' :
                      summary.status === 'in_progress' ? 'En cours' : 'Terminée'}
                </span>
              </div>
              <Progress value={summary.progressPercent} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="leading-relaxed text-muted-foreground">{phase.description}</p>
          </CardContent>
        </Card>

        {phase.modules.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Modules ({phase.modules.length})
              </CardTitle>
              <CardDescription>Concepts théoriques à maîtriser</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {phase.modules.map(module => (
                  <div key={module.id} className="flex items-start gap-3 rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted/80">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium">{module.title}</span>
                      {module.description && (
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{module.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Tâches ({phase.tasks.length})
            </CardTitle>
            <CardDescription>Chaque case cochée est sauvegardée dans ce navigateur.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {phase.tasks.map((task, index) => {
              const checked = Boolean(progress.tasks[task.id]?.completed)

              return (
                <div key={task.id} className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50">
                  <Checkbox
                    id={`task-${phase.id}-${index}`}
                    checked={checked}
                    disabled={isReadOnly}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="mt-1 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                  />
                  <label htmlFor={`task-${phase.id}-${index}`} className="flex-1 cursor-pointer text-sm">
                    {task.title}
                    {task.description && (
                      <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{task.description}</span>
                    )}
                    <span className="block text-xs text-muted-foreground">+{task.xp} XP</span>
                  </label>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Projets ({getProjectsForPhase(phase).length})
            </CardTitle>
            <CardDescription>Commence un projet, ajoute le dépôt GitHub si demandé, puis valide-le.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(phase.projects).map(([difficulty, project]) => {
              const projectProgress = getProjectProgress(progress, project.id)
              const githubUrl = projectProgress.githubUrl

              return (
                <div key={project.id} className="rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
                  <div className="mb-2 flex justify-between gap-4">
                    <div>
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{project.title}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-xs ${getDifficultyColor(difficulty as 'easy' | 'medium' | 'hard')}`}>
                          {getDifficultyLabel(difficulty)}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-xs ${getStatusColor(projectProgress.status === 'not_started' ? 'available' : projectProgress.status)}`}>
                          {projectProgress.status === 'not_started' ? 'Non commencé' :
                            projectProgress.status === 'in_progress' ? 'En cours' : 'Validé'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <span className="shrink-0 text-sm font-medium">+{project.xp} XP</span>
                  </div>

                  <div className="mb-3 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <strong>Objectif:</strong> {project.objective}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Stack suggérée:</strong> {project.suggestedStack.join(', ')}
                    </p>
                    {project.requiresGithubRepo && (
                      <p className="inline-flex items-center gap-1 rounded-[2px] border border-primary/35 bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        <Github className="h-3.5 w-3.5" />
                        Dépôt GitHub requis pour la validation Rouky
                      </p>
                    )}
                    {githubUrl && isGithubUrlValid(githubUrl) && (
                      <p className="text-xs text-muted-foreground">
                        Dépôt enregistré: <Link className="text-primary hover:underline" href={githubUrl} target="_blank" rel="noreferrer">{githubUrl}</Link>
                      </p>
                    )}
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <strong className="text-sm text-muted-foreground">Livrables</strong>
                        <ul className="mt-1 list-inside list-disc space-y-0.5 text-xs text-muted-foreground">
                          {project.deliverables.map(deliverable => (
                            <li key={deliverable}>{deliverable}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong className="text-sm text-muted-foreground">Critères de validation</strong>
                        <ul className="mt-1 list-inside list-disc space-y-0.5 text-xs text-muted-foreground">
                          {project.validationCriteria.map(criterion => (
                            <li key={criterion}>{criterion}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {renderProjectAction(project)}
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card className={summary.canValidatePhase || isCompleted ? 'border-primary/50 bg-primary/5' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Validation de phase
            </CardTitle>
            <CardDescription>
              Pour passer à la suite: toutes les tâches cochées et au moins un projet validé.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isCompleted && (
              <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                <div className={missingTasks === 0 ? 'text-primary' : ''}>
                  {missingTasks === 0 ? 'Toutes les tâches sont complétées' : `${missingTasks} tâche(s) restante(s)`}
                </div>
                <div className={!needsProject ? 'text-primary' : ''}>
                  {!needsProject ? 'Projet validé' : 'Aucun projet validé'}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {!isCompleted ? (
                <Button type="button" disabled={!summary.canValidatePhase} onClick={validatePhase}>
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Valider la phase
                </Button>
              ) : (
                <Button type="button" variant="secondary" disabled>
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Phase validée
                </Button>
              )}

              {isCompleted && nextPhase && (
                <Button asChild variant="outline">
                  <Link href={`/roadmap/${nextPhase.id}`}>
                    Passer à la phase {nextPhase.phaseNumber}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
