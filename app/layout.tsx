import type { Metadata } from 'next'
import './globals.css'
import AppShell from '@/components/layout/AppShell'

export const metadata: Metadata = {
  title: 'Rouky - Deviens Ingénieur IA étape par étape',
  description: 'Roadmap interactive et gamifiée pour devenir AI Engineer en 2026',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  )
}
