'use client'
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { createEmptyLocalProgress, readLocalProgress, saveLocalProgress, type LocalProgressState } from '@/lib/local-progress'
import { applyAction, type ProgressAction } from '@/lib/progress-rules'

type Context = { progress: LocalProgressState; loading: boolean; error: string; refresh: () => void; act: (action: ProgressAction) => boolean }
const ProgressContext = createContext<Context | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<LocalProgressState>(createEmptyLocalProgress)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(() => {
    try { setProgress(readLocalProgress()); setError('') }
    catch { setError('Progression indisponible') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => {
    refresh()
    window.addEventListener('storage', refresh)
    return () => window.removeEventListener('storage', refresh)
  }, [refresh])

  const act = (action: ProgressAction) => {
    try {
      const next = applyAction(readLocalProgress(), action)
      saveLocalProgress(next)
      setProgress(next)
      setError('')
      return true
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Enregistrement impossible')
      return false
    }
  }

  return <ProgressContext.Provider value={{ progress, loading, error, refresh, act }}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('ProgressProvider requis')
  return context
}
