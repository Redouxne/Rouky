'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { useProgress } from '@/components/ProgressProvider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
export default function SettingsPage() {
  const { user, progress, act } = useProgress()
  const input = useRef<HTMLInputElement>(null)
  const [message,setMessage] = useState('')
  function exportData() { const blob = new Blob([JSON.stringify(progress,null,2)], {type:'application/json'}); const link=document.createElement('a'); link.href=URL.createObjectURL(blob); link.download='rouky-progression.json'; link.click(); URL.revokeObjectURL(link.href) }
  async function importData(file?: File) { if(!file)return; try { const data=JSON.parse(await file.text()); if(await act({type:'import',data}))setMessage('Progression importée. Les projets doivent être autoévalués à nouveau.'); else setMessage('Import impossible.') } catch {setMessage('Fichier JSON invalide.')} }
  async function reset() { if(!window.confirm('Effacer définitivement toute votre progression ?'))return; if(await act({type:'reset'}))setMessage('Progression réinitialisée.') }
  return <div className="mx-auto max-w-5xl space-y-7 pb-12"><div><p className="eyebrow">Votre espace</p><h1 className="page-title mt-3">Paramètres<span className="text-primary">.</span></h1><p className="mt-3 text-muted-foreground">Gardez la main sur votre compte et votre progression.</p></div><div className="grid gap-5 md:grid-cols-2"><Card><CardHeader><p className="eyebrow">Profil</p><CardTitle>Votre compte</CardTitle></CardHeader><CardContent>{user ? <div className="space-y-2"><p className="font-semibold">{user.name}</p><p className="text-xs text-muted-foreground">{user.email}</p><Link className="inline-block pt-3 text-xs font-semibold text-primary underline" href="/account">Gérer la connexion</Link></div> : <Link className="text-sm font-semibold text-primary underline" href="/account">Se connecter</Link>}</CardContent></Card><Card><CardHeader><p className="eyebrow">Sauvegarde</p><CardTitle>Vos données</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-sm text-muted-foreground">Votre progression est enregistrée sur le serveur et liée à votre compte. L’export contient tâches, projets et phases.</p><div className="flex flex-wrap gap-2"><Button disabled={!user} onClick={exportData}>Exporter</Button><Button disabled={!user} variant="outline" onClick={()=>input.current?.click()}>Importer</Button><input ref={input} type="file" accept="application/json" className="hidden" onChange={e=>void importData(e.target.files?.[0])}/><Button disabled={!user} variant="destructive" onClick={()=>void reset()}>Réinitialiser</Button></div>{message&&<p role="status" className="text-sm">{message}</p>}</CardContent></Card></div></div>
}
