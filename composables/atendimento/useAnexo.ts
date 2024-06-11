type responseType = { data: any, error: string }
export const useAnexo = (id: number) => {
  const baseUrl = useRouterStore().apiUrl
  const useBase = useBaseStore(`/atendimento/atendimento/${id}/documento`)
  async function post(url: string, body?: object): Promise<responseType> {
    const response = await useHttp(`${baseUrl}/se1/${url}`, { method: 'post', body, fileUpload: true })
    console.log('post', url, body, response)
    return {
      data: response.data,
      error: response.error
    }
  }
  async function doAnexoLista(payload: { cd_atendimento: number }): Promise<responseType> {
    return await post('doLaudoFiltroScanner', payload)
  }
  async function doAnexoSalvar(payload: { cd_atendimento: number, cd_tipo?: number, bb_arquivo: string, ds_arquivo: string }): Promise<responseType> {
    console.log('doAnexoSalvar', payload)
    return await post('doAnexoSalvar', payload)
  }
  async function doAnexoDownload(cd_documento: number): Promise<any> {
    const data = await useBase.api.get(cd_documento, 'ds_arquivo')
    const response = await useBase.api.download(cd_documento, 'bb_documento', data.ds_arquivo)
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
