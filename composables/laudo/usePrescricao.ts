import { useMaterial } from '../estoque/useMaterial'
import { useSetup } from '../gerencial/useSetup'
import { useLayout } from '../gerencial/useLayout'

export const usePrescricao = (id?: number) => {
  const useBase = useBaseStore('/atendimento/prescricao')
  const usePaciente = useBaseStore('/atendimento/paciente')
  const usePrescricaoMaterial = useBaseStore(`/atendimento/prescricao/${id}/material`)
  async function findExame(cd_paciente: number, dt_prescricao: string) {
    return await useBase.find('exame', { cd_paciente, dt_prescricao })
  }
  async function getExames(cd_paciente: number, dt_prescricao: string) {
    return getFieldList(await findExame(cd_paciente, dt_prescricao))
  }
  async function getMaterial(id: number) {
    return getFieldItem(await useBaseStore('/estoque/material').get(id, 'cd_material,ds_material'))
  }
  async function getMateriais() {
    return getFieldList(await useMaterial().find('medicamento') as any)
  }
  async function getUnidades(cd_material: number) {
    return getFieldList(await useMaterial().find('unidade', { cd_material }))
  }
  async function getUnidade(id: number) {
    return getFieldItem(await useBaseStore('/estoque/unidade').get(id, 'cd_unidade,ds_unidade'))
  }
  async function getPaciente(id: number) {
    return getFieldItem(await usePaciente.get(id, 'cd_paciente,ds_paciente'))
  }
  async function getPacientes(ds_paciente: string, dt_prescricao: string) {
    return getFieldList(await useBase.find('paciente', { ds_paciente, dt_prescricao }))
  }
  async function getStatus(id: number) {
    const response = await useBase.get(id, 'ds_status')
    return response.ds_status === 'ABERTO'
  }
  async function getPrescricao(cd_exame: number) {
    const response = await useBase.find('prescricao', { cd_exame })
    return response.length ? response[0].cd_prescricao : null
  }
  async function getAtendimento(cd_prescricao: number) {
    const response = await useBase.find('atendimento', { cd_prescricao })
    return response?.length ? response[0].cd_atendimento : null
  }
  const setDocumento = async (id: number, payload: string) => {
    return await useBase.update(id, { bb_pdf: Encode64(payload) })
  }
  const getDocumento = async (id: number) => {
    const editor = await useSetup().get(1, 'cd_editor_prescricao')
    const [layout, data] = await Promise.all([
      useLayout().get(editor.cd_editor_prescricao, 'bb_layout'),
      useLayout().find('mestre', { cd_editor: editor.cd_editor_prescricao, id })
    ])
    return {
      layout: Decode64(layout.bb_layout),
      data
    }
  }
  async function getAssinado(id: number) {
    return await useHttp(`/atendimento/prescricao/blob/${id}?fieldname=bb_pdf&filename=doc.pdf`, { method: 'post', fileDownload: true })
  }
  return {
    findExame,
    getAtendimento,
    getPrescricao,
    getAssinado,
    getDocumento,
    setDocumento,
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
