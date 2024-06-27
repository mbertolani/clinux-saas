import { Messages } from '~/types/system'

const debugMessage = ref()
const isOpen = ref()
const config = ref({
  title: 'Aviso',
  description: 'Deseja confirmar ?',
  okButton: 'Sim',
  noButton: 'Não',
  okClick: null,
  noClick: null // () => { propsDialog.value.visible = false }
})
// const propsDialog = ref(config)

// export const useMessageStore = defineStore('message', () => {
export const useMessage = () => {
  function openDialog(payload: any) {
    config.value = Object.assign(config.value, payload)
    isOpen.value = true
  }
  function closeDialog() {
    isOpen.value = false
  }
  const showDebug = (payload: any) => {
    debugMessage.value = payload
  }
  const showError = (message?: string, title?: string) => {
    useToast().add({
      title: title || 'Erro',
      color: 'red',
      description: message || Messages.MSG_FNF_GRID,
      icon: 'i-heroicons-exclamation-triangle'
    })
  }
  const showMessage = (message?: string, title?: string) => {
    useToast().add({
      title: title || 'Aviso',
      color: 'green',
      description: message || Messages.MSG_SYS_OK,
      icon: 'i-heroicons-check-circle'
    })
  }

  return {
    config,
    isOpen,
    debugMessage,
    showDebug,
    showError,
    showMessage,
    openDialog,
    closeDialog
  }
// },
// { persist: true }
// )
}
