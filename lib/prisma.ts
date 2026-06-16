import { PrismaClient } from '@prisma/client'

// ============================================
// Correction automatique de l'URL de la base de données
// ============================================
// Si DATABASE_URL n'est pas définie mais que STORAGE_POSTGRES_PRISMA_URL l'est,
// on la corrige automatiquement (postgres:// -> postgresql://)
//
if (!process.env.DATABASE_URL && process.env.STORAGE_POSTGRES_PRISMA_URL) {
  let url = process.env.STORAGE_POSTGRES_PRISMA_URL;
  
  // Convert postgres:// to postgresql://
  url = url.replace(/^postgres:\/\//, 'postgresql://');
  
  // Add schema=public if not present
  if (!url.includes('schema=')) {
    const separator = url.includes('?') ? '&' : '?';
    url = url + separator + 'schema=public';
  }
  
  // Add sslmode=require for production (not for localhost)
  if (!url.includes('sslmode=') && !url.includes('localhost')) {
    const separator = url.includes('?') ? '&' : '?';
    url = url + separator + 'sslmode=require';
  }
  
  process.env.DATABASE_URL = url;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
