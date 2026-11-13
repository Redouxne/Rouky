'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { useProgress } from '@/components/ProgressProvider'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user } = useProgress()

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

        <Link href="/account" className="rounded-full bg-muted/50 px-3 py-1.5 text-sm">{user ? user.name : 'Connexion'}</Link>
      </div>
    </header>
  )
}
