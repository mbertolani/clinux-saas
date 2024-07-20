export const useMaterialGrupo = () => {
  const findConta = async () => {
    return getFieldList(await useMaterialGrupo().find('conta'))
  }
  const getItemList = async () => {
    return getFieldList(await useBaseStore('/estoque/material_grupo').getList())
  }
  const getItem = async (id: number) => {
    return getFieldItem(await useBaseStore('/estoque/material_grupo').get(id, 'cd_grupo,ds_grupo'))
  }
  return {
    getItemList,
    getItem,
    findConta,
    ...useBaseStore('/estoque/material_grupo')
  }
}
