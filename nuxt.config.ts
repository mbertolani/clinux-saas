import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: true,
  build: {
    transpile: process.env.NODE_ENV === 'production' ? ['@syncfusion'] : []
  },
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'],
  plugins: [
    { src: '~/plugins/base64.ts' }
  ],
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
    'nuxt-icon',
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
      aggridKey: 'Using_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-051714}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Genesis_Tecnologia}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{Clinux}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{Clinux}_need_to_be_licensed___{Clinux}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Charts_and_AG_Grid}_Enterprise_versions_released_before_{1_January_2025}____[v3]_[0102]_MTczNTY4OTYwMDAwMA==3be157b75b26c094fd0faf3609d46ba5',
      syncfusionKey: 'Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXpfeXRdRGhZWUxxWEM=',
      apiBaseURL: process.env.NODE_ENV === 'production' ? 'https://sedi2.zapto.org/dwcluster' : 'https://sedi2.zapto.org/dwcluster'
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
    baseURL: process.env.NODE_ENV === 'production' ? 'https://sedi2.zapto.org/dwcluster/auth' : 'https://sedi2.zapto.org/dwcluster/auth',
    provider: {
      type: 'local',
      // endpoints: {
      //   // signIn: { path: '/auth', method: 'post' },
      //   // getSession: { path: '/user', method: 'post' }
      // },
      token: {
        signInResponseTokenPointer: '/token/bearer'
      },
      pages: {
        login: '/login'
      },
      sessionDataType: { id: 'string', email: 'string', name: 'string', role: 'admin | guest | account', idmedico: 'number', idleo: 'number', certificado: 'boolean' }
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
