export const useSolicitante = () => {
  const useBase = useBaseStore('/atendimento/medico')
  async function getMedico(id: number) {
    const response = getFieldItem(await useBase.get(id, 'cd_medico,ds_medico,ds_crm_nr,ds_crm_uf'))
    return response
  }
  async function getMedicos(payload: string) {
    return getFieldList(await useBase.find('medico', { ds_pesquisa: payload }))
  }
  return {
    getMedico,
    getMedicos,
    ...useBase
  }
}
