export const useSla = () => {
  const useBase = useBaseStore('/gerencial/sla')
  const getItemList = async () => {
    return getFieldList(await useBase.getList())
  }
  const getItem = async (id: number) => {
    return getFieldItem(await useBase.get(id, 'cd_sla,ds_sla'))
  }
  return {
    getItemList,
    getItem,
    ...useBase
  }
}
