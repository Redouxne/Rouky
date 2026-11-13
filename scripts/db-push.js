const { loadEnvConfig } = require('@next/env')
const { spawnSync } = require('node:child_process')
loadEnvConfig(process.cwd())
if (process.env.DIRECT_DATABASE_URL) process.env.DATABASE_URL = process.env.DIRECT_DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error('DIRECT_DATABASE_URL ou DATABASE_URL est requis pour mettre à jour la base.')
  process.exit(1)
}
const result = spawnSync('prisma', ['db', 'push'], { stdio: 'inherit', env: process.env, shell: process.platform === 'win32' })
process.exit(result.status ?? 1)
