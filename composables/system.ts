import { defineStore } from 'pinia'
import type { ModuleType, Setup, MainMenu, Client } from '~/types/system'

export const useSystemStore = defineStore('system', () => {
// export const useSystem = () => {
  const name = <ModuleType>'dicomvix'
  const client = ref<Client>()
  const setup = ref<Setup>()
  const menu = ref<MainMenu[]>([])
  const icon = ref(null)
  const logo = ref(null)
  const loading = ref(false)
  const toast = useToast()
  const route = useRoute()

  const toastError = (error: any) => {
    toast.add({
      title: 'Erro',
      color: 'red',
      description: error || 'Não foi possível conectar ao servidor'
    })
  }

  const getAll = async () => {
    await useAsyncData('system', async () => {
      const [_setup, _logo, _icon] = await Promise.all([
        useNuxtApp().$api('/setup/data'),
        useNuxtApp().$api('/setup/logo'),
        useNuxtApp().$api('/setup/icon')
      ])
      setup.value = _setup[0]
      logo.value = _logo
      icon.value = _icon
      return { _setup, _logo, _icon }
    })
  }

  const loadLogo = async () => {
    try {
      loading.value = true
      // const { data: response } = await useAPI('/setup/logo')
      const response = await useNuxtApp().$api('/setup/logo')
      logo.value = response
    } catch (error) {
      toastError(error.response?._data.error)
    } finally {
      loading.value = false
    }
  }
  const loadSetup = async () => {
    try {
      loading.value = true
      const { data } = await useAPI('/setup/data', { method: 'GET', default: () => null })
      setup.value = data.value ? data?.value[0] : null
    } catch (error) {
      console.log('error', error)
      toastError(error.response?._data.error)
    } finally {
      loading.value = false
    }
  }

  const loadMenu = async () => {
    const { data } = await useAPI('/setup/menu', { method: 'GET', default: () => null })
    menu.value = data.value
  }

  const loadClient = async () => {
    if (client.value && client.value?.ds_portal_id === route.query.id) return

    if (!route.query.id || route.query.id === 'localhost') {
      client.value = {
        cd_empresa: 1,
        ds_empresa: 'Genesis',
        ds_portal_url: 'http://172.18.0.1:8082',
        ds_portal_id: 'localhost'
      }
    } else {
      try {
        console.log('loadClient', route.query.id)
        const { data } = await useFetch('https://lumen.clinux.com.br/chamados/cgi-bin/dwserver.cgi/se1/dotListaCgi?id=' + route.query.id)
        client.value = data.value[0]
      } catch (error) {
        console.log(error)
      }
    }
  }

  const apiUrl = computed(() => client.value?.ds_portal_url)

  return {
    apiUrl,
    name,
    client,
    menu,
    setup,
    logo,
    icon,
    loading,
    loadSetup,
    loadMenu,
    loadClient,
    loadLogo,
    getAll
  }
})
