'use client'
import { useProgress } from './ProgressProvider'
export function SessionNotice() {
  const { loading, error } = useProgress()
  if (loading) return <p role="status" className="mb-5 rounded-xl border border-border bg-card/70 p-3 text-xs text-muted-foreground">Chargement de votre progression…</p>
  return error ? <p role="alert" className="mb-5 rounded-xl border border-destructive bg-card p-3 text-xs text-destructive">{error}</p> : null
}
