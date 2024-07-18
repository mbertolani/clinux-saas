export const useUsuarioGrupo = () => {
  const getItemList = async () => {
    return getFieldList(await useBaseStore('/gerencial/usuario_grupo').getList())
  }
  const getItem = async (id: number) => {
    return getFieldItem(await useBaseStore('/gerencial/usuario_grupo').get(id, 'cd_grupo,ds_grupo'))
  }
  return {
    getItemList,
    getItem,
    ...useBaseStore('/gerencial/usuario_grupo')
  }
}
