'use client'
import { useRef, useState } from 'react'
import { useProgress } from '@/components/ProgressProvider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  const { progress, act } = useProgress()
  const input = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState('')

  function exportData() {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'rouky-progression.json'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 0)
  }

  async function importData(file?: File) {
    if (!file) return
    try {
      const data = JSON.parse(await file.text())
      setMessage(act({ type: 'import', data }) ? 'Progression importée. Les projets doivent être autoévalués à nouveau.' : 'Import impossible.')
    } catch { setMessage('Fichier JSON invalide.') }
    if (input.current) input.current.value = ''
  }

  function reset() {
    if (!window.confirm('Effacer définitivement toute votre progression ?')) return
    if (act({ type: 'reset' })) setMessage('Progression réinitialisée.')
  }

  return <div className="mx-auto max-w-5xl space-y-7 pb-12"><div><p className="eyebrow">Votre espace</p><h1 className="page-title mt-3">Paramètres<span className="text-primary">.</span></h1><p className="mt-3 text-muted-foreground">Gardez la main sur votre progression.</p></div><Card><CardHeader><p className="eyebrow">Sauvegarde</p><CardTitle>Vos données</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-sm text-muted-foreground">Votre progression est enregistrée dans ce navigateur. Exportez-la pour conserver une copie ou la transférer sur un autre appareil.</p><div className="flex flex-wrap gap-2"><Button onClick={exportData}>Exporter</Button><Button variant="outline" onClick={() => input.current?.click()}>Importer</Button><input ref={input} type="file" accept="application/json" className="hidden" onChange={event => void importData(event.target.files?.[0])} /><Button variant="destructive" onClick={reset}>Réinitialiser</Button></div>{message && <p role="status" className="text-sm">{message}</p>}</CardContent></Card></div>
}
