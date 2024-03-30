import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  vite: {
    optimizeDeps: {
      exclude: ['oslo']
    }
  },
  redirects: {
    '/ranking': '/eurovision/2024/ranking',
    '/sorter': '/eurovision/2024/sorter',
    '/leaderboard': '/eurovision/2024/leaderboard'
  }
})
//
