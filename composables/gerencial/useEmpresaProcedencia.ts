export const useEmpresaProcedencia = (id?: number) => {
  return {
    ...useBaseStore(`/gerencial/empresa/${id}/procedencia`)
  }
}
