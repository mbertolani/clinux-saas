export const useProcedimentoGrupo = () => {
  const getItemList = async () => {
    return getFieldList(await useBaseStore('/gerencial/procedimento_grupo').getList())
  }
  const getItem = async (id: number) => {
    return getFieldItem(await useBaseStore('/gerencial/procedimento_grupo').get(id, 'cd_grupo,ds_grupo'))
  }
  return {
    getItemList,
    getItem,
    ...useBaseStore(`/gerencial/procedimento_grupo`)
  }
}
