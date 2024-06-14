export const useBaseStore = (
  url: string
  // items: any,
  // grid: any,
  // menu: any,
  // meta: any,
  // item: any,
  // status: any,
  // errors: any
) => {
  function queryToUrl(query: any) {
    return Object.keys(query).map(key => `${key}=${query[key]}`).join('&')
  }
  function generateApiUrl(query: any, _url?: string) {
    _url = typeof query === 'string' ? query : _url
    const tempURL = _url ? `${url}/${_url}` : url
    let urlParam = ''

    if (query && typeof query === 'object') {
      urlParam = `?${queryToUrl(query)}`
    }

    const api_url = `${tempURL}${
      (query === undefined && query !== null) || Object.keys(query).length === 0
        ? ''
        : urlParam
    }`
    return api_url
  }
  const getView = async (body: any) => {
    const { data } = await useHttp(`${url}/view`, { method: 'post', body })
    return data
  }
  const getAll = async (query?: any, _url?: string) => {
    // query params
    const { data } = await useHttp(generateApiUrl(query, _url), { method: 'get' })
    return data
  }

  const create = async (body: any, _url?: string) => {
    const { data } = await useHttp(`${url}`, { method: 'post', body })
    return data
  }

  const get = async (id: number, fields?: string) => {
    const { data } = await useHttp(`${url}/${id}?fields=${fields}`, { method: 'get' })
    return data
  }

  const remove = async (id: number) => {
    const { data } = await useHttp(`${url}/${id}`, { method: 'delete' })
    return data
  }

  const update = async (id: string | number, body: any, _url?: string) => {
    const { data } = await useHttp(`${url}/${id}`, { method: 'put', body })
    return data
  }

  const getGrid = async () => {
    const { data } = await useHttp(`${url}/grid`)
    return useGrid().getCols(data as any)
  }

  const sendHttp = async (payload: any, method: any, body?: any) => {
    const { data } = await useHttp(`${url}/${payload}`, { method, body })
    return data
  }

  const Post = async (payload: string, body?: any): Promise<any> => {
    return await sendHttp(payload, 'post', body)
  }

  const Get = async (payload: string, body?: any): Promise<any> => {
    return await sendHttp(payload, 'get', generateApiUrl(body))
  }

  const find = async (payload: string, body?: any) => {
    return await Post(`find/${payload}`, body)
  }

  const exec = async (payload: string, body?: any) => {
    return await Post('exec/' + payload, body)
  }

  const getState = async (body: any) => {
    const response = await Post('state', body)
    return response?.bb_grid ? JSON.parse(atob(response.bb_grid)) : null
  }

  const getMenu = async () => {
    return await Get('menu')
  }

  const getLog = async (id: number) => {
    return await Get(`log/${id}`)
  }

  const getList = async () => {
    return await Get('list')
  }
  const download = async (id: number, fieldname: string, filename: string) => {
    return await useHttp(`${url}/${id}?fieldname=${fieldname}&filename=${filename}`, {
      method: 'put',
      fileDownload: true,
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    })
  }

  return {
    remove,
    create,
    update,
    get,
    getAll,
    getLog,
    getGrid,
    getState,
    getList,
    getView,
    getMenu,
    find,
    exec,
    download
  }
}
