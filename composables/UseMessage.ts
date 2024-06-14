const debugMessage = ref()
const isOpen = ref()
const config = ref({
  title: 'Aviso',
  description: 'Deseja confirmar a operação ?',
  okButton: 'Confirmar',
  noButton: 'Cancelar',
  okClick: null,
  noClick: null // () => { propsDialog.value.visible = false }
})
// const propsDialog = ref(config)

// export const useMessageStore = defineStore('message', () => {
export const useMessage = () => {
  const toast = useToast()

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
  const showError = (message?: string) => {
    toast.add({
      title: 'Erro',
      color: 'red',
      description: message || 'Nenhum registro selecionado',
      icon: 'i-heroicons-exclamation-triangle'
    })
  }
  const showMessage = (message?: string) => {
    toast.add({
      title: 'Aviso',
      color: 'green',
      description: message || 'Operação realizada com sucesso',
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
