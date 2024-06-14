export const useChat = (id: number) => {
  return {
    ...useBaseStore(`/atendimento/atendimento/${id}/chat`)
  }
}
