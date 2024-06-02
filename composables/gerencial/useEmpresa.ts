const id = ref(0)
export const useEmpresa = () => {
  function incId() {
    id.value++
  }
  const getId = computed(() => id.value)
  return {
    getId,
    incId,
    ...useBaseStore('/gerencial/empresa')
  }
}
