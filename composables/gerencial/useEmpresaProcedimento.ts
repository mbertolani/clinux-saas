export const useEmpresaProcedimento = (id?: number) => {
  return {
    ...useBaseStore(`/gerencial/empresa/${id}/procedimento`)
  }
}
