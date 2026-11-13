import 'server-only'
import { createHmac, scryptSync, timingSafeEqual, randomBytes } from 'node:crypto'
import { cookies } from 'next/headers'
import { prisma } from './prisma'
import { normalizeLocalProgress, type LocalProgressState } from './local-progress'
import { applyAction, type ProgressAction } from './progress-rules'

const cookieName = 'rouky_session'
const secret = () => {
  if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 32) throw new Error('AUTH_SECRET manquant ou trop court')
  return process.env.AUTH_SECRET
}
const sign = (id: string) => createHmac('sha256', secret()).update(id).digest('hex')
export function passwordHash(password: string, salt = randomBytes(16).toString('hex')) {
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`
}
export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const actual = Buffer.from(hash, 'hex')
  const calculated = scryptSync(password, salt, 64)
  return actual.length === calculated.length && timingSafeEqual(actual, calculated)
}
export function setSession(id: string) {
  cookies().set(cookieName, `${id}.${sign(id)}`, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 })
}
export function clearSession() { cookies().delete(cookieName) }
export async function currentUser() {
  const value = cookies().get(cookieName)?.value || ''
  const [id, signature] = value.split('.')
  if (!id || !/^[a-f0-9]{64}$/.test(signature)) return null
  const expected = Buffer.from(sign(id), 'hex')
  if (!timingSafeEqual(Buffer.from(signature, 'hex'), expected)) return null
  return prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true } })
}
export async function readProgress(userId: string): Promise<LocalProgressState> {
  const row = await prisma.progressSnapshot.findUnique({ where: { userId } })
  return normalizeLocalProgress(row?.data)
}
export async function writeProgress(userId: string, state: LocalProgressState) {
  await prisma.progressSnapshot.upsert({ where: { userId }, create: { userId, data: state as any }, update: { data: state as any } })
}
export async function updateProgress(userId: string, action: ProgressAction) {
  return prisma.$transaction(async tx => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${userId}))`
    const row = await tx.progressSnapshot.findUnique({ where: { userId } })
    const next = applyAction(normalizeLocalProgress(row?.data), action)
    await tx.progressSnapshot.upsert({ where: { userId }, create: { userId, data: next as any }, update: { data: next as any } })
    return next
  })
}
export { applyAction } from './progress-rules'
export type { ProgressAction } from './progress-rules'
