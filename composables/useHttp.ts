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
    fileUpload = false
  }: {
    method?: string
    body?: object
    headers?: HeadersInit
    fileUpload?: boolean
  } = { method: 'get' }
) => {
  console.log('useHttp', url)
  const config = useRuntimeConfig()
  const token = useCookie('token', {
    domain: config.public.apiBaseURL
  })
  let data: DataResponse = { data: null, meta: null }
  let error = null
  let success = false
  const initHeaders = new Headers(headers)
  let params: FormData | string = JSON.stringify(body)

  if (!initHeaders.has('Content-Type')) {
    initHeaders.append('Content-Type', 'application/json')
  }
  if (token.value) {
    initHeaders.append('Authorization', `Bearer ${token.value}`)
  }
  if (fileUpload) {
    initHeaders.set('Content-Type', 'multipart/form-data')
    const formData = new FormData()
    for (const key of Object.keys(body) as Array<keyof typeof body>) {
      formData.append(key, body[key])
    }
    params = formData
  }

  const options = {
    method,
    headers: initHeaders,
    body: method.toUpperCase() === 'GET' ? undefined : params
  }

  try {
    const response = await fetch(url, options)

    // wait for the response to be parsed as JSON
    if (response.ok) {
      const res = await response.json()
      data = res
      success = true
    } else {
      // Throw an error with status code and message
      const res = await response.json()
      error = res
      success = false
    }
  } catch (error) {
    success = false
  }
  return {
    data,
    error,
    success
  }
}