export const useExame = (id: number = 0) => {
  const useBase = useBaseStore(`/atendimento/atendimento/${id}/exame`)
  const findProcedimento = async (payload: { cd_exame: any, cd_sala: any, cd_plano: any, cd_medico: any, dt_data: any }) => {
    return getFieldList(await useBase.find('procedimentos', payload))
  }
  return {
    findProcedimento,
    ...useBase
  }
}
