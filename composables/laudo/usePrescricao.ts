import { useMaterial } from '../estoque/useMaterial'

export const usePrescricao = (id?: number) => {
  const useBase = useBaseStore('/atendimento/prescricao')
  const usePaciente = useBaseStore('/atendimento/paciente')
  const usePrescricaoMaterial = useBaseStore(`/atendimento/prescricao/${id}/material`)
  async function getExames(cd_paciente: number, dt_prescricao: string) {
    return getFieldList(await useBase.find('exame', { cd_paciente, dt_prescricao }))
  }
  async function getMaterial(id: number) {
    const response = getFieldItem(await useBaseStore('/estoque/material').get(id, 'cd_material,ds_material'))
    return response
  }
  async function getMateriais() {
    const response = getFieldList(await useMaterial().find('medicamento') as any)
    return response
  }
  async function getUnidades(cd_material: number) {
    const response = getFieldList(await useMaterial().find('unidade', { cd_material }))
    return response
  }
  async function getUnidade(id: number) {
    const response = getFieldItem(await useBaseStore('/estoque/unidade').get(id, 'cd_unidade,ds_unidade'))
    return response
  }
  async function getPaciente(id: number) {
    const response = getFieldItem(await usePaciente.get(id, 'cd_paciente,ds_paciente'))
    return response
  }
  async function getPacientes(payload: string) {
    const response = getFieldList(await usePaciente.find('paciente', { ds_pesquisa: payload }))
    return response
  }
  async function getStatus(id: number) {
    const response = await useBase.get(id, 'ds_status')
    return response.ds_status
  }
  return {
    getExames,
    getStatus,
    getPaciente,
    getPacientes,
    getMaterial,
    getMateriais,
    getUnidade,
    getUnidades,
    ...useBase,
    ...{ usePrescricaoMaterial }
  }
}
