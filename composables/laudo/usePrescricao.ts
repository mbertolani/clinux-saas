import { useMaterial } from '../estoque/useMaterial'

export const usePrescricao = (id?: number) => {
  const usePrescricaoMaterial = useBaseStore(`/atendimento/prescricao/${id}/material`)
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
    const response = getFieldItem(await useBaseStore('/atendimento/paciente').get(id, 'cd_paciente,ds_paciente'))
    return response
  }
  async function getPacientes(payload: string) {
    const response = getFieldList(await useBaseStore('/atendimento/paciente').find('paciente', { ds_pesquisa: payload }))
    return response
  }
  return {
    getPaciente,
    getPacientes,
    getMaterial,
    getMateriais,
    getUnidade,
    getUnidades,
    ...useBaseStore('/atendimento/prescricao'),
    ...{ usePrescricaoMaterial }
  }
}
