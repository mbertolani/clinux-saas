export const useEmpresa = (id?: number) => {
  const useEmpresaSla = useBaseStore(`/gerencial/empresa/${id}/sla`)
  async function getBancos() {
    return getFieldList(await useBaseStore('/financeiro/banco').getList())
  }
  async function getEstoques() {
    return getFieldList(await useBaseStore('/estoque/estoque').getList())
  }
  async function getEstoque(id: number) {
    return getFieldItem(await useBaseStore('/estoque/estoque').get(id, 'cd_estoque,ds_estoque'))
  }
  async function getBanco(id: number) {
    return getFieldItem(await useBaseStore('/financeiro/banco').get(id, 'cd_banco,ds_banco'))
  }
  async function getEmpresaSla() {
    const response = await useEmpresaSla.getAll()
    return {
      primary: response,
      foreign: response.map((item: any) => item.cd_sla)
    }
  }
  async function getSla() {
    return getFieldList(await await useBaseStore('/gerencial/sla').getAll(), 'cd_sla', 'ds_sla')
  }
  async function getSlaTitle() {
    return (await useEmpresaSla.getTitle()).ds_empresa
  }
  const getItemList = async () => {
    return getFieldList(await useBaseStore('/gerencial/empresa').getList())
  }
  const getItem = async (id: number) => {
    return getFieldItem(await useBaseStore('/gerencial/empresa').get(id, 'cd_empresa,ds_empresa'))
  }
  return {
    getItemList,
    getItem,
    useEmpresaSla,
    getEmpresaSla,
    getSla,
    getSlaTitle,
    getBanco,
    getBancos,
    getEstoque,
    getEstoques,
    ...useBaseStore('/gerencial/empresa')
  }
}
