// ============================================
// PHASE DIFFICULTY
// ============================================

export type PhaseDifficulty = 'beginner' | 'intermediate' | 'advanced'

// ============================================
// PROJECT DIFFICULTY
// ============================================

export type ProjectDifficulty = 'easy' | 'medium' | 'hard'

// ============================================
// TASK STATUS
// ============================================

export type TaskStatus = 'not_started' | 'in_progress' | 'completed'

// ============================================
// PHASE STATUS
// ============================================

export type PhaseStatus = 'locked' | 'available' | 'in_progress' | 'completed'

// ============================================
// PROJECT STATUS
// ============================================

export type ProjectStatus = 'not_started' | 'in_progress' | 'completed'

// ============================================
// BADGE STATUS
// ============================================

export type BadgeStatus = 'locked' | 'unlocked'

// ============================================
// PROFILE LEVEL
// ============================================

export type ProfileLevel = 'beginner' | 'intermediate' | 'advanced'

// ============================================
// ACTIVITY LOG TYPE
// ============================================

export type ActivityLogType = 
  | 'task_completed'
  | 'module_completed'
  | 'phase_completed'
  | 'project_completed'
  | 'daily_goal'
  | 'streak'

// ============================================
// MODULE STRUCTURE
// ============================================

export interface Module {
  id: string
  title: string
  description?: string
}

// ============================================
// TASK STRUCTURE
// ============================================

export interface Task {
  id: string
  title: string
  description?: string
  xp: number
}

// ============================================
// PROJECT STRUCTURE
// ============================================

export interface Project {
  id: string
  title: string
  description: string
  difficulty: ProjectDifficulty
  objective: string
  suggestedStack: string[]
  deliverables: string[]
  validationCriteria: string[]
  xp: number
}

// ============================================
// PHASE STRUCTURE
// ============================================

export interface Phase {
  id: string
  title: string
  phaseNumber: number
  objective: string
  description: string
  difficulty: PhaseDifficulty
  estimatedTime: string
  modules: Module[]
  tasks: Task[]
  projects: Record<ProjectDifficulty, Project>
  category: string
}

// ============================================
// ROADMAP STRUCTURE
// ============================================

export interface Roadmap {
  id: string
  title: string
  description: string
  totalPhases: number
  totalTasks: number
  totalProjects: number
  phases: Phase[]
  capstone: Phase
}

// ============================================
// BADGE STRUCTURE
// ============================================

export interface Badge {
  id: string
  title: string
  description: string
  icon: string
  category: string
  requirement: string
  requirementValue: number | string
  xp: number
}

// ============================================
// USER PROGRESS STRUCTURE
// ============================================

export interface UserProgressData {
  userId: string
  xp: number
  level: number
  currentStreak: number
  bestStreak: number
  lastActiveDate: Date | null
  dailyGoal: number
  profileLevel: ProfileLevel
}

// ============================================
// PHASE PROGRESS STRUCTURE
// ============================================

export interface PhaseProgressData {
  userId: string
  phaseId: string
  status: PhaseStatus
  progressPercent: number
  completedAt: Date | null
}

// ============================================
// TASK PROGRESS STRUCTURE
// ============================================

export interface TaskProgressData {
  userId: string
  taskId: string
  completed: boolean
  completedAt: Date | null
  xpAwarded: number
}

// ============================================
// PROJECT PROGRESS STRUCTURE
// ============================================

export interface ProjectProgressData {
  userId: string
  projectId: string
  status: ProjectStatus
  startedAt: Date | null
  completedAt: Date | null
  xpAwarded: number
}
