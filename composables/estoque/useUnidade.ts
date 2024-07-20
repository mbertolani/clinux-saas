export const useUnidade = () => {
  const getItemList = async () => {
    return getFieldList(await useBaseStore('/estoque/unidade').getList())
  }
  const getItem = async (id: number) => {
    return getFieldItem(await useBaseStore('/estoque/unidade').get(id, 'cd_unidade,ds_unidade'))
  }
  const findMinimo = async () => {
    return getFieldList(await useUnidade().find('minimo'))
  }
  const findApresentacao = async (cd_unidade: number) => {
    return getFieldList(await useUnidade().find('apresentacao', { cd_unidade }))
  }
  const findTiss = async () => {
    return getFieldList(await useUnidade().find('tiss'))
  }
  return {
    getItemList,
    getItem,
    findMinimo,
    findApresentacao,
    findTiss,
    ...useBaseStore('/estoque/unidade')
  }
}
