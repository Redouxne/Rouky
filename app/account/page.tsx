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
  return <div className="mx-auto grid max-w-5xl gap-6 pb-12 lg:grid-cols-[0.9fr_1.1fr]"><div className="sketch-panel flex flex-col justify-between bg-[#eee5d5] p-8 md:p-10"><div><p className="eyebrow">Votre carnet</p><h1 className="mt-5 text-5xl font-semibold">Un parcours qui vous appartient<span className="text-primary">.</span></h1><p className="mt-5 text-sm leading-7 text-muted-foreground">Retrouvez vos étapes, exercices et projets après chaque visite. Votre progression est liée à votre compte.</p></div><p className="mt-12 border-t border-border pt-5 text-xs text-muted-foreground">Apprendre · pratiquer · documenter</p></div><Card><CardHeader><p className="eyebrow">Accès</p><CardTitle className="mt-1 text-4xl">Compte Rouky</CardTitle></CardHeader><CardContent>
    {user ? <div className="space-y-4"><p>Connecté : {user.name} ({user.email})</p><Button onClick={logout}>Se déconnecter</Button></div> : <form onSubmit={submit} className="space-y-4">
      <div className="flex gap-2"><Button type="button" variant={mode === 'login' ? 'default' : 'outline'} onClick={() => setMode('login')}>Connexion</Button><Button type="button" variant={mode === 'register' ? 'default' : 'outline'} onClick={() => setMode('register')}>Inscription</Button></div>
      {mode === 'register' && <label className="block text-sm">Nom<input required maxLength={80} className="field-input" value={name} onChange={e => setName(e.target.value)} /></label>}
      <label className="block text-sm">Email<input required type="email" className="field-input" value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label className="block text-sm">Mot de passe<input required type="password" minLength={10} className="field-input" value={password} onChange={e => setPassword(e.target.value)} /></label>
      <Button type="submit" disabled={busy}>{busy ? 'En cours…' : mode === 'register' ? 'Créer le compte' : 'Se connecter'}</Button>
      {message && <p role="alert" className="text-sm text-destructive">{message}</p>}
    </form>}
  </CardContent></Card></div>
}
