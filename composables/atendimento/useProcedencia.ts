export const useProcedencia = () => {
  const useBase = useBaseStore('/atendimento/procedencia')
  const getItemList = async () => {
    return getFieldList(await useBase.getList())
  }
  const getItem = async (id: number) => {
    return getFieldItem(await useBase.get(id, 'cd_procedencia,ds_procedencia'))
  }
  return {
    getItemList,
    getItem,
    ...useBase
  }
}
