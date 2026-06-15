'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutDashboard, Roadmap, CheckSquare, Trophy, Settings, FileText, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  onClose: () => void
}

const navItems = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Roadmap', href: '/roadmap', icon: Roadmap },
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
    <div className="flex h-full flex-col bg-card">
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <Link href="/" className="flex items-center gap-2" onClick={onClose}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
            R
          </div>
          <span className="font-semibold text-lg">Rouky</span>
        </Link>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-muted lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 py-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors',
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                'rounded-lg mx-2'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      <div className="border-t border-border py-4">
        <div className="space-y-1">
          {bottomNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                'rounded-lg mx-2'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
