import { useModalidade } from '../gerencial/useModalidade'
import { useMedico } from '../gerencial/useMedico'
import { useEmpresa } from '../gerencial/useEmpresa'

type responseType = { data: any, error: string }
export const useLaudo = () => {
  const baseUrl = useRouterStore().apiUrl
  const userId = useRouterStore().user
  const { token } = useAuth()
  const setup = useSystemStore().setup
  const snMacOs = true

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
  async function get(url: string, body?: object): Promise<responseType> {
    const response = await useHttp(`${baseUrl}/${url}`, { method: 'get', body })
    console.log('get', url, body, response)
    return {
      data: response.data,
      error: response.error
    }
  }
  async function post(url: string, body?: object): Promise<responseType> {
    const response = await useHttp(`${baseUrl}/se1/${url}`, { method: 'post', body, fileUpload: true })
    console.log('post', url, body, response)
    return {
      data: response.data,
      error: response.error
    }
  }
  async function Post(url: string, body?: object): Promise<responseType> {
    const response = await useHttp(`${baseUrl}/${url}`, { method: 'post', body, fileUpload: false })
    console.log('Post', url, body, response)
    return {
      data: response.data,
      error: response.error
    }
  }
  async function doLaudoAbrir(payload: { cd_exame: number, cd_medico: number, cd_fila: number }): Promise<{ data: string, error: string }> {
    const response = await post('doLaudoAbrir', payload)
    return {
      data: response?.data[0]?.bb_laudo,
      error: response.error
    }
  }
  async function doLaudoGravar(payload: {
    cd_exame: number
    cd_medico: number
    bb_laudo?: string
    bb_html: string
    ds_exame?: string
    sn_provisorio?: boolean
  }): Promise<responseType> {
    return await post('doLaudoGravar', payload)
    // const { cd_exame, nr_laudo } = response.data[0]
    // return {
    //   data: { cd_exame, nr_laudo },
    //   error: response.error
    // }
  }
  async function doMedicoToken(): Promise<{ data: { token: string, url: string }, error: string }> {
    const response = await post('doMedicoToken')
    const { token, url } = response.data as any
    return {
      data: { token, url },
      error: response.error
    }
  }
  async function validarCertificado(): Promise<boolean> {
    if (userId.certificado) {
      const response = await doMedicoToken()
      if (!response.data.token) {
        if (response.data.url) {
          window.open(response.data.url + '/autenticarmedico', '_blank', 'noreferrer')
        } else {
          useSystemStore().showError('Url do token não informada !')
        }
      }
      return response.data.token ? true : false
    } else {
      return true
    }
  }
  async function doLaudoDados(cd_exame: number): Promise<responseType> {
    const response = await post('doLaudoDados', { cd_exame })
    if (response.data[0]?.bb_dados)
      response.data[0].bb_dados = Buffer.from(response.data[0].bb_dados, 'base64') // atob(response.data[0].bb_dados)
    return {
      data: response.data[0],
      error: response.error
    }
  }
  function doLaudoAgrupar(cd_exame: number): Promise<responseType> {
    return post('doLaudoAgrupar', { cd_exame })
  }
  async function doLaudoRevisao(cd_atendimento: number): Promise<responseType> {
    const response = await post('doLaudoRevisao', { cd_atendimento })
    return {
      data: response.data[0].cd_exame,
      error: response.error
    }
  }
  async function doLaudoSair(cd_exame: number): Promise<boolean> {
    return !(await post('doLaudoSair', { cd_exame })).error
  }
  async function doLaudoCancelar(payload: { cd_exame: number, cd_motivo?: number, sn_assinatura?: boolean }): Promise<boolean> {
    return !(await post('doLaudoCancelar', payload)).error
  }
  function doLaudoFiltroCancela(): Promise<responseType> {
    return post('doLaudoFiltroCancela')
  }
  async function doLaudoAssinar(payload: {
    cd_exame: number
    cd_medico: number
    cd_tipo?: number
    ds_exame?: string
    sn_remoto?: boolean
    sn_provisorio?: boolean
    bb_html: string
    ds_revisao?: string
    bb_revisao?: string
  }): Promise<responseType> {
    return await post('doLaudoAssinar', payload)
  }
  async function doLaudoAuditar(payload: {
    cd_atendimento: number
    cd_auditoria: number
    bb_auditoria?: string | null
  }): Promise<boolean> {
    return !(await post('doLaudoAuditar', payload)).error
  }
  function doLaudoFiltroTipo(cd_modalidade: number): Promise<responseType> {
    return post('doLaudoFiltroTipo', { cd_modalidade })
  }
  function doLaudoFiltroRevisao(): Promise<responseType> {
    return post('doLaudoFiltroRevisao')
  }
  function doLaudoProximo(): Promise<responseType> {
    return post('doLaudoProximo')
  }
  async function doModeloLayout(cd_exame: number): Promise<responseType> {
    const response = await post('doModeloLayout', { cd_exame })
    return {
      data: response.data[0]?.bb_layout,
      error: response.error
    }
  }
  async function doModeloAbrir(cd_modelo: number): Promise<responseType> {
    const response = await post('doModeloAbrir', { cd_modelo })
    return {
      data: response.data[0]?.bb_modelo,
      error: response.error
    }
  }
  async function carregarModelo(cd_exame: number, cd_modelo: number): Promise<responseType> {
    const [layout, modelo, chave] = await Promise.all([
      doModeloLayout(cd_exame),
      doModeloAbrir(cd_modelo),
      doLaudoModeloChave(cd_modelo, 'modelo')
    ])
    return {
      data: {
        layout: layout?.data?.length ? layout?.data : null,
        modelo: modelo?.data?.length ? modelo?.data : null,
        chave: chave?.data?.length ? chave?.data : null
      },
      error: layout?.error || modelo?.error || chave?.error
    }
  }
  function doModeloLista(payload: { cd_exame: number, sn_todos?: boolean, sn_html?: boolean }): Promise<responseType> {
    return post('doModeloLista', payload)
  }
  function doAchadoLista(): Promise<responseType> {
    return post('doAchadoLista')
  }
  function doComplementoLista(): Promise<responseType> {
    return post('doComplementoLista')
  }
  function autoTexto(): Promise<responseType> {
    return post('xxx')
  }
  function doLaudoFiltroTexto(payload: { cd_exame: number, cd_medico: number, ds_texto: string }): Promise<responseType> {
    return post('doLaudoFiltroTexto', payload)
  }
  // Protocolo
  async function doLaudoPesquisa(nr_controle: number): Promise<responseType> {
    const response = await post('doLaudoLista', { nr_controle })
    return {
      data: response.data[0],
      error: response.error
    }
  }
  // Historico
  function doLaudoLista(cd_paciente: number): Promise<responseType> {
    return post('doLaudoLista', { cd_paciente, sn_assinado: true })
  }
  function doAchadoGravar(payload: { cd_atendimento: number, cd_exame: number, cd_achado: number, ds_descricao: string }): Promise<responseType> {
    payload.ds_descricao = payload.ds_descricao ? btoa(payload.ds_descricao) : ''
    return post('doAchadoGravar', payload)
  }
  function doComplementoGravar(payload: { cd_atendimento: number, cd_complemento: number, bb_complemento: string }): Promise<responseType> {
    payload.bb_complemento = payload.bb_complemento ? btoa(payload.bb_complemento) : ''
    return post('doComplementoGravar')
  }
  function doDicomCompressao(): Promise<responseType> {
    return post('doDicomCompressao')
  }
  async function doLaudoVisualizar(cd_exame: number): Promise<responseType> {
    const response = await post('doLaudoVisualizar', { cd_exame })
    return {
      data: response.data[0]?.bb_laudo ? atob(response.data[0]?.bb_laudo) : '',
      error: response.error
    }
  }
  function doDicomFilme(payload: { cd_atendimento: number, nr_controle?: number, cd_exame?: number }): Promise<responseType> {
    return post('doDicomFilme', payload)
  }
  function doDicomDownloadLink(payload: { cd_atendimento: number, cd_exame: number, cd_filme: number, cd_compressao: number, nr_controle: number, token?: string }): Promise<responseType> {
    payload.token = token.value
    return get('www/doDicomDownloadLink', payload)
  }
  function carregarViewers(): any[] {
    return [
      { icone: 'mdi-image-area', texto: 'Mobile', acao: 'mobile', exibir: setup.sn_dicomvix_mobile },
      { icone: 'mdi-image-area-close', texto: 'Jpeg', acao: 'jpeg', exibir: setup.sn_dicomvix_filme },
      { icone: 'mdi-image-area-close', texto: 'Dicom (Java)', acao: 'weasis', exibir: setup.sn_dicomvix_dicom },
      { icone: 'mdi-image-area-close', texto: 'Dicom (Web)', acao: 'ohif', exibir: setup.sn_dicomvix_dicom },
      { icone: 'mdi-image-area-close', texto: 'Dicom (Radiant)', acao: 'radiant', exibir: setup.sn_dicomvix_dicom },
      { icone: 'mdi-image-area', texto: 'DicomVix Mac', acao: 'osirix', exibir: snMacOs && setup.sn_dicomvix_wado },
      { icone: 'mdi-image-area', texto: 'DicomVix Mac Open', acao: 'osirix-open', exibir: snMacOs && setup.sn_dicomvix_wado },
      { icone: 'mdi-image-area', texto: 'DicomVix Mac Click', acao: 'osirix-onclick', exibir: snMacOs && setup.sn_dicomvix_wado }
    ].filter(item => item.exibir)
  }
  async function doFuncionarioAcesso(payload: string): Promise<boolean> {
    return (await (post('doFuncionarioAcesso', { cd_funcionario: userId.id, ds_form: payload }))).data.length
  }
  async function doLaudoModeloChave(cd_modelo: number, tipo?: string): Promise<responseType> {
    const response = await post('doLaudoModeloChave', { cd_modelo })
    if (response.data.length) {
      return response
    } else if (tipo === 'texto') {
      useSystemStore().showError('Modelo sem texto chave !')
    }
  }
  function doLaudoModeloChaveLista(cd_chave: number): Promise<responseType> {
    return post('doLaudoModeloChaveLista', { cd_chave })
  }
  function doLaudoExternoLista(cd_exame: number): Promise<responseType> {
    return post('doLaudoExternoLista', { cd_exame })
  }
  // imagem.js
  function carregarViewer(): any[] {
    return [
      { icone: 'mdi-image-area', texto: 'Mobile', acao: 'mobile', ativo: setup.sn_dicomvix_mobile },
      { icone: 'mdi-image-area', texto: 'Osirix', acao: 'osirix', ativo: snMacOs && setup.sn_dicomvix_wado },
      { icone: 'mdi-image-area', texto: 'Osirix Open', acao: 'osirix-open', ativo: snMacOs && setup.sn_dicomvix_wado },
      { icone: 'mdi-image-area', texto: 'Osirix Click', acao: 'osirix-onclick', ativo: snMacOs && setup.sn_dicomvix_wado },
      { icone: 'mdi-image-area-close', texto: 'Dicom (Java)', acao: 'weasis', ativo: setup.sn_agenda_dicom },
      { icone: 'mdi-image-area-close', texto: 'Dicom (Web)', acao: 'ohif', ativo: setup.sn_agenda_dicom },
      { icone: 'mdi-image-area-close', texto: 'Jpeg', acao: 'jpeg', ativo: setup.sn_agenda_imagem }
    ].filter(item => item.ativo)
  }
  function downloadRadiant(cd_atendimento: number, cd_exame?: number): Promise<responseType> {
    return post('doJsonRadiant', { cd_atendimento, cd_exame })
  }
  async function urlOhif(cd_atendimento: number, cd_exame?: number): Promise<string> {
    const url = setup.ds_dicomvix_ohif || 'https://pacsviewer.clinux.com.br/local/?json='
    const cgi = setup.sn_dicomvix_ohif ? 'doJsonDownload' : 'doDicomOhif'
    const response = await post('doGetToken', { cd_atendimento, cd_exame })
    return `${url}${baseUrl}/se1/${cgi}?token=${response.data[0]?.token}`
  }
  async function urlMobile(cd_atendimento: number, cd_exame?: number): Promise<string> {
    const url = 'https://mobile.clinux.com.br/?json='
    const response = await post('doGetToken', { cd_atendimento, cd_exame })
    return `${url}${baseUrl}/se1/doDicomOhif?token=${response.data[0]?.token}`
  }
  async function openWado(): Promise<void> {
    const response = await post('doWadoLink')
    if (response.data.length) {
      const downloadURL = `osirix://?methodName=downloadURL&display=true&URL=tmp/${response.data[0]?.url}`
      window.open('osirix://?methodName=CloseAllWindows', '_blank')
      window.open(downloadURL, '_blank')
    }
  }
  function clickOsirix(): Promise<responseType> {
    return post('')
  }
  function openOsirix(): Promise<responseType> {
    return post('')
  }
  function openWeasis(): Promise<responseType> {
    return post('')
  }
  function visualizadorDicom(): Promise<responseType> {
    return post('')
  }
  function doDicomSerie(): Promise<responseType> {
    return post('')
  }
  async function doDicomViewer(payload: { cd_exame: number }): Promise<responseType> {
    const response = await post('doDicomViewer', payload) as any
    return {
      data: response?.data?.arquivo,
      error: response.error
    }
  }
  // editor.js
  async function execMedico(payload: { cd_atendimento: number, cd_medico?: number, cd_sala?: number, cd_modalidade?: number }): Promise<responseType> {
    return await Post('laudo/laudo/exec/acMedico', payload)
  }
  async function execRevisor(payload: { cd_atendimento: number, cd_medico?: number, cd_modalidade?: number }): Promise<responseType> {
    return await Post('laudo/laudo/exec/acRevisor', payload)
  }
  async function execAuditor(payload: { cd_atendimento: number, cd_medico?: number, cd_modalidade?: number }): Promise<responseType> {
    return await Post('laudo/laudo/exec/acAuditor', payload)
  }
  async function execProcedimento(payload: { cd_exame: number, cd_procedimento?: number }): Promise<responseType> {
    return await Post('laudo/laudo/exec/acProcedimento', payload)
  }
  async function execCancelar(payload: { cd_exame: number, cd_motivo?: number }): Promise<responseType> {
    return await Post('laudo/laudo/exec/acCancelar', payload)
  }
  async function execAuditar(payload: { cd_atendimento: number, cd_auditoria?: number, bb_auditado?: string }): Promise<responseType> {
    return await Post('laudo/laudo/exec/acAuditar', payload)
  }
  async function execAchado(payload: { cd_exame: number, cd_achado?: number, bb_achado?: string }): Promise<responseType> {
    payload.bb_achado = payload.bb_achado ? btoa(payload.bb_achado) : ''
    return await Post('laudo/laudo/exec/acAchado', payload)
  }
  async function execPendencia(payload: { cd_atendimento: number, cd_complemento?: number, bb_complemento?: string }): Promise<responseType> {
    payload.bb_complemento = payload.bb_complemento ? btoa(payload.bb_complemento) : ''
    return await Post('laudo/laudo/exec/acPendencia', payload)
  }
  async function execUrgencia(payload: { cd_atendimento: number, cd_urgente?: number }): Promise<responseType> {
    return await Post('laudo/laudo/exec/acUrgencia', payload)
  }
  async function bloquearLayout(): Promise<boolean> {
    const response = await post('doFuncionarioAcesso', { cd_funcionario: userId, ds_form: 'ATE_LAUDO_EXE_CABECALHO' })
    return response.data.length > 0
  }
  function laudoAssinado(payload: { cd_atendimento: number, cd_exame: number, cd_medico?: number, cd_paciente?: number }): Promise<responseType> {
    return useHttp(`${baseUrl}/laudo/laudo?filename=laudo.pdf&cmd=acAssinado`, { method: 'post', body: payload, fileDownload: true })
  }
  return {
    laudoAssinado,
    bloquearLayout,
    execMedico,
    execRevisor,
    execAuditor,
    execProcedimento,
    execCancelar,
    execAuditar,
    execAchado,
    execPendencia,
    execUrgencia,
    //
    carregarViewer,
    downloadRadiant,
    urlOhif,
    urlMobile,
    openWado,
    clickOsirix,
    openOsirix,
    openWeasis,
    visualizadorDicom,
    doDicomSerie,
    doDicomViewer,
    //
    getModalidade,
    getEmpresa,
    getMedico,
    getModalidades,
    getEmpresas,
    getMedicos,
    validarCertificado,
    doMedicoToken,
    doLaudoAbrir,
    doLaudoGravar,
    doLaudoDados,
    doLaudoAgrupar,
    doLaudoRevisao,
    doLaudoSair,
    doLaudoCancelar,
    doLaudoFiltroCancela,
    doLaudoAssinar,
    doLaudoAuditar,
    doLaudoFiltroTipo,
    doLaudoFiltroRevisao,
    doLaudoProximo,
    doModeloLayout,
    doModeloAbrir,
    carregarModelo,
    doModeloLista,
    doAchadoLista,
    doComplementoLista,
    autoTexto,
    doLaudoFiltroTexto,
    doLaudoPesquisa,
    doLaudoLista,
    doAchadoGravar,
    doComplementoGravar,
    doDicomCompressao,
    doLaudoVisualizar,
    doDicomFilme,
    doDicomDownloadLink,
    carregarViewers,
    doFuncionarioAcesso,
    doLaudoModeloChave,
    doLaudoModeloChaveLista,
    doLaudoExternoLista,
    ...useBaseStore('/laudo/laudo')
  }
}
