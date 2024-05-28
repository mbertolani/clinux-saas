import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'],
  modules: [
    '@formkit/auto-animate',
    '@formkit/nuxt',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@sidebase/nuxt-auth',
    'nuxt-og-image'
    // 'nuxt-security'
  ],
  // hooks: {
  //   // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
  //   'components:extend': (components) => {
  //     const globals = components.filter(c =>
  //       ['UButton'].includes(c.pascalName)
  //     )

  //     globals.forEach(c => (c.global = true))
  //   }
  // },
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
  },
  // auth: {
  //   isEnabled: true,
  //   baseURL: process.env.AUTH_ORIGIN,
  //   provider: {
  //     type: 'authjs'
  //   },
  //   globalAppMiddleware: {
  //     isEnabled: true,
  //     addDefaultCallbackUrl: false
  //   }
  // }
  auth: {
    isEnabled: true,
    globalAppMiddleware: {
      isEnabled: true
    },
    // baseURL: 'http://172.18.0.1:8082/login',
    provider: {
      type: 'local',
      endpoints: {
        // signIn: { path: '/auth', method: 'post' },
        // getSession: { path: '/user', method: 'post' }
      },
      token: {
        signInResponseTokenPointer: '/token/bearer'
      },
      pages: {
        login: '/login'
      },
      sessionDataType: { id: 'string', email: 'string', name: 'string', role: 'admin | guest | account' }
    },
    session: {
      // Whether to refresh the session every time the browser window is refocused.
      enableRefreshOnWindowFocus: false,
      // Whether to refresh the session every `X` milliseconds. Set this to `false` to turn it off. The session will only be refreshed if a session already exists.
      enableRefreshPeriodically: 1000 * 60 * 60 // 5 minutes
    }
  }
  // security: {
  //   headers: {
  //     crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp'
  //   }
  // }
})
