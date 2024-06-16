export const useHttp = async (
  url: string,
  {
    method = 'get',
    body = {},
    fileUpload = false,
    fileDownload = false
  }: {
    method?: 'get' | 'post' | 'put' | 'delete'
    body?: object
    headers?: HeadersInit
    fileUpload?: boolean
    fileDownload?: boolean
  } = { method: 'get' }
) => {
  let params: FormData | string = JSON.stringify(body)

  if (fileUpload) {
    const formData = new FormData()
    Object.keys(body).forEach(key => formData.append(key, body[key]))
    params = formData
  }

  useSystemStore()?.startLoading()
  try {
    const response = await useAPI(url, {
      method,
      body: method === 'get' ? undefined : params,
      headers: fileUpload
        ? new Headers()
        : { 'Content-Type': fileDownload ? 'application/octet-stream' : 'application/json' },
      responseType: fileDownload ? 'blob' : 'json'
    })
    return {
      data: response,
      error: null,
      status: 'success'
    }
  } catch (e) {
    useMessage().showError(e?.response?._data?.error || 'Erro de conexão com o servidor')
    return {
      data: null,
      error: e?.response?._data,
      status: 'error'
    }
  } finally {
    useSystemStore()?.finishLoading()
  }
}
