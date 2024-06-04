const id = ref(0)
export const useEmpresa = () => {
  function incId() {
    id.value++
  }
  async function getBancos() {
    const response = await useBaseStore('/financeiro/banco').api.getList()
    return response.map((result) => {
      return {
        value: result.cd_banco,
        label: result.ds_banco
      }
    })
  }
  async function getEstoques() {
    const response = await useBaseStore('/estoque/estoque').api.getList()
    return response.map((result) => {
      return {
        label: result.ds_estoque,
        value: result.cd_estoque
      }
    })
  }

  async function getEstoque(id: number) {
    const { item, api } = useBaseStore('/estoque/estoque')
    await api.get(id, 'cd_estoque,ds_estoque')
    console.log('id', item.value)
    const response = item.value as any
    return {
      label: response.ds_estoque,
      value: response.cd_estoque
    }
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
