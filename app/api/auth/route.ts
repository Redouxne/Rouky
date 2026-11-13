import { NextRequest, NextResponse } from 'next/server'
import { clearSession, currentUser, passwordHash, setSession, verifyPassword } from '@/lib/server-progress'
import { prisma } from '@/lib/prisma'
export const runtime = 'nodejs'
export async function GET() {
  try { return NextResponse.json({ user: await currentUser() }) }
  catch { return NextResponse.json({ error: 'Service indisponible' }, { status: 503 }) }
}
export async function POST(request: NextRequest) {
  try {
    if (request.headers.get('origin') && new URL(request.headers.get('origin')!).host !== request.nextUrl.host) return NextResponse.json({ error: 'Origine refusée' }, { status: 403 })
    const body = await request.json()
    if (body.action === 'logout') { clearSession(); return NextResponse.json({ user: null }) }
    const email = String(body.email || '').trim().toLowerCase()
    const password = String(body.password || '')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 10 || password.length > 128) return NextResponse.json({ error: 'Email ou mot de passe invalide (10 caractères minimum)' }, { status: 400 })
    let user
    if (body.action === 'register') {
      const name = String(body.name || '').trim().slice(0, 80)
      if (!name) return NextResponse.json({ error: 'Nom requis' }, { status: 400 })
      user = await prisma.user.create({ data: { email, name, passwordHash: passwordHash(password) } }).catch((error: { code?: string }) => { if (error.code === 'P2002') return null; throw error })
      if (!user) return NextResponse.json({ error: 'Compte déjà existant' }, { status: 409 })
    } else if (body.action === 'login') {
      user = await prisma.user.findUnique({ where: { email } })
      if (!user?.passwordHash || !verifyPassword(password, user.passwordHash)) return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })
    } else return NextResponse.json({ error: 'Action invalide' }, { status: 400 })
    setSession(user.id)
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } })
  } catch { return NextResponse.json({ error: 'Service indisponible' }, { status: 503 }) }
}
