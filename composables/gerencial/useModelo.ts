import { useModalidade } from './useModalidade'
import { useMedico } from './useMedico'
import { useEmpresa } from './useEmpresa'

export const useModelo = () => {
  async function getMedicos(id: number) {
    return getFieldList(await useMedico().api.find('modalidade', { cd_modalidade: id }))
  }
  async function getEmpresas() {
    return getFieldList(await useEmpresa().api.getList())
  }
  async function getModalidades() {
    return getFieldList(await useModalidade().api.getList())
  }
  async function getMedico(id: number) {
    return getFieldItem(await useMedico().api.get(id, 'cd_medico,ds_medico'))
  }
  async function getEmpresa(id: number) {
    return getFieldItem(await useEmpresa().api.get(id, 'cd_empresa,ds_empresa'))
  }
  async function getModalidade(id: number) {
    return getFieldItem(await useModalidade().api.get(id, 'cd_modalidade,ds_modalidade'))
  }
  return {
    getModalidade,
    getEmpresa,
    getMedico,
    getModalidades,
    getEmpresas,
    getMedicos,
    ...useBaseStore('/laudo/modelo')
  }
}
