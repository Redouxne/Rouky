'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutDashboard, Map, CheckSquare, Trophy, Settings, FileText, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Brand } from './Brand'

interface SidebarProps {
  onClose: () => void
}

const navItems = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Roadmap', href: '/roadmap', icon: Map },
  { name: 'Projets', href: '/projects', icon: CheckSquare },
  { name: 'Progression', href: '/progress', icon: FileText },
  { name: 'Badges', href: '/badges', icon: Trophy },
  { name: 'Paramètres', href: '/settings', icon: Settings },
]

const bottomNavItems = [
  { name: 'Crédits', href: '/credits', icon: FileText },
]

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-[88px] items-center justify-between border-b border-border px-6">
        <Brand onClick={onClose} />
        <button
          onClick={onClose}
          className="rounded-md p-1 hover:bg-muted lg:hidden"
          aria-label="Fermer le menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav aria-label="Navigation principale" className="flex-1 px-3 py-7">
        <p className="px-4 pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Le parcours</p>
        <div className="space-y-1.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'mx-1 flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-colors',
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? 'bg-card text-primary shadow-[0_4px_12px_rgba(44,41,36,0.06)]'
                  : 'text-muted-foreground hover:bg-card/60 hover:text-foreground'
              )}
            >
              <item.icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      <div className="mx-5 mb-5 rounded-xl border border-border bg-card/70 p-4">
        <p className="font-display text-xl font-semibold leading-tight">Un pas après l’autre.</p>
        <p className="mt-1 text-xs text-muted-foreground">Apprendre, construire, documenter.</p>
      </div>
      <div className="border-t border-border px-3 py-3">
        <div className="space-y-1">
          {bottomNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'mx-1 flex items-center gap-3 rounded-xl px-4 py-2 text-xs font-medium transition-colors',
                pathname === item.href
                  ? 'bg-card text-primary'
                  : 'text-muted-foreground hover:bg-card/60 hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
