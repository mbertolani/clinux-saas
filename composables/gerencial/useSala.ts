export const useSala = () => {
  const getItemList = async () => {
    return getFieldList(await useBaseStore('/gerencial/sala').getList())
  }
  const getItem = async (id: number) => {
    return getFieldItem(await useBaseStore('/gerencial/sala').get(id, 'cd_sala,ds_sala'))
  }
  return {
    getItemList,
    getItem,
    ...useBaseStore('/gerencial/sala')
  }
}
