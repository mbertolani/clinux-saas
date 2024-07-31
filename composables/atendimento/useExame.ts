export const useExame = (id: number = 0) => {
  const useBase = useBaseStore(`/atendimento/atendimento/${id}/exame`)
  const findProcedimento = async (payload: { cd_exame: any, cd_sala: any, cd_plano: any, cd_medico: any, dt_data: any }) => {
    return getFieldList(await useBase.find('procedimentos', payload))
  }
  const findParticular = async (cd_atendimento: number) => {
    const response = await useBase.find('particular', { cd_atendimento })
    return response.length ? response[0].cd_plano : 0
  }
  return {
    findParticular,
    findProcedimento,
    ...useBase
  }
}
