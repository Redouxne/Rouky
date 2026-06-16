'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Settings,
  User,
  Bell,
  Target,
  Sun,
  Moon,
  Trash2,
  Download,
  Upload,
  AlertTriangle
} from 'lucide-react'
import { formatNumber, formatDate } from '@/lib/utils'

type ProfileLevel = 'beginner' | 'intermediate' | 'advanced'

const profileLevels = [
  { value: 'beginner' as ProfileLevel, label: 'Débutant' },
  { value: 'intermediate' as ProfileLevel, label: 'Intermédiaire' },
  { value: 'advanced' as ProfileLevel, label: 'Avancé' },
]

const dailyGoals = [1, 3, 5]

export default function SettingsPage() {
  const [userStats, setUserStats] = useState<{
    xp: number
    level: number
    currentStreak: number
    bestStreak: number
    dailyGoal: number
    profileLevel: ProfileLevel
    createdAt: string
  } | null>({
    xp: 0,
    level: 1,
    currentStreak: 0,
    bestStreak: 0,
    dailyGoal: 3,
    profileLevel: 'beginner',
    createdAt: new Date().toISOString(),
  })
  
  const [settings, setSettings] = useState({
    dailyGoal: 3,
    profileLevel: 'beginner' as ProfileLevel,
  })
  
  const [isResetting, setIsResetting] = useState(false)
  const [showConfirmReset, setShowConfirmReset] = useState(false)

  const handleSaveSettings = async () => {
    setUserStats({
      ...userStats!,
      dailyGoal: settings.dailyGoal,
      profileLevel: settings.profileLevel,
    })
    alert('Paramètres sauvegardés localement.')
  }

  const handleResetProgress = async () => {
    if (!showConfirmReset) {
      setShowConfirmReset(true)
      return
    }

    setIsResetting(true)
    setShowConfirmReset(false)
    setIsResetting(false)
    alert('La réinitialisation sera réactivée quand la base sera configurée.')
  }

  const handleCancelReset = () => {
    setShowConfirmReset(false)
  }

  const handleExportProgress = async () => {
    try {
      const data = {
        userProgress: userStats,
        taskProgresses: [],
        projectProgresses: [],
        phaseProgresses: [],
        badgeProgresses: [],
        exportedAt: new Date(),
      }
      
      // Download as JSON
      const json = JSON.stringify(data, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `rouky-progress-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      alert('Progression exportée avec succès !')
    } catch (error) {
      console.error('Failed to export progress:', error)
      alert('Échec de l\'exportation')
    }
  }

  if (!userStats) {
    return (
      <div className="container mx-auto max-w-4xl py-12">
        <p className="text-center text-muted-foreground">Chargement...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Paramètres</h1>
            <p className="text-muted-foreground">
              Personnalisez votre expérience d'apprentissage
            </p>
          </div>
        </div>

        {/* Account Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Compte
            </CardTitle>
            <CardDescription>
              Informations sur votre compte utilisateur
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom d'utilisateur</label>
              <p className="text-sm text-muted-foreground">Utilisateur</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <p className="text-sm text-muted-foreground">default@example.com</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date de création</label>
              <p className="text-sm text-muted-foreground">
                {formatDate(userStats.createdAt ? new Date(userStats.createdAt) : null)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Paramètres du profil
            </CardTitle>
            <CardDescription>
              Personnalisez votre expérience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Objectif quotidien</label>
              <p className="text-sm text-muted-foreground">
                Nombre de tâches à compléter chaque jour pour gagner le bonus XP
              </p>
              <div className="flex gap-2">
                {dailyGoals.map((goal) => (
                  <Button
                    key={goal}
                    variant={settings.dailyGoal === goal ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSettings({ ...settings, dailyGoal: goal })}
                  >
                    {goal} tâche{goal > 1 ? 's' : ''}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Niveau de profil</label>
              <p className="text-sm text-muted-foreground">
                Adaptez la roadmap à votre niveau actuel
              </p>
              <div className="flex gap-2">
                {profileLevels.map((level) => (
                  <Button
                    key={level.value}
                    variant={settings.profileLevel === level.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSettings({ ...settings, profileLevel: level.value })}
                  >
                    {level.label}
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleSaveSettings} 
              className="w-full"
            >
              Sauvegarder les paramètres
            </Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Apparence
            </CardTitle>
            <CardDescription>
              Choisissez le thème de l'application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Thème</label>
              <p className="text-sm text-muted-foreground">
                Le thème sombre est actuellement activé
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Sun className="h-4 w-4" />
                  Clair
                </Button>
                <Button size="sm" className="gap-1">
                  <Moon className="h-4 w-4" />
                  Sombre
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Gestion des données
            </CardTitle>
            <CardDescription>
              Exportez, importez ou réinitialisez votre progression
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleExportProgress}
                className="flex-1 gap-1"
              >
                <Download className="h-4 w-4" />
                Exporter la progression
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 gap-1"
                disabled
              >
                <Upload className="h-4 w-4" />
                Importer (bientôt)
              </Button>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium">Réinitialiser la progression</h3>
                  <p className="text-sm text-muted-foreground">
                    Cette action est irréversible. Toutes vos données de progression seront supprimées.
                  </p>
                </div>
              </div>

              {showConfirmReset ? (
                <div className="mt-4 p-3 bg-destructive/5 border border-destructive/20 rounded-lg space-y-3">
                  <p className="text-sm text-destructive">
                    Êtes-vous sûr de vouloir réinitialiser toute votre progression ?
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleCancelReset}
                    >
                      Annuler
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={handleResetProgress}
                      disabled={isResetting}
                    >
                      {isResetting ? 'Réinitialisation...' : 'Confirmer'}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  variant="destructive" 
                  onClick={handleResetProgress}
                  className="mt-4 w-full gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  Réinitialiser la progression
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Résumé de votre progression</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{formatNumber(userStats.xp)}</div>
              <div className="text-sm text-muted-foreground">XP Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{userStats.level}</div>
              <div className="text-sm text-muted-foreground">Niveau</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{userStats.currentStreak}</div>
              <div className="text-sm text-muted-foreground">Streak actuel</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{userStats.bestStreak}</div>
              <div className="text-sm text-muted-foreground">Meilleur streak</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Helper component for database icon
const Database = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
  </svg>
)
