// type responseType = { data: any, error: string }
export const useAnexo = (cd_atendimento: number) => {
  // const baseUrl = 'https://sedi2.zapto.org/dwcluster'
  const useBase = useBaseStore(`/atendimento/atendimento/${cd_atendimento}/documento`)
  async function post(url: string, body?: object) {
    return await useHttp(`se1/${url}`, { method: 'post', body, fileUpload: true })
  }
  async function doAnexoLista() {
    return await post('doLaudoFiltroScanner', { cd_atendimento })
  }
  async function doAnexoSalvar(payload: { cd_atendimento, cd_tipo?: number, bb_arquivo: string, ds_arquivo: string }) {
    return await post('doAnexoSalvar', payload)
  }
  async function doAnexoDownload(cd_documento: number): Promise<any> {
    const data = await useBase.get(cd_documento, 'ds_arquivo') as any
    const response = await useBase.getBlob(cd_documento, 'bb_documento', data.ds_arquivo)
    return {
      stream: response,
      filename: data.ds_arquivo
    }
  }
  return {
    doAnexoLista,
    doAnexoSalvar,
    doAnexoDownload,
    ...useBase
  }
}
