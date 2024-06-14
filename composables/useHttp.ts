// interface DataResponse {
//   data: any
//   meta: any
// }

export const useHttp = async (
  url: string,
  {
    method = 'get',
    body = {},
    headers = new Headers(useRequestHeaders(['cookie']) as HeadersInit),
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
  // const { token } = useAuthStore()
  // const data: DataResponse = { data: null, meta: null }
  // const error = null
  // const success = false
  const initHeaders = new Headers(headers)
  // const initHeaders = new Headers(useRequestHeaders(['cookie']) as HeadersInit)
  let params: FormData | string = JSON.stringify(body)

  // if (!initHeaders.has('Content-Type')) {
  //   initHeaders.append('Content-Type', 'application/json')
  // }
  // if (token.value) {
  //   initHeaders.append('Authorization', token.value)
  // }
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
    // responseType: fileDownload ? 'blob' : 'json',
    body: method.toUpperCase() === 'GET' ? undefined : params
  }
  // console.log('useHttp', url, options)
  useSystemStore()?.startLoading()
  try {
    const response = await useAPI(url, {
      // baseURL: process.env.NUXT_PUBLIC_API_URL,
      method: options.method,
      body: options.body,
      headers: options.headers,
      responseType: fileDownload ? 'blob' : 'json'
    })
    // if (response) {
    //   const res = !fileDownload ? await response.json() : await response.blob()
    //   data = res
    //   success = true
    // } else {
    //   // Throw an error with status code and message
    //   const res = response ? await response.json() : { error: 'Erro de conexão com o servidor' }
    //   data = null
    //   error = res
    //   success = false
    // }
    // if (error.value)
    //   useSystemStore()?.showError(error.value.message || 'Erro de conexão com o servidor')
    // console.log('useHttp 2', response)
    return {
      data: response,
      error: null,
      status: 'success'
    }
  } catch (e) {
    useMessage().showError(e?.response?._data || 'Erro de conexão com o servidor')
    return {
      data: null,
      error: e?.response?._data,
      status: 'error'
    }
  } finally {
    useSystemStore()?.finishLoading()
  }
}
