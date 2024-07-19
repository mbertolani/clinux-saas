import { useModelo } from './useModelo'

export const useProcedimento = (id?: number) => {
  const useProcedimentoModelo = useBaseStore(`/gerencial/procedimento/${id}/modelo`)
  async function getModelo() {
    const response = await useProcedimentoModelo.getAll()
    return {
      primary: response,
      foreign: response.map((item: any) => item.cd_modelo)
    }
  }
  const getModelos = async () => {
    const response = await useProcedimento().get(id, 'cd_modalidade')
    return getFieldList(await useModelo().getView({ cd_modalidade: response?.cd_modalidade }), 'cd_modelo', 'ds_modelo')
  }
  const getGrupos = async (id: number) => {
    return getFieldList(await useBaseStore('/gerencial/procedimento_grupo').getAll({ cd_modalidade: id }))
  }
  const getGrupo = async (id: number) => {
    return getFieldItem(await useBaseStore('/gerencial/procedimento_grupo').get(id, 'cd_grupo,ds_grupo'))
  }
  const getItemList = async () => {
    return getFieldList(await useBaseStore('/gerencial/procedimento').getList())
  }
  const getItem = async (id: number) => {
    return getFieldItem(await useBaseStore('/gerencial/procedimento').get(id, 'cd_procedimento,ds_procedimento'))
  }
  return {
    getItemList,
    getItem,
    getModelo,
    getModelos,
    getGrupos,
    getGrupo,
    useProcedimentoModelo,
    ...useBaseStore('/gerencial/procedimento')
  }
}
