import { useModalidade } from '../gerencial/useModalidade'
import { useMedico } from '../gerencial/useMedico'
import { useEmpresa } from '../gerencial/useEmpresa'
// import { useModelo } from '../gerencial/useModelo'

export const useLaudo = () => {
  // const baseUrl = 'https://sedi2.zapto.org/dwcluster'
  // const userId = useRouterStore().user
  // const { token } = useAuthStore()
  const setup = useSystemStore().setup
  const snMacOs = true

  async function getMedicos(cd_modalidade: number) {
    return getFieldList(await useMedico().find('modalidade', { cd_modalidade }))
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
  async function get(url: string, body?: object) {
    return await useHttp(url, { method: 'get', body })
  }
  async function post(url: string, body?: object) {
    return await useHttp(`se1/${url}`, { method: 'post', body, fileUpload: true })
  }
  async function Post(url: string, body?: object) {
    return await useHttp(`${url}`, { method: 'post', body, fileUpload: false })
  }
  async function doLaudoAbrir(payload: { cd_exame: number, cd_fila: number, ds_exame?: string }) {
    const response = await post('doLaudoAbrir', payload)
    return {
      data: response.data ? Decode64(response?.data[0]?.bb_laudo) : '',
      error: response.error
    }
  }
  async function doLaudoGravar(payload: {
    cd_exame: number
    bb_laudo?: string
    bb_html: string
    ds_exame?: string
    sn_provisorio?: boolean
  }) {
    return await post('doLaudoGravar', payload)
  }
  async function doMedicoViewer() {
    const id = useAuthStore().user.idmedico
    if (id)
      return await useMedico().get(id, 'ds_viewer')
  }
  async function doMedicoToken(): Promise<{ data: { token: string, url: string }, error: string }> {
    return await post('doMedicoToken')
    // const { token, url } = data as any
    // return {
    //   data: { token, url },
    //   error: error.message
    // }
  }
  async function validarCertificado(): Promise<boolean> {
    if (!useAuthStore().user.certificado)
      return true

    const response = await doMedicoToken()

    if (response.data.token)
      return true

    if (response.data.url)
      window.open(response.data.url + '/autenticarmedico', '_blank', 'noreferrer')
    else
      useMessage().showError('Url do certificado não informado !')

    return false
  }
  async function doLaudoDados(cd_exame: number) {
    const response = await post('doLaudoDados', { cd_exame })
    return response ? response.data[0] : null
  }
  async function doLaudoAgrupar(cd_exame: number) {
    return await post('doLaudoAgrupar', { cd_exame })
  }
  async function doLaudoRevisao(cd_atendimento: number) {
    const response = await post('doLaudoRevisao', { cd_atendimento })
    return {
      data: response.data[0]?.cd_exame,
      error: response.error
    }
  }
  async function doLaudoSair(cd_exame: number): Promise<boolean> {
    return !(await post('doLaudoSair', { cd_exame })).error
  }
  async function doLaudoCancelar(payload: { cd_exame: number, cd_motivo?: number, sn_assinatura?: boolean }): Promise<boolean> {
    return !(await post('doLaudoCancelar', payload)).error
  }
  async function doLaudoFiltroCancela() {
    return await post('doLaudoFiltroCancela')
  }
  async function doLaudoAssinar(payload: {
    cd_exame: number
    cd_tipo?: number
    ds_exame?: string
    sn_remoto?: boolean
    sn_provisorio?: boolean
    bb_html: string
    ds_revisao?: string
    bb_revisao?: string
  }) {
    return await post('doLaudoAssinar', payload)
  }
  async function doLaudoAuditar(payload: {
    cd_atendimento: number
    cd_auditoria: number
    bb_auditoria?: string | null
  }): Promise<boolean> {
    return !(await post('doLaudoAuditar', payload)).error
  }
  async function doLaudoFiltroTipo(cd_modalidade: number) {
    return await post('doLaudoFiltroTipo', { cd_modalidade })
  }
  async function doLaudoFiltroRevisao() {
    return await post('doLaudoFiltroRevisao')
  }
  async function doLaudoProximo(): Promise<{ cd_exame: number, cd_atendimento: number }> {
    const response = await post('doLaudoProximo')
    return response?.data[0]
  }
  async function doModeloLayout(cd_exame: number) {
    const response = await post('doModeloLayout', { cd_exame })
    return Decode64(response.data[0]?.bb_layout)
  }
  async function doModeloAbrir(cd_modelo: number) {
    const response = await post('doModeloAbrir', { cd_modelo })
    return Decode64(response.data[0]?.bb_modelo)
  }
  async function carregarModelo(cd_exame: number, cd_modelo: number) {
    const [layout, modelo] = await Promise.all([
      doModeloLayout(cd_exame),
      doModeloAbrir(cd_modelo)
    ])
    return {
      layout,
      modelo
    }
  }
  async function doModeloLista(payload: { cd_exame: number, sn_todos?: boolean, sn_html?: boolean }) {
    return await post('doModeloLista', payload)
  }
  async function doAchadoLista() {
    return await post('doAchadoLista')
  }
  async function doComplementoLista() {
    return await post('doComplementoLista')
  }
  async function autoTexto() {
    return await post('xxx')
  }
  async function doLaudoFiltroTexto(payload: { cd_exame: number, ds_texto: string }) {
    return await post('doLaudoFiltroTexto', payload)
  }
  // Protocolo
  async function doLaudoPesquisa(nr_controle: number) {
    const response = await post('doLaudoLista', { nr_controle })
    return {
      data: response.data[0],
      error: response.error
    }
  }
  // Historico
  async function doLaudoLista(cd_paciente: number) {
    return await post('doLaudoLista', { cd_paciente, sn_assinado: true })
  }
  async function doAchadoGravar(payload: { cd_atendimento: number, cd_exame: number, cd_achado: number, ds_descricao: string }) {
    payload.ds_descricao = payload.ds_descricao ? Encode64(payload.ds_descricao) : ''
    return await post('doAchadoGravar', payload)
  }
  async function doComplementoGravar(payload: { cd_atendimento: number, cd_complemento: number, bb_complemento: string }) {
    payload.bb_complemento = payload.bb_complemento ? Encode64(payload.bb_complemento) : ''
    return await post('doComplementoGravar')
  }
  async function doDicomCompressao() {
    return await post('doDicomCompressao')
  }
  async function doLaudoVisualizar(cd_exame: number) {
    const response = await post('doLaudoVisualizar', { cd_exame })
    return {
      data: response.data[0]?.bb_laudo ? Decode64(response.data[0]?.bb_laudo) : '',
      error: response.error
    }
  }
  async function doDicomFilme(payload: { cd_atendimento: number, nr_controle?: number, cd_exame?: number }) {
    return await post('doDicomFilme', payload)
  }
  function doDicomDownloadLink(payload: { cd_atendimento: number, cd_exame: number, cd_filme: number, cd_compressao: number, nr_controle: number, token?: string }) {
    payload.token = useAuthStore().token
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
    const response = await (post('doFuncionarioAcesso', { cd_funcionario: useAuthStore().user.id, ds_form: payload })) as any
    return !response.error && response.data.length > 0
  }
  async function doLaudoModeloChave(cd_modelo: number, tipo?: string) {
    const response = await (post('doLaudoModeloChave', { cd_modelo })) as any
    if (!response.data && !response.error && tipo === 'texto')
      useMessage().showError('Modelo sem texto chave !')
    return response
  }
  async function doLaudoModeloChaveLista(cd_chave: number) {
    return await post('doLaudoModeloChaveLista', { cd_chave })
  }
  async function doLaudoExternoLista(cd_exame: number) {
    return await post('doLaudoExternoLista', { cd_exame })
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
  async function downloadRadiant(cd_atendimento: number, cd_exame?: number) {
    return await post('doJsonRadiant', { cd_atendimento, cd_exame })
  }
  async function urlOhif(cd_atendimento: number, cd_exame?: number): Promise<string> {
    const url = setup.ds_dicomvix_ohif || 'https://pacsviewer.clinux.com.br/local/?json='
    const cgi = setup.sn_dicomvix_ohif ? 'doJsonDownload' : 'doDicomOhif'
    const response = await post('doGetToken', { cd_atendimento, cd_exame })
    return `${url}se1/${cgi}?token=${response.data[0]?.token}`
  }
  async function urlMobile(cd_atendimento: number, cd_exame?: number): Promise<string> {
    const url = 'https://mobile.clinux.com.br/?json='
    const response = await post('doGetToken', { cd_atendimento, cd_exame })
    return `${url}se1/doDicomOhif?token=${response.data[0]?.token}`
  }
  async function openWado(): Promise<void> {
    const response = await post('doWadoLink')
    if (response.data[0]) {
      const downloadURL = `osirix://?methodName=downloadURL&display=true&URL=tmp/${response.data[0]?.url}`
      window.open('osirix://?methodName=CloseAllWindows', '_blank')
      window.open(downloadURL, '_blank')
    }
  }
  async function clickOsirix() {
    return await post('')
  }
  async function openOsirix() {
    return await post('')
  }
  async function openWeasis() {
    return await post('')
  }
  async function visualizadorDicom() {
    return await post('')
  }
  async function doDicomSerie() {
    return await post('')
  }
  async function doDicomViewer(payload: { cd_exame: number }) {
    const response = await post('doDicomViewer', payload) as any
    return {
      data: response?.data?.arquivo,
      error: response.error
    }
  }
  // editor.js
  async function execMedico(payload: { cd_atendimento: number, cd_medico?: number, cd_sala?: number, cd_modalidade?: number }) {
    return await Post('laudo/laudo/exec/acMedico', payload)
  }
  async function execRevisor(payload: { cd_atendimento: number, cd_medico?: number, cd_modalidade?: number }) {
    return await Post('laudo/laudo/exec/acRevisor', payload)
  }
  async function execRevisao(payload: { cd_atendimento: number, cd_medico?: number, cd_modalidade?: number }) {
    return await Post('laudo/laudo/exec/acRevisao', payload)
  }
  async function execAuditor(payload: { cd_atendimento: number, cd_medico?: number, cd_modalidade?: number }) {
    return await Post('laudo/laudo/exec/acAuditor', payload)
  }
  async function execProcedimento(payload: { cd_exame: number, cd_procedimento?: number }) {
    return await Post('laudo/laudo/exec/acProcedimento', payload)
  }
  async function execCancelar(payload: { cd_exame: number, cd_motivo?: number }) {
    return await Post('laudo/laudo/exec/acCancelar', payload)
  }
  async function execAuditar(payload: { cd_atendimento: number, cd_auditoria?: number, bb_auditado?: string }) {
    return await Post('laudo/laudo/exec/acAuditar', payload)
  }
  async function execAchado(payload: { cd_exame: number, cd_achado?: number, bb_achado?: string }) {
    payload.bb_achado = payload.bb_achado ? Encode64(payload.bb_achado) : ''
    return await Post('laudo/laudo/exec/acAchado', payload)
  }
  async function execPendencia(payload: { cd_atendimento: number, cd_complemento?: number, bb_complemento?: string }) {
    payload.bb_complemento = payload.bb_complemento ? Encode64(payload.bb_complemento) : ''
    return await Post('laudo/laudo/exec/acPendencia', payload)
  }
  async function execUrgencia(payload: { cd_atendimento: number, cd_urgente?: number }) {
    return await Post('laudo/laudo/exec/acUrgencia', payload)
  }
  async function execProcedencia(payload: { cd_atendimento: number, cd_procedencia?: number }) {
    return await Post('laudo/laudo/exec/acProcedencia', payload)
  }
  async function bloquearLayout(): Promise<boolean> {
    const { data, error } = await post('doFuncionarioAcesso', { ds_form: 'ATE_LAUDO_EXE_CABECALHO' }) as any
    return !error && data.length > 0
  }
  async function laudoAssinado(payload: { cd_atendimento: number, cd_exame: number, cd_paciente?: number }) {
    return await useHttp(`laudo/laudo?filename=laudo.pdf&cmd=acAssinado`, { method: 'post', body: payload, fileDownload: true })
  }
  async function doChatLista(payload: { cd_atendimento: number, sn_medico?: boolean }) {
    return await post('doChatLista', payload)
  }
  async function doChatApagar(payload: { cd_codigo: number }) {
    return await post('doChatApagar', payload)
  }
  async function doChatGravar(payload: { cd_atendimento: number, ds_mensagem: string, sn_medico: boolean }) {
    return await post('doChatGravar', { js_tabela: Encode64(JSON.stringify(payload)) })
  }
  async function doComplementoFim(payload: { cd_atendimento: number, bb_complemento: string }) {
    return await post('doComplementoFim', payload)
  }
  return {
    doChatLista,
    doChatGravar,
    doChatApagar,
    doComplementoFim,
    //
    laudoAssinado,
    bloquearLayout,
    execMedico,
    execRevisor,
    execRevisao,
    execAuditor,
    execProcedimento,
    execCancelar,
    execAuditar,
    execAchado,
    execPendencia,
    execUrgencia,
    execProcedencia,
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
    doMedicoViewer,
    doLaudoModeloChave,
    doLaudoModeloChaveLista,
    doLaudoExternoLista,
    ...useBaseStore('/laudo/laudo')
  }
}
