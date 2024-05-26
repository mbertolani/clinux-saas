import { defineStore } from 'pinia'
import { ModuleType, type Client } from '~/types/system'

export const useRouterStore = defineStore({
  id: 'myRouterStore',
  state: () => ({
    clientId: ref(null),
    moduleId: ref<ModuleType>(),
    client: ref<Client>()
  }),

  getters: {
    apiUrl: state => state.client?.ds_portal_url
  },

  actions: {

    async loadClient() {
      const router = useRoute()
      const aSystem = router.params.system as ModuleType
      const aClient = router.params.client as string

      if (this.client && aClient === this.clientId) return this.client?.ds_portal_url

      this.moduleId = aSystem as ModuleType
      this.clientId = aClient as string

      if (!this.clientId || this.clientId === 'localhost') {
        this.moduleId = ModuleType.CLINUX
        this.clientId = 'localhost'
        this.client = {
          cd_empresa: 1,
          ds_empresa: 'Genesis',
          ds_portal_url: 'http://172.18.0.1:8082',
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
      return this.client?.ds_portal_url
    }
  },
  persist: true
})
