const id = ref(0)
export const useEmpresa = () => {
  function incId() {
    id.value++
  }
  async function getBancos() {
    const response = await useBaseStore('/financeiro/banco').api.getList()
    return getFieldList(response)
  }
  async function getEstoques() {
    const response = await useBaseStore('/estoque/estoque').api.getList()
    return getFieldList(response)
  }

  async function getEstoque(id: number) {
    const { item, api } = useBaseStore('/estoque/estoque')
    await api.get(id, 'cd_estoque,ds_estoque')
    return getFieldItem(item.value)
  }

  const getId = computed(() => id.value)
  return {
    getId,
    incId,
    getBancos,
    getEstoque,
    getEstoques,
    ...useBaseStore('/gerencial/empresa')
  }
}
