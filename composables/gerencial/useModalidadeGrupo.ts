export const useModalidadeGrupo = (id?: number) => {
  return {
    ...useBaseStore(`/gerencial/modalidade/${id}/grupo`)
  }
}
