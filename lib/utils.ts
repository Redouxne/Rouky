import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-FR').format(num)
}

export function formatDate(date: Date | null): string {
  if (!date) return 'Jamais'
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatShortDate(date: Date | null): string {
  if (!date) return '—'
  return new Intl.DateTimeFormat('fr-FR', {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function formatRelativeDate(date: Date | null): string {
  if (!date) return 'Jamais'
  const now = new Date()
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) return 'Aujourd\'hui'
  if (diffInDays === 1) return 'Hier'
  if (diffInDays < 7) return `Il y a ${diffInDays} jours`
  if (diffInDays < 30) return `Il y a ${Math.floor(diffInDays / 7)} semaines`
  return formatDate(date)
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'beginner':
      return 'text-[hsl(var(--gold-light))]'
    case 'intermediate':
      return 'text-primary'
    case 'advanced':
      return 'text-accent'
    default:
      return 'text-muted-foreground'
  }
}

export function getDifficultyLabel(difficulty: string): string {
  switch (difficulty) {
    case 'beginner':
      return 'Débutant'
    case 'intermediate':
      return 'Intermédiaire'
    case 'advanced':
      return 'Avancé'
    default:
      return difficulty
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-primary/15 text-[hsl(var(--gold-light))] border border-primary/35'
    case 'in_progress':
      return 'bg-secondary/35 text-foreground border border-secondary/50'
    case 'available':
      return 'bg-card text-muted-foreground border border-border'
    case 'locked':
    default:
      return 'bg-muted text-muted-foreground border border-border'
  }
}

export function getProjectDifficultyXP(difficulty: string): number {
  switch (difficulty) {
    case 'easy':
      return 75
    case 'medium':
      return 150
    case 'hard':
      return 300
    default:
      return 75
  }
}

// Capitalize first letter
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
