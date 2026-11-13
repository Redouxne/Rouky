'use client'
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { createEmptyLocalProgress, LOCAL_PROGRESS_KEY, normalizeLocalProgress, type LocalProgressState } from '@/lib/local-progress'
import type { ProgressAction } from '@/lib/server-progress'

type User = { id: string; name: string; email: string }
type Context = { progress: LocalProgressState; user: User | null; loading: boolean; error: string; refresh: () => Promise<void>; act: (action: ProgressAction) => Promise<boolean> }
const ProgressContext = createContext<Context | null>(null)
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<LocalProgressState>(createEmptyLocalProgress)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const auth = await fetch('/api/auth', { cache: 'no-store' })
      if (!auth.ok) throw new Error('Service indisponible')
      const authData = await auth.json()
      setUser(authData.user)
      if (!authData.user) { setProgress(createEmptyLocalProgress()); return }
      const marker = `rouky-imported-${authData.user.id}`
      const legacy = window.localStorage.getItem(LOCAL_PROGRESS_KEY)
      if (legacy && !window.localStorage.getItem(marker)) {
        const imported = await fetch('/api/progress', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'import', data: JSON.parse(legacy) }) })
        if (!imported.ok) throw new Error('Import de la progression impossible')
        window.localStorage.setItem(marker, '1')
        window.localStorage.removeItem(LOCAL_PROGRESS_KEY)
      }
      const response = await fetch('/api/progress', { cache: 'no-store' })
      if (!response.ok) throw new Error('Progression indisponible')
      setProgress(normalizeLocalProgress((await response.json()).progress))
      setError('')
    } catch (e) { setError(e instanceof Error ? e.message : 'Erreur de chargement') }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { void refresh() }, [refresh])
  const act = async (action: ProgressAction) => {
    try {
      const response = await fetch('/api/progress', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(action) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Enregistrement impossible')
      setProgress(normalizeLocalProgress(data.progress)); setError(''); return true
    } catch (e) { setError(e instanceof Error ? e.message : 'Erreur'); return false }
  }
  return <ProgressContext.Provider value={{ progress, user, loading, error, refresh, act }}>{children}</ProgressContext.Provider>
}
export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('ProgressProvider requis')
  return context
}
