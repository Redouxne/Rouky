import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { getCurrentUserId, getRoadmapProgress, getActivityStats, getUserStats } from '@/lib/progress'
import { getUserBadges } from '@/lib/badges'
import { phases, roadmap } from '@/lib/roadmap-data'
import { formatNumber, formatRelativeDate, getDifficultyLabel, getStatusColor } from '@/lib/utils'
import { CheckSquare, Flame, Trophy, Calendar, Clock, TrendingUp, Award, Target } from 'lucide-react'

export default async function DashboardPage() {
  const userId = await getCurrentUserId()
  const progress = await getRoadmapProgress(userId)
  const stats = await getUserStats(userId)
  const activityStats = await getActivityStats(userId, 7)
  const badges = await getUserBadges(userId)
  const unlockedBadges = badges.filter(b => b.unlocked)

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Suivez votre progression pour devenir Ingénieur IA
            </p>
          </div>
          <Link href="/roadmap">
            <Button>Reprendre ma progression</Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progression globale</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(progress.totalProgressPercent)}%</div>
              <Progress value={progress.totalProgressPercent} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {progress.totalTasksCompleted} / {progress.totalTasks} tâches
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">XP Total</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(stats?.progress?.xp || 0)}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Niveau {stats?.progress?.level || 1}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak actuel</CardTitle>
              <Flame className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.progress?.currentStreak || 0}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Meilleur: {stats?.progress?.bestStreak || 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unlockedBadges.length} / {badges.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Badges débloqués
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Progress */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Progression par Phase</CardTitle>
              <CardDescription>
                Suivez votre avancement dans chaque phase de la roadmap
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {phases.map((phase) => {
                  const phaseProgress = progress.phases.find(p => p.id === phase.id)
                  return (
                    <div key={phase.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            Phase {phase.phaseNumber}
                          </span>
                          <span className="font-medium truncate">{phase.title}</span>
                        </div>
                        <Progress 
                          value={phaseProgress?.progressPercent || 0} 
                          className="h-1.5"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(phaseProgress?.status || 'locked')}`}>
                          {phaseProgress?.status === 'locked' ? 'Verrouillée' : 
                           phaseProgress?.status === 'available' ? 'Disponible' :
                           phaseProgress?.status === 'in_progress' ? 'En cours' : 'Terminée'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {phaseProgress?.progressPercent || 0}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <Link href="/roadmap" className="inline-block mt-4">
                <Button variant="ghost" size="sm" className="w-full">
                  Voir toutes les phases
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activité récente (7 derniers jours)</CardTitle>
              <CardDescription>
                Visualisez votre engagement quotidien
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(activityStats).length > 0 ? (
                  <div className="flex items-end justify-between h-40 gap-2">
                    {Object.entries(activityStats).map(([date, data]) => (
                      <div key={date} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-primary rounded-t-md transition-all duration-300"
                          style={{ height: `${Math.min((data.xp / 500) * 100, 100)}%` }}
                        />
                        <span className="text-xs text-muted-foreground rotate-45 whitespace-nowrap">
                          {new Date(date).toLocaleDateString('fr-FR', { weekday: 'short' })}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Aucune activité récente
                  </p>
                )}
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-lg font-bold">{Object.values(activityStats).reduce((sum, d) => sum + d.xp, 0)}</div>
                    <div className="text-xs text-muted-foreground">XP cette semaine</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{Object.values(activityStats).reduce((sum, d) => sum + d.count, 0)}</div>
                    <div className="text-xs text-muted-foreground">Actions effectuées</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tâches terminées</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.stats?.totalTasks || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                sur {progress.totalTasks} tâches
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projets validés</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.stats?.totalProjects || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                projets terminés
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Phases terminées</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.stats?.totalPhases || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                sur {roadmap.totalPhases} phases
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Prochaine étape</CardTitle>
              <CardDescription>
                {progress.inProgressPhases > 0 
                  ? 'Continuez vos phases en cours' 
                  : progress.availablePhases > 0 
                    ? 'Commencez une nouvelle phase' 
                    : 'Félicitations ! Toutes les phases sont terminées'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/roadmap" className="inline-block">
                <Button className="w-full">
                  {progress.inProgressPhases > 0 
                    ? 'Reprendre une phase en cours' 
                    : 'Explorer la Roadmap'}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Objectif quotidien</CardTitle>
              <CardDescription>
                Complétez {stats?.progress?.dailyGoal || 3} tâches aujourd'hui pour gagner un bonus XP
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={0} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 / {stats?.progress?.dailyGoal || 3} tâches</span>
                  <span>+30 XP bonus</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
