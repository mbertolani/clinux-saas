import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'],
  modules: [
    '@formkit/auto-animate',
    '@formkit/nuxt',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxthq/studio',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-auth-utils',
    'nuxt-og-image'
  ],
  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter(c =>
        ['UButton'].includes(c.pascalName)
      )

      globals.forEach(c => (c.global = true))
    }
  },
  ui: {
    icons: ['heroicons', 'simple-icons']
  },
  colorMode: {
    disableTransition: true
  },
  routeRules: {
    '/api/search.json': { prerender: true },
    '/docs': { redirect: '/docs/getting-started', prerender: false }
  },
  devtools: {
    enabled: true
  },
  typescript: {
    strict: false
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  imports: {
    dirs: [resolve('./stores'), '~/stores']
  },
  pinia: {
    storesDirs: ['~/stores/**', '#/stores/**', '@/stores/**']
  },
  formkit: {
    autoImport: true
  },
  tailwindcss: {
    config: {
      content: ['./formkit.theme.ts', './app.vue'],
      darkMode: 'class'
    }
  },
  runtimeConfig: {
    apiKey: '', // Default to an empty string, automatically set at runtime using process.env.NUXT_API_KEY
    public: {
      apiBaseURL: 'http://172.18.0.1:8082' // Exposed to the frontend as well.
    }
  }
})
