interface DataResponse {
  data: any
  meta: any
}

export const useHttp = async (
  url: string,
  {
    method = 'get',
    body = {},
    headers = {},
    fileUpload = false,
    fileDownload = false
  }: {
    method?: string
    body?: object
    headers?: HeadersInit
    fileUpload?: boolean
    fileDownload?: boolean
  } = { method: 'get' }
) => {
  const { token } = useAuthStore()
  let data: DataResponse = { data: null, meta: null }
  let error = null
  let success = false
  const initHeaders = new Headers(headers)
  let params: FormData | string = JSON.stringify(body)

  // if (!initHeaders.has('Content-Type')) {
  //   initHeaders.append('Content-Type', 'application/json')
  // }
  if (token.value) {
    initHeaders.append('Authorization', token.value)
  }
  if (fileUpload) {
    // initHeaders.set('Content-Type', 'multipart/form-data')
    const formData = new FormData()
    // for (const key of Object.keys(body) as Array<keyof typeof body>) {
    //   formData.append(key, body[key])
    // }
    Object.keys(body).forEach(key => formData.append(key, body[key]))
    params = formData
  }
  if (fileDownload) {
    initHeaders.set('Content-Type', 'application/octet-stream')
  }
  const options = {
    method,
    headers: initHeaders,
    responseType: fileDownload ? 'blob' : 'json',
    body: method.toUpperCase() === 'GET' ? undefined : params
  }
  useSystemStore()?.startLoading()
  try {
    const response = await fetch(url, options)
    // wait for the response to be parsed as JSON
    if (response?.ok) {
      const res = !fileDownload ? await response.json() : await response.blob()
      data = res
      success = true
    } else {
      // Throw an error with status code and message
      const res = response ? await response.json() : { error: 'Erro de conexão com o servidor' }
      data = null
      error = res
      success = false
    }
    if (!success) {
      useSystemStore()?.showError(error.error || 'Erro de conexão com o servidor')
    }
  } catch (e) {
    console.error(e)
    useSystemStore()?.showError(e || 'Erro desconhecido')
  } finally {
    useSystemStore()?.finishLoading()
  }

  return {
    data,
    error,
    success
  }
}
