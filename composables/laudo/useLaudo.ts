import { useModalidade } from '../gerencial/useModalidade'
import { useMedico } from '../gerencial/useMedico'
import { useEmpresa } from '../gerencial/useEmpresa'

export const useLaudo = () => {
  const baseUrl = useRouterStore().apiUrl

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
  function post(url: string, body: object) {
    return useHttp(`${baseUrl}/se1/${url}`, { method: 'post', body, fileUpload: true })
  }
  async function doLaudoAbrir(payload: object) {
    const { data } = await post('doLaudoAbrir', payload)
    return data ? data[0].bb_laudo : null
  }
  async function doLaudoGravar(payload: any) {
    const { data } = await post('doLaudoGravar', {
      cd_exame: payload.cd_exame,
      cd_medico: payload.cd_medico,
      bb_laudo: payload.bb_laudo,
      bb_html: payload.bb_html,
      ds_exame: payload.ds_exame,
      sn_provisorio: payload.sn_provisorio
    })
    return data
  }
  return {
    getModalidade,
    getEmpresa,
    getMedico,
    getModalidades,
    getEmpresas,
    getMedicos,
    doLaudoAbrir,
    doLaudoGravar,
    ...useBaseStore('/laudo/laudo')
  }
}
