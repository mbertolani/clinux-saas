export const useProcedimento = () => {
  const getGrupos = async (id: number) => {
    const { api, items } = useBaseStore('/gerencial/procedimento_grupo')
    await api.getAll({ cd_modalidade: id })
    return getFieldList(items.value)
  }
  const getGrupo = async (id: number) => {
    const { api, item } = useBaseStore('/gerencial/procedimento_grupo')
    await api.get(id, 'cd_grupo,ds_grupo')
    return getFieldItem(item.value)
  }
  return {
    getGrupos,
    getGrupo,
    ...useBaseStore('/gerencial/procedimento')
  }
}
