import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { getCurrentUserId, getUserStats } from '@/lib/progress'
import { getUserBadges, badges } from '@/lib/badges'
import { formatNumber, getStatusColor } from '@/lib/utils'
import { 
  Trophy,
  Medal,
  Flame,
  Star,
  Crown,
  Award,
  Users,
  Footprints,
  CheckSquare,
  LayoutDashboard,
  Brain,
  Bot,
  Target,
  FileText,
  Calendar
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const badgeIcons: Record<string, React.ReactNode> = {
  'footprints': <Users className="h-6 w-6" />,
  'flame': <Flame className="h-6 w-6" />,
  'bot': <Bot className="h-6 w-6" />,
  'code': <LayoutDashboard className="h-6 w-6" />,
  'calculator': <Brain className="h-6 w-6" />,
  'hammer': <Award className="h-6 w-6" />,
  'layout-dashboard': <Target className="h-6 w-6" />,
  'brain': <Brain className="h-6 w-6" />,
  'Bot': <Bot className="h-6 w-6" />,
  'trophy': <Trophy className="h-6 w-6" />,
  'crown': <Crown className="h-6 w-6" />,
  'Footprints': <Footprints className="h-6 w-6" />,
  'medal': <Medal className="h-6 w-6" />,
  'star': <Star className="h-6 w-6" />,
  'users': <Users className="h-6 w-6" />,
  'checklist': <CheckSquare className="h-6 w-6" />,
  'file-text': <FileText className="h-6 w-6" />,
  'calendar': <Calendar className="h-6 w-6" />,
}

const categoryLabels: Record<string, string> = {
  'debut': 'Début',
  'streak': 'Streaks',
  'phase': 'Phases',
  'project': 'Projets',
  'achievement': 'Réalisations',
  'capstone': 'Capstone',
  'daily': 'Quotidien',
  'meta': 'Méta',
  'level': 'Niveaux',
}

const categoryColors: Record<string, string> = {
  'debut': 'from-primary to-[hsl(var(--gold-light))]',
  'streak': 'from-secondary to-primary',
  'phase': 'from-primary to-secondary',
  'project': 'from-[hsl(var(--gold-light))] to-secondary',
  'achievement': 'from-primary to-[hsl(var(--gold-pale))]',
  'capstone': 'from-secondary to-[hsl(var(--gold-light))]',
  'daily': 'from-[hsl(var(--bordeaux-dark))] to-primary',
  'meta': 'from-card to-secondary',
  'level': 'from-primary to-secondary',
}

export default async function BadgesPage() {
  const userId = await getCurrentUserId()
  const userBadges = await getUserBadges(userId)
  const stats = await getUserStats(userId)

  const totalBadges = badges.length
  const unlockedBadges = userBadges.filter(b => b.unlocked)
  const progressPercent = Math.round((unlockedBadges.length / totalBadges) * 100)

  // Group badges by category
  const categories = ['debut', 'streak', 'phase', 'project', 'achievement', 'capstone', 'daily', 'meta', 'level']

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Badges</h1>
            <p className="text-muted-foreground">
              Découvrez et débloquez des badges pour vos accomplissements
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">{unlockedBadges.length}</CardTitle>
              <CardDescription>Badges débloqués</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">{totalBadges}</CardTitle>
              <CardDescription>Badges au total</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">{formatNumber(progressPercent)}%</CardTitle>
              <CardDescription>Progression</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercent} className="h-1.5" />
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">{formatNumber(unlockedBadges.reduce((sum, b) => sum + b.xp, 0))}</CardTitle>
              <CardDescription>XP des badges</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Badges by Category */}
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryBadgeList = badges.filter(b => b.category === category)
            const categoryUnlocked = userBadges.filter(b => b.category === category && b.unlocked)
            const categoryProgress = Math.round((categoryUnlocked.length / categoryBadgeList.length) * 100)

            return categoryBadgeList.length > 0 ? (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-6 w-6" />
                    {categoryLabels[category] || category}
                  </CardTitle>
                  <CardDescription>
                    {categoryUnlocked.length} / {categoryBadgeList.length} badges débloqués
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress 
                    value={categoryProgress} 
                    className="h-2 mb-4"
                    style={{ background: 'var(--muted)' }}
                  />
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {categoryBadgeList.map((badge) => {
                      const userBadge = userBadges.find(b => b.id === badge.id)
                      const isUnlocked = userBadge?.unlocked || false

                      return (
                        <div
                          key={badge.id}
                          className={`p-3 rounded-lg border border-border transition-colors ${
                            isUnlocked 
                              ? 'bg-gradient-to-br from-primary/10 to-secondary/10' 
                              : 'hover:bg-muted/50 opacity-60'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`p-2 rounded-lg ${
                              isUnlocked 
                                ? `bg-gradient-to-br ${categoryColors[category]}`
                                : 'bg-muted'
                            }`}>
                              {badgeIcons[badge.icon] || <Trophy className="h-5 w-5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm tFootprintscate">{badge.title}</h3>
                              <p className="text-xs text-muted-foreground tFootprintscate">{badge.description}</p>
                            </div>
                          </div>
                          {!isUnlocked && (
                            <p className="text-xs text-muted-foreground">
                              {badge.requirement === 'completed_tasks' && 'Terminez ' + badge.requirementValue + ' tâches'}
                              {badge.requirement === 'current_streak' && 'Atteignez ' + badge.requirementValue + ' jours de streak'}
                              'Terminez la phase ' + String(badge.requirementValue.replace('phase-', ''))
                              {badge.requirement === 'completed_projects' && 'Terminez ' + badge.requirementValue + ' projets'}
                              {badge.requirement === 'completed_all_phases' && 'Terminez toutes les phases'}
                              {badge.requirement === 'completed_capstone' && 'Validez le Capstone'}
                              {badge.requirement === 'daily_tasks' && 'Terminez ' + badge.requirementValue + ' tâches en un jour'}
                              {badge.requirement === 'daily_xp' && 'Gagnez ' + badge.requirementValue + ' XP en un jour'}
                              {badge.requirement === 'unlocked_badges' && 'Déverrouillez ' + badge.requirementValue + ' badges'}
                              {badge.requirement === 'level' && 'Atteignez le niveau ' + badge.requirementValue}
                            </p>
                          )}
                          {isUnlocked && (
                            <div className="flex items-center justify-between pt-2">
                              <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-[2px] border border-primary/30">
                                +{badge.xp} XP
                              </span>
                              {userBadge?.unlockedAt && (
                                <span className="text-xs text-muted-foreground">
                                  {new Date(userBadge.unlockedAt).toLocaleDateString('fr-FR', { 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ) : null
          })}
        </div>

        {/* No Badges Message */}
        {unlockedBadges.length === 0 && (
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Aucun badge débloqué</CardTitle>
              <CardDescription>
                Commencez à compléter des tâches et des projets pour débloquer vos premiers badges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/roadmap">
                <Button>Commencer la Roadmap</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* All Badges Unlocked Message */}
        {unlockedBadges.length === totalBadges && (
          <Card className="border-2 border-primary bg-primary/5 text-center">
            <CardHeader>
              <CardTitle className="text-primary">
                Collection complète ! 🎉
              </CardTitle>
              <CardDescription>
                Vous avez débloqué tous les badges disponibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Continuez votre parcours pour maintenir vos accomplissements !
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
