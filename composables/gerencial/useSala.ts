export const useSala = () => {
  const listaSala = ref()

  const getItemList = async () => {
    listaSala.value = await useBaseStore('/gerencial/sala').getList()
    return getFieldList(listaSala.value)
  }
  const getItem = async (id: number) => {
    return getFieldItem(await useBaseStore('/gerencial/sala').get(id, 'cd_sala,ds_sala'))
  }
  const getPlano = (id: number) => {
    const sala = listaSala.value.find(item => item.cd_sala === id)
    return sala?.cd_plano
  }
  return {
    getPlano,
    getItemList,
    getItem,
    ...useBaseStore('/gerencial/sala')
  }
}
