export const useFilaMedico = (id?: number) => {
  return {
    ...useBaseStore(`/laudo/fila/${id}/medico`)
  }
}
