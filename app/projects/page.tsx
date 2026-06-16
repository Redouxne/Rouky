import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getCurrentUserId, getRoadmapProgress } from '@/lib/progress'
import { phases, roadmap } from '@/lib/roadmap-data'
import { getDifficultyColor, getDifficultyLabel, formatNumber } from '@/lib/utils'
import { 
  Search,
  Trophy,
  PlayCircle,
  CheckCircle,
  Clock,
  Filter,
  Target
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const userId = await getCurrentUserId()
  const progress = await getRoadmapProgress(userId)

  // Collect all projects with their phase and progress
  const allProjects = []
  
  for (const phase of [...phases, roadmap.capstone]) {
    for (const [difficulty, project] of Object.entries(phase.projects)) {
      allProjects.push({
        ...project,
        phase,
        difficulty,
      })
    }
  }

  // Sort by phase number
  allProjects.sort((a, b) => a.phase.phaseNumber - b.phase.phaseNumber)

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Projets</h1>
            <p className="text-muted-foreground">
              Appliquez vos connaissances avec des projets pratiques
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">{allProjects.length}</CardTitle>
              <CardDescription>Projets au total</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">{allProjects.filter(p => p.difficulty === 'easy').length}</CardTitle>
              <CardDescription>Faciles</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">{allProjects.filter(p => p.difficulty === 'medium').length}</CardTitle>
              <CardDescription>Moyens</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">{allProjects.filter(p => p.difficulty === 'hard').length}</CardTitle>
              <CardDescription>Difficiles</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Search className="h-4 w-4" />
            Tous les projets
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <span className="h-4 w-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">✓</span>
            Non commencés
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <PlayCircle className="h-4 w-4" />
            En cours
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <CheckCircle className="h-4 w-4" />
            Terminés
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            Filtrer par difficulté
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-4">
          {allProjects.map((projectData) => {
            const phase = projectData.phase
            const project = projectData
            const difficulty = projectData.difficulty as 'easy' | 'medium' | 'hard'

            return (
              <Card 
                key={project.id} 
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-sm px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          Phase {phase.phaseNumber}
                        </span>
                      </CardTitle>
                      <CardDescription className="mt-1 flex items-center gap-2">
                        <Trophy className="h-4 w-4" />
                        {project.title}
                      </CardDescription>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(difficulty)}`}>
                      {getDifficultyLabel(difficulty)}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{project.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Objectif</span>
                    </div>
                    <p className="text-sm bg-muted/50 p-2 rounded">{project.objective}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="text-xs">
                      <strong className="text-muted-foreground">Stack suggérée:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.suggestedStack.map((tech) => (
                          <span key={tech} className="px-1.5 py-0.5 bg-muted/50 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs">
                      <strong className="text-muted-foreground">Livrables:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        {project.deliverables.map((deliverable, index) => (
                          <li key={index} className="text-muted-foreground">{deliverable}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/roadmap/${phase.id}`}>
                          <Target className="h-4 w-4 mr-1" />
                          Voir la phase
                        </Link>
                      </Button>
                      <Button size="sm" variant="ghost">
                        <PlayCircle className="h-4 w-4 mr-1" />
                        Commencer
                      </Button>
                    </div>
                    <span className="text-sm font-medium">+{project.xp} XP</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
