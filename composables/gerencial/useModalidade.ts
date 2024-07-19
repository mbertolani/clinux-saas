export const useModalidade = () => {
  const getItemList = async () => {
    return getFieldList(await useBaseStore('/gerencial/modalidade').getList())
  }
  const getItem = async (id: number) => {
    return getFieldItem(await useBaseStore('/gerencial/modalidade').get(id, 'cd_modalidade,ds_modalidade'))
  }
  return {
    getItemList,
    getItem,
    ...useBaseStore('/gerencial/modalidade')
  }
}
