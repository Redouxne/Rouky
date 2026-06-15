'use client'

import Link from 'next/link'
import { Menu, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { getCurrentUserId, getUserStats } from '@/lib/progress'
import { formatNumber } from '@/lib/utils'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [userStats, setUserStats] = useState<{
    xp: number
    level: number
  } | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userId = await getCurrentUserId()
        const stats = await getUserStats(userId)
        if (stats?.progress) {
          setUserStats({
            xp: stats.progress.xp,
            level: stats.progress.level,
          })
        }
      } catch (error) {
        console.error('Failed to fetch user stats:', error)
      }
    }
    fetchStats()
  }, [])

  return (
    <header className="sticky top-0 z-10 h-16 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md hover:bg-muted lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <Link href="/" className="hidden lg:flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              R
            </div>
            <span className="font-semibold text-lg">Rouky</span>
          </Link>
        </div>

        {/* User stats */}
        {userStats && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full">
              <span className="text-sm font-medium">Niveau {userStats.level}</span>
              <span className="text-xs text-muted-foreground">
                {formatNumber(userStats.xp)} XP
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
