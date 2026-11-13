'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProgress } from '@/components/ProgressProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
export default function AccountPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const { user, refresh } = useProgress()
  const router = useRouter()
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage('')
    try {
      const response = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: mode, name, email, password }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Connexion impossible')
      await refresh(); router.push('/roadmap')
    } catch (e) { setMessage(e instanceof Error ? e.message : 'Erreur') }
    finally { setBusy(false) }
  }
  async function logout() { await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'logout' }) }); await refresh() }
  return <div className="mx-auto max-w-md"><Card><CardHeader><CardTitle>Compte Rouky</CardTitle></CardHeader><CardContent>
    {user ? <div className="space-y-4"><p>Connecté : {user.name} ({user.email})</p><Button onClick={logout}>Se déconnecter</Button></div> : <form onSubmit={submit} className="space-y-4">
      <div className="flex gap-2"><Button type="button" variant={mode === 'login' ? 'default' : 'outline'} onClick={() => setMode('login')}>Connexion</Button><Button type="button" variant={mode === 'register' ? 'default' : 'outline'} onClick={() => setMode('register')}>Inscription</Button></div>
      {mode === 'register' && <label className="block text-sm">Nom<input required maxLength={80} className="mt-1 w-full rounded border bg-background p-2" value={name} onChange={e => setName(e.target.value)} /></label>}
      <label className="block text-sm">Email<input required type="email" className="mt-1 w-full rounded border bg-background p-2" value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label className="block text-sm">Mot de passe<input required type="password" minLength={10} className="mt-1 w-full rounded border bg-background p-2" value={password} onChange={e => setPassword(e.target.value)} /></label>
      <Button type="submit" disabled={busy}>{busy ? 'En cours…' : mode === 'register' ? 'Créer le compte' : 'Se connecter'}</Button>
      {message && <p role="alert" className="text-sm text-destructive">{message}</p>}
    </form>}
  </CardContent></Card></div>
}
