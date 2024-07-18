export const useEmpresaMedico = (id?: number) => {
  return {
    ...useBaseStore(`/gerencial/empresa/${id}/grupo_escalonador`)
  }
}
