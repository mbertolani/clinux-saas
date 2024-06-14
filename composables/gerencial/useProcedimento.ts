export const useProcedimento = () => {
  const getGrupos = async (id: number) => {
    return getFieldList(await useBaseStore('/gerencial/procedimento_grupo').getAll({ cd_modalidade: id }))
  }
  const getGrupo = async (id: number) => {
    return getFieldItem(await useBaseStore('/gerencial/procedimento_grupo').get(id, 'cd_grupo,ds_grupo'))
  }
  return {
    getGrupos,
    getGrupo,
    ...useBaseStore('/gerencial/procedimento')
  }
}
