import { useModalidade } from './useModalidade'
import { useMedico } from './useMedico'
import { useEmpresa } from './useEmpresa'

export const useModelo = () => {
  async function getMedicos(id: number) {
    return getFieldList(await useMedico().find('modalidade', { cd_modalidade: id }))
  }
  async function getEmpresas() {
    return getFieldList(await useEmpresa().getList())
  }
  async function getModalidades() {
    return getFieldList(await useModalidade().getList())
  }
  async function getMedico(id: number) {
    return getFieldItem(await useMedico().get(id, 'cd_medico,ds_medico'))
  }
  async function getEmpresa(id: number) {
    return getFieldItem(await useEmpresa().get(id, 'cd_empresa,ds_empresa'))
  }
  async function getModalidade(id: number) {
    return getFieldItem(await useModalidade().get(id, 'cd_modalidade,ds_modalidade'))
  }
  const setFormula = async (id: number, payload: string) => {
    return await useModelo().update(id, { bb_variavel: Encode64(payload) })
  }
  const getFormula = async (id: number) => {
    const response = await useModelo().get(id, 'bb_variavel')
    return Decode64(response?.bb_variavel)
  }
  const getFormulaData = async (id: number) => {
    const data = await getFormula(id)
    return data ? JSON.parse(data) : null
  }
  const getModelo = async (id: number) => {
    const response = await useModelo().get(id, 'bb_modelo')
    return Decode64(response.bb_modelo)
  }
  const setModelo = async (id: number, payload: string) => {
    return await useModelo().update(id, { bb_modelo: payload })
  }
  return {
    getModelo,
    setModelo,
    setFormula,
    getFormula,
    getFormulaData,
    getModalidade,
    getEmpresa,
    getMedico,
    getModalidades,
    getEmpresas,
    getMedicos,
    ...useBaseStore('/laudo/modelo')
  }
}
