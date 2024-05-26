import { defineStore } from 'pinia'
import { type Setup, type MainMenu } from '~/types/system'

// https://masteringpinia.com/blog/top-5-mistakes-to-avoid-when-using-pinia
// https://pinia.vuejs.org/ssr/nuxt.html

export const useSystemStore = defineStore('system', () => {
  // export const useSystem = () => {
  const setup = ref<Setup>()
  const menu = ref<MainMenu[]>([])
  const icon = ref(null)
  const logo = ref(null)
  const loading = ref(false)
  const toast = useToast()

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

  function $reset() {
    setup.value = null
    menu.value = null
    icon.value = null
    logo.value = null
    loading.value = null
  }

  return {
    menu,
    setup,
    logo,
    icon,
    loading,
    $reset,
    loadSetup,
    loadMenu,
    loadLogo,
    getAll
  }
},
{ persist: true }
)
