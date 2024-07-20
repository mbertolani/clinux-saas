export const useMaterial = () => {
  const getItemList = async () => {
    return getFieldList(await useBaseStore('/estoque/material').getList())
  }
  const getItem = async (id: number) => {
    return getFieldItem(await useBaseStore('/estoque/material').get(id, 'cd_material,ds_material'))
  }
  return {
    getItemList,
    getItem,
    ...useBaseStore('/estoque/material')
  }
}
