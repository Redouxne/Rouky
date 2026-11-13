/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.ROUKY_BUILD_DIR ? { distDir: process.env.ROUKY_BUILD_DIR } : {}),
}

module.exports = nextConfig
