export const usePlano = () => {
  const getItemList = async () => {
    return getFieldList(await useBaseStore('/faturamento/plano').getList())
  }
  const getItem = async (id: number) => {
    return getFieldItem(await useBaseStore('/faturamento/plano').get(id, 'cd_plano,ds_plano'))
  }
  return {
    getItemList,
    getItem,
    ...useBaseStore(`/faturamento/plano`)
  }
}
