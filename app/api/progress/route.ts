import { NextRequest, NextResponse } from 'next/server'
import { currentUser, readProgress, updateProgress, type ProgressAction } from '@/lib/server-progress'
export const runtime = 'nodejs'
export async function GET() {
  try {
    const user = await currentUser()
    if (!user) return NextResponse.json({ error: 'Connexion requise' }, { status: 401 })
    return NextResponse.json({ progress: await readProgress(user.id) })
  } catch { return NextResponse.json({ error: 'Service indisponible' }, { status: 503 }) }
}
export async function POST(request: NextRequest) {
  try {
    if (request.headers.get('origin') && new URL(request.headers.get('origin')!).host !== request.nextUrl.host) return NextResponse.json({ error: 'Origine refusée' }, { status: 403 })
    if (Number(request.headers.get('content-length') || 0) > 200_000) return NextResponse.json({ error: 'Fichier trop volumineux' }, { status: 413 })
    const user = await currentUser()
    if (!user) return NextResponse.json({ error: 'Connexion requise' }, { status: 401 })
    const action = await request.json() as ProgressAction
    if (!action || typeof action !== 'object' || typeof action.type !== 'string') return NextResponse.json({ error: 'Action invalide' }, { status: 400 })
    const next = await updateProgress(user.id, action)
    return NextResponse.json({ progress: next })
  } catch (error) {
    if (error instanceof Error && /inaccessible|validable|invalide|attestés/.test(error.message)) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ error: 'Service indisponible' }, { status: 503 })
  }
}
