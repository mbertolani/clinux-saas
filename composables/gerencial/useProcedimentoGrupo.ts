export const useProcedimentoGrupo = (id?: number) => {
  return {
    ...useBaseStore(`/gerencial/modalidade/${id}/grupo`)
  }
}
