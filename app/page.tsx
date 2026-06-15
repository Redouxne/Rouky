import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { roadmap } from '@/lib/roadmap-data'
import { getCurrentUserId, getRoadmapProgress } from '@/lib/progress'
import { formatNumber } from '@/lib/utils'

export default async function HomePage() {
  const userId = await getCurrentUserId()
  const progress = await getRoadmapProgress(userId)

  return (
    <div className="container mx-auto max-w-4xl">
      {/* Hero Section */}
      <section className="text-center py-12 lg:py-20">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <span className="text-3xl font-bold">R</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          Deviens Ingénieur IA étape par étape
        </h1>
        
        <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Une roadmap interactive et gamifiée pour maîtriser tous les concepts clés 
          de l'ingénierie IA, du Python aux LLM, en passant par le Deep Learning et les Agents.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Voir ma progression
            </Button>
          </Link>
          <Link href="/roadmap">
            <Button size="lg" variant="outline" className="px-8">
              Explorer la Roadmap
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">{roadmap.totalPhases}</CardTitle>
              <CardDescription>Phases à maîtriser</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">{roadmap.totalTasks}</CardTitle>
              <CardDescription>Tâches à accomplir</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">{roadmap.totalProjects}</CardTitle>
              <CardDescription>Projets pratiques</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">18+</CardTitle>
              <CardDescription>Compétences clés</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Progress Section */}
      {progress.totalProgressPercent > 0 && (
        <section className="py-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Votre progression</h2>
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Progression globale
                  </span>
                  <span className="text-sm font-medium">
                    {formatNumber(progress.totalProgressPercent)}%
                  </span>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress.totalProgressPercent}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{progress.completedPhases}</div>
                    <div className="text-sm text-muted-foreground">Phases terminées</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{progress.inProgressPhases}</div>
                    <div className="text-sm text-muted-foreground">Phases en cours</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{progress.availablePhases}</div>
                    <div className="text-sm text-muted-foreground">Phases disponibles</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Roadmap Preview */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6">Aperçu de la Roadmap</h2>
        
        <div className="grid gap-4">
          {roadmap.phases.slice(0, 6).map((phase) => (
            <Card key={phase.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-sm px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        Phase {phase.phaseNumber}
                      </span>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {phase.title}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{phase.objective}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-muted/50 rounded-full">
                    {phase.tasks.length} tâches
                  </span>
                  <span className="text-xs px-2 py-1 bg-muted/50 rounded-full">
                    3 projets
                  </span>
                  <span className="text-xs px-2 py-1 bg-muted/50 rounded-full">
                    {phase.estimatedTime}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full " 
                    style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
                    {phase.difficulty}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/roadmap">
            <Button variant="ghost" className="px-6">
              Voir toutes les phases
            </Button>
          </Link>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Système de Gamification</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth={2} d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <CardTitle>Gagnez de l'XP</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Gagnez de l'expérience en complétant des tâches, des modules et des projets. 
                Plus vous apprenez, plus vous montez de niveau.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <CardTitle>Streak quotidien</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Maintenez une série de jours consécutifs d'apprentissage. 
                Plus votre streak est long, plus vous débloquez de récompenses.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0 -.806 1.946 3.42 3.42 0 0 1 -3.138 3.138 3.42 3.42 0 0 0 -1.946.806 3.42 3.42 0 0 1 -4.438 0 3.42 3.42 0 0 0 -1.946-.806 3.42 3.42 0 0 1 -3.138-3.138 3.42 3.42 0 0 0 -.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z" />
                  </svg>
                </div>
                <CardTitle>Débloquez des Badges</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Atteignez des objectifs spécifiques pour débloquer des badges exclusifs 
                et montrer vos accomplissements.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Prêt à commencer ?</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Commencez votre parcours pour devenir Ingénieur IA dès aujourd'hui.
          Chaque étape compte.
        </p>
        
        <Link href="/roadmap">
          <Button size="lg" className="px-8">
            Commencer la Roadmap
          </Button>
        </Link>
      </section>
    </div>
  )
}
