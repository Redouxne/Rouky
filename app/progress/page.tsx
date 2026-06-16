import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { getCurrentUserId, getRoadmapProgress, getActivityStats, exportProgress } from '@/lib/progress'
import { getUserBadges, badges } from '@/lib/badges'
import { phases, roadmap } from '@/lib/roadmap-data'
import { formatNumber, formatDate, getStatusColor } from '@/lib/utils'
import { 
  BarChart3,
  Calendar,
  Trophy,
  TrendingUp,
  Download,
  Medal,
  Clock,
  CheckSquare,
  Target
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ProgressPage() {
  const userId = await getCurrentUserId()
  const progress = await getRoadmapProgress(userId)
  const activityStats = await getActivityStats(userId, 30)
  const userBadges = await getUserBadges(userId)
  const unlockedBadges = userBadges.filter(b => b.unlocked)

  // Get detailed stats
  const stats = {
    totalXP: 0,
    level: 1,
    currentStreak: 0,
    bestStreak: 0,
    dailyGoal: 3,
  }

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Progression</h1>
            <p className="text-muted-foreground">
              Vue détaillée de votre parcours d'apprentissage
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>

        {/* Overall Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <Medal className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(0)} XP</div>
              <p className="text-xs text-muted-foreground mt-2">
                Niveau 1
              </p>
              <Progress value={0} className="h-1.5 mt-2" />
              <p className="text-xs text-muted-foreground mt-1">0 / 100 XP pour le niveau 2</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streaks</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Actuel</span>
                  <span className="font-bold">{stats.currentStreak}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Meilleur</span>
                  <span className="font-bold">{stats.bestStreak}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Calendrier d'activité (30 derniers jours)
            </CardTitle>
            <CardDescription>
              Visualisez votre régularité d'apprentissage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-1">
                {Object.entries(activityStats).map(([date, data]) => (
                  <div 
                    key={date} 
                    className="aspect-square rounded-sm bg-muted/50 hover:bg-muted/80 transition-colors flex items-center justify-center text-xs"
                    style={{ 
                      backgroundColor: data.xp > 0 ? 
                        `hsl(var(--primary) / ${Math.min(data.xp / 100, 1)})` : 
                        'hsl(var(--muted))'
                    }}
                    title={`${formatDate(new Date(date))} - ${data.xp} XP`}
                  >
                    {data.xp > 0 && data.xp}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground pt-2">
                <span>Moins</span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-muted" />
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-primary/20" />
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-primary/40" />
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-primary/60" />
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-primary" />
                </span>
                <span>Plus</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phase Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Progression par Phase
            </CardTitle>
            <CardDescription>
              Détail de votre avancement dans chaque phase
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {progress.phases.map((phaseProgress) => {
              const phase = phases.find(p => p.id === phaseProgress.id)
              if (!phase) return null

              return (
                <div key={phase.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        Phase {phase.phaseNumber}
                      </span>
                      <span className="font-medium">{phase.title}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(phaseProgress.status)}`}>
                      {phaseProgress.status === 'locked' ? 'Verrouillée' : 
                       phaseProgress.status === 'available' ? 'Disponible' :
                       phaseProgress.status === 'in_progress' ? 'En cours' : 'Terminée'}
                    </span>
                  </div>
                  <Progress value={phaseProgress.progressPercent} className="h-2" />
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Stats by Category */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Répartition par difficulté</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Phases terminées</span>
                  <span className="font-medium">{progress.completedPhases}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Phases en cours</span>
                  <span className="font-medium">{progress.inProgressPhases}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Phases disponibles</span>
                  <span className="font-medium">{progress.availablePhases}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Phases verrouillées</span>
                  <span className="font-medium">{progress.totalPhases - progress.completedPhases - progress.inProgressPhases - progress.availablePhases}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Badges par catégorie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2">
                {['debut', 'streak', 'phase', 'project', 'achievement', 'capstone', 'daily', 'meta', 'level'].map(category => {
                  const categoryBadges = badges.filter(b => b.category === category)
                  const unlockedInCategory = userBadges.filter(b => b.category === category && b.unlocked).length
                  return (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-sm capitalize">{category}</span>
                      <span className="text-sm text-muted-foreground">
                        {unlockedInCategory} / {categoryBadges.length}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Completion Message */}
        {progress.totalProgressPercent === 100 && (
          <Card className="border-2 border-green-500 bg-green-500/5">
            <CardHeader className="text-center">
              <CardTitle className="text-green-500">
                Félicitations ! 🎉
              </CardTitle>
              <CardDescription className="text-center">
                Vous avez terminé la roadmap complète !
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Vous avez maîtrisé tous les concepts pour devenir Ingénieur IA.
                Continuez à apprendre et à vous améliorer !
              </p>
              <Button asChild>
                <Link href="/roadmap/capstone">
                  Voir le Capstone
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
