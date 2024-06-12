import { defineStore } from 'pinia'
import type { ModuleType, Client, User } from '~/types/system'

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
      const client = router.params.client || router.query.id

      if (this.client && client === this.clientId)
        return this.client?.ds_portal_url

      if (!client)
        return

      this.moduleId = router.params.system as ModuleType
      this.clientId = client as string

      if (this.clientId === 'localhost') {
        this.client = {
          cd_empresa: 1,
          ds_empresa: 'Genesis',
          ds_portal_url: process.env.NODE_ENV === 'production' ? 'http://192.168.56.1:8282' : 'http://127.0.0.1:8082',
          ds_portal_id: 'localhost'
        }
      } else if (this.clientId === 'sedi2') {
        this.client = {
          cd_empresa: 1,
          ds_empresa: 'FujiFilm',
          ds_portal_url: 'https://sedi2.zapto.org/dwcluster',
          ds_portal_id: 'sedi2'
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

      // console.log(_1, config.public.auth.computed.fullBaseUrl, config.public.auth.computed.origin)
      // config.public.auth.computed.fullBaseUrl = this.client?.ds_portal_url + '/auth'
      // config.public.auth.computed.origin = this.client?.ds_portal_url

      return this.client?.ds_portal_url
    }
  },
  persist: true
})
