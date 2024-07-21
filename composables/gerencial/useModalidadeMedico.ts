export const useModalidadeMedico = (id?: number) => {
  return {
    ...useBaseStore(`/gerencial/modalidade/${id}/medico`)
  }
}
