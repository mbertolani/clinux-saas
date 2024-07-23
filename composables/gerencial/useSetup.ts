export const useSetup = () => {
  const getSetup = async (payload: string) => {
    const response = await useBaseStore('/gerencial/setup').get(1, payload)
    return response[payload]
  }
  return {
    getSetup,
    ...useBaseStore('/gerencial/setup')
  }
}
