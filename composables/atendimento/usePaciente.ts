export const usePaciente = () => {
  const useBase = useBaseStore('/atendimento/paciente')
  async function getPaciente(id: number) {
    return getFieldItem(await useBase.get(id, 'cd_paciente,ds_paciente'))
  }
  async function getPacientes(payload: string) {
    return getFieldList(await useBase.find('paciente', { ds_pesquisa: payload }))
  }
  return {
    getPaciente,
    getPacientes,
    ...useBaseStore('/atendimento/paciente')
  }
}
