'use client'
import Link from 'next/link'
import { useProgress } from './ProgressProvider'
export function SessionNotice() {
  const { user, loading, error } = useProgress()
  if (loading) return <p role="status" className="mb-4 rounded border border-border p-3 text-sm">Chargement de votre progression…</p>
  return <>
    {error && <p role="alert" className="mb-4 rounded border border-destructive p-3 text-sm text-destructive">{error}</p>}
    {!user && <p className="mb-4 rounded border border-primary/40 p-3 text-sm">Connectez-vous pour enregistrer votre progression. <Link className="underline" href="/account">Créer un compte ou se connecter</Link></p>}
  </>
}
