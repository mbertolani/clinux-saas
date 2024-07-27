export const useSetup = () => {
  const baseStore = useBaseStore('/gerencial/setup')
  const getSetup = async (payload: string) => {
    const response = await useBaseStore('/gerencial/setup').get(1, payload)
    return response[payload]
  }
  const findEditor = async () => {
    const response = await baseStore.find('editor')
    return getFieldList(response)
  }
  return {
    findEditor,
    getSetup,
    ...baseStore
  }
}
