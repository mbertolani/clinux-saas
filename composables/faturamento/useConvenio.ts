export const useConvenio = () => {
  const getItemList = async () => {
    return getFieldList(await useBaseStore('/faturamento/convenio').getList())
  }
  const getItem = async (id: number) => {
    return getFieldItem(await useBaseStore('/faturamento/convenio').get(id, 'cd_fornecedor,ds_fornecedor'))
  }
  return {
    getItemList,
    getItem,
    ...useBaseStore(`/faturamento/convenio`)
  }
}
