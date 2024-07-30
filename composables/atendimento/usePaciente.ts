export const usePaciente = () => {
  async function getPaciente(id: number) {
    const response = getFieldItem(await useBaseStore('/atendimento/paciente').get(id, 'cd_paciente,ds_paciente,dt_nascimento'))
    return response
  }
  async function getPacientes(payload: string) {
    const response = getFieldList(await useBaseStore('/atendimento/paciente').find('paciente', { ds_pesquisa: payload }))
    return response
  }
  return {
    getPaciente,
    getPacientes,
    ...useBaseStore('/atendimento/paciente')
  }
}
