/**
 * Script pour lancer prisma generate avec l'URL corrigée
 * Transforme automatiquement postgres:// en postgresql://
 * et ajoute schema=public & sslmode=require
 */

const { execSync } = require('child_process');

const rawUrl =
  process.env.DATABASE_URL ||
  process.env.STORAGE_POSTGRES_PRISMA_URL ||
  'postgresql://user:password@localhost:5432/rouky?schema=public';

// Corrige le format de l'URL
let fixedUrl = rawUrl.replace(/^postgres:\/\//, 'postgresql://');

// Ajoute schema=public si absent
if (!fixedUrl.includes('schema=')) {
  const separator = fixedUrl.includes('?') ? '&' : '?';
  fixedUrl = fixedUrl + separator + 'schema=public';
}

// Ajoute sslmode=require pour la production (pas pour localhost)
if (!fixedUrl.includes('sslmode=') && !fixedUrl.includes('localhost')) {
  const separator = fixedUrl.includes('?') ? '&' : '?';
  fixedUrl = fixedUrl + separator + 'sslmode=require';
}

console.log('✅ Database URL prête pour Prisma generate');

// Lance prisma generate avec la bonne URL
try {
  execSync('prisma generate', {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: fixedUrl,
    },
  });
} catch (error) {
  console.error('❌ Erreur lors de prisma generate');
  process.exit(error.status || 1);
}
