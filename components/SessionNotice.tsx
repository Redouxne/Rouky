'use client'
import Link from 'next/link'
import { useProgress } from './ProgressProvider'
export function SessionNotice() {
  const { user, loading, error } = useProgress()
  if (loading) return <p role="status" className="mb-5 rounded-xl border border-border bg-card/70 p-3 text-xs text-muted-foreground">Chargement de votre progression…</p>
  return <>
    {error && <p role="alert" className="mb-5 rounded-xl border border-destructive bg-card p-3 text-xs text-destructive">{error}</p>}
    {!user && <p className="mb-5 rounded-xl border border-border bg-card/70 p-3 text-xs text-muted-foreground">Connectez-vous pour enregistrer votre progression. <Link className="font-semibold text-primary underline" href="/account">Créer un compte ou se connecter</Link></p>}
  </>
}
