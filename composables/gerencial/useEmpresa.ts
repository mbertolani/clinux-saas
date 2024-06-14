export const useEmpresa = () => {
  async function getBancos() {
    return getFieldList(await useBaseStore('/financeiro/banco').getList())
  }
  async function getEstoques() {
    return getFieldList(await useBaseStore('/estoque/estoque').getList())
  }
  async function getEstoque(id: number) {
    return getFieldItem(useBaseStore('/estoque/estoque').get(id, 'cd_estoque,ds_estoque'))
  }
  async function getBanco(id: number) {
    return getFieldItem(useBaseStore('/financeiro/banco').get(id, 'cd_banco,ds_banco'))
  }

  return {
    getBanco,
    getBancos,
    getEstoque,
    getEstoques,
    ...useBaseStore('/gerencial/empresa')
  }
}
