'use client'

import { Menu } from 'lucide-react'
import { Brand } from './Brand'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 h-[72px] border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between gap-4 px-5 md:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-lg border border-border bg-card p-2 hover:bg-muted lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="lg:hidden"><Brand /></div>
          <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground lg:block">Votre atelier d’ingénierie IA</span>
        </div>
      </div>
    </header>
  )
}
