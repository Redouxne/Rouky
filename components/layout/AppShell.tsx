'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import Header from './Header'
import { cn } from '@/lib/utils'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false)
    }
  }, [pathname])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div
          className={cn(
            'fixed left-0 top-0 z-40 h-full w-[260px] border-r border-border bg-[#f2eee5] transform transition-transform duration-300 ease-in-out',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
            'lg:translate-x-0 lg:static lg:z-auto'
          )}
        >
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-[#2c2924]/45 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main content */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

          {/* Page content */}
          <main className="px-5 py-8 md:px-8 lg:px-12 lg:py-10">{children}</main>
        </div>
      </div>
    </div>
  )
}
