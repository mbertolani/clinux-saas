export const useMaterial = (id?: number) => {
  const useMaterialUnidade = useBaseStore(`/estoque/material/${id}/unidade`)
  const getItemList = async () => {
    return getFieldList(await useBaseStore('/estoque/material').getList())
  }
  const getItem = async (id: number) => {
    return getFieldItem(await useBaseStore('/estoque/material').get(id, 'cd_material,ds_material'))
  }
  async function getMaterialUnidade() {
    const response = await useMaterialUnidade.getAll()
    return {
      primary: response,
      foreign: response.map((item: any) => item.cd_unidade)
    }
  }
  const getMaterialTitle = async () => {
    return (await useMaterialUnidade.getTitle()).ds_material
  }
  return {
    getMaterialTitle,
    useMaterialUnidade,
    getMaterialUnidade,
    getItemList,
    getItem,
    ...useBaseStore('/estoque/material')
  }
}
