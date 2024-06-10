import { defineStore } from 'pinia'
import { ModuleType, type Client, type User } from '~/types/system'

export const useRouterStore = defineStore({
  id: 'routerStore',
  state: () => ({
    clientId: ref(null),
    moduleId: ref<ModuleType>(),
    client: ref<Client>(),
    userId: ref<User>()
  }),

  getters: {
    user: state => state.userId,
    apiUrl: state => state.client?.ds_portal_url,
    clientName: state => state.client?.ds_empresa
  },

  actions: {
    async loadUser(): Promise<User | null> {
      const { data } = await useHttp(this.apiUrl + '/auth/session', { method: 'post' })
      this.userId = data as any
      return data as any
    },
    async loadClient() {
      const router = useRoute()
      const client = router.params.client || router.query.id || 'localhost'

      if (this.client && client === this.clientId)
        return this.client?.ds_portal_url

      if (!client)
        return

      this.moduleId = router.params.system as ModuleType
      this.clientId = client as string

      if (this.clientId === 'localhost') {
        this.moduleId = ModuleType.CLINUX
        this.clientId = 'localhost'
        this.client = {
          cd_empresa: 1,
          ds_empresa: 'FujiFilm',
          ds_portal_url: 'http://localhost:8082',
          ds_portal_id: 'localhost'
        }
      } else {
        try {
          const url = 'https://lumen.clinux.com.br/chamados/cgi-bin/dwserver.cgi/se1/dotListaCgi?id=' + this.clientId
          const data = await $fetch(url)
          this.client = data ? data[0] : null
        } catch (error) {
          this.client = null
          console.error(error)
        }
      }

      const config = useRuntimeConfig()
      // config.public.BaseUrl = this.client?.ds_portal_url
      config.public.auth.computed.fullBaseUrl = config.public.BaseUrl + '/auth'

      return this.client?.ds_portal_url
    }
  },
  persist: true
})
