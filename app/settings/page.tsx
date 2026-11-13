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
  return <div className="mx-auto max-w-4xl space-y-6"><h1 className="text-3xl font-bold">Paramètres</h1><Card><CardHeader><CardTitle>Compte</CardTitle></CardHeader><CardContent>{user ? <p>{user.name} · {user.email} · <Link className="underline" href="/account">Gérer la connexion</Link></p> : <Link className="underline" href="/account">Se connecter</Link>}</CardContent></Card><Card><CardHeader><CardTitle>Vos données</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-sm text-muted-foreground">Votre progression est enregistrée sur le serveur et liée à votre compte. L’export contient tâches, projets et phases.</p><div className="flex flex-wrap gap-2"><Button disabled={!user} onClick={exportData}>Exporter</Button><Button disabled={!user} variant="outline" onClick={()=>input.current?.click()}>Importer</Button><input ref={input} type="file" accept="application/json" className="hidden" onChange={e=>void importData(e.target.files?.[0])}/><Button disabled={!user} variant="destructive" onClick={()=>void reset()}>Réinitialiser</Button></div>{message&&<p role="status" className="text-sm">{message}</p>}</CardContent></Card></div>
}
