export const useEmpresaSla = (id?: number) => {
  return {
    ...useBaseStore(`/gerencial/empresa/${id}/sla`)
  }
}
