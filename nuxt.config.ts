import tailwindcss from '@tailwindcss/vite'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({

  css: [
    '~/assets/css/main.css',
  ],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  compatibilityDate: '2024-11-01',

  devtools: {
    enabled: true,
  },
})
