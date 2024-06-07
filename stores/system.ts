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
  const loading = ref(0)
  const toast = useToast()

  const initDialog = {
    title: 'Aviso',
    description: 'Deseja confirmar a operação ?',
    okButton: 'Confirmar',
    noButton: 'Cancelar',
    visible: false,
    okClick: null,
    noClick: null // () => { propsDialog.value.visible = false }
  }
  const propsDialog = ref(initDialog)

  const showError = (message: string) => {
    console.log('showError', message)
    toast.add({
      title: 'Erro',
      color: 'red',
      description: message
    })
  }
  const showMessage = (message?: string) => {
    toast.add({
      title: 'Aviso',
      color: 'green',
      description: message || 'Operação realizada com sucesso'
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
      // loading.value = true
      // const { data: response } = await useAPI('/setup/logo')
      const response = await useNuxtApp().$api('/setup/logo')
      logo.value = response
    } catch (error) {
      showError(error.response?._data.error || 'Não foi possível conectar ao servidor')
    } finally {
      // loading.value = false
    }
  }

  const changeTheme = (primary, gray) => {
    // const config = useAppConfig()
    console.log('config', primary, gray)
    // config.ui.primary = primary
    // config.ui.gray = gray
  }

  const loadSetup = async () => {
    try {
      // loading.value = true
      const { data } = await useAPI('/setup/data', { method: 'GET', default: () => null })
      setup.value = data.value ? data?.value[0] : null
      changeTheme(setup.value?.ds_dicomvix_tema, setup.value?.ds_dicomvix_tema)
    } catch (error) {
      showError(error.response?._data.error || 'Não foi possível conectar ao servidor')
    } finally {
      // loading.value = false
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

  function startLoading() {
    loading.value++
  }
  function finishLoading() {
    loading.value--
  }
  function showDialog(payload: any) {
    propsDialog.value = { ...initDialog, ...payload }
    propsDialog.value.visible = true
  }
  function closeDialog() {
    propsDialog.value.visible = false
  }
  watch
  return {
    menu,
    setup,
    logo,
    icon,
    loading,
    startLoading,
    finishLoading,
    $reset,
    loadSetup,
    loadMenu,
    loadLogo,
    getAll,
    showError,
    showMessage,
    showDialog,
    closeDialog,
    propsDialog
  }
},
{ persist: true }
)
