export const useHttpData = (
  url: string,
  items: any,
  grid: any,
  meta: any,
  item: any,
  status: any,
  errors: any
) => {
  /**
   * This asynchronous function sends a GET request to the API to retrieve all items.
   *
   * @param query - An optional parameter, can be used to specify a specific API query.
   * @param _url - An optional parameter, can be used to specify a specific API endpoint.
   *
   * The method uses the `useHttp` function to send a GET request to the appropriate API endpoint,
   * constructed using the `generateApiUrl` function with provided `query` and `_url`.
   *
   * The response from the request is awaited and then used to update the status.
   * If the retrieval operation was successful, the value of `items` and possibly `meta`
   * (if the query included pagination) is updated with the response data.
   */
  const getAll = async (query?: any, _url?: string) => {
    const { data, error, success } = await useHttp(generateApiUrl(query, _url), {
      method: 'get'
    })
    // Update the value of status based on the success of the response
    status.value = success
    errors.value = error

    // If the retrieval operation was successful
    if (success) {
      // If pagination was included in the query, update 'items' with the data and 'meta' with the pagination info
      if (query !== undefined && 'page' in query) {
        items.value = data.data
        meta.value = data.meta
      } else {
        // If pagination was not included in the query, update 'items' with the entire response data
        items.value = data
      }
    } else {
      items.value = []
    }
  }

  /**
   * This asynchronous function sends a POST request to the API to create a new item.
   *
   * @param body - The data for the new item to be sent in the request body.
   * @param _url - An optional parameter, can be used to specify a specific API endpoint.
   *
   * The method uses the `useHttp` function to send a POST request to the appropriate API endpoint,
   * constructed using the provided `_url` and `body`.
   *
   * The response from the request is awaited and then used to update the status.
   * If the creation operation was successful, the value of `item` is updated with the response data,
   * and the new item is also pushed into the `items` array.
   */
  const create = async (body: any, _url?: string) => {
    const { data, error, success } = await useHttp(`${generateApiUrl(_url)}`, {
      method: 'post',
      body
    })

    // Update the value of status based on the success of the response
    status.value = success
    errors.value = error
    item.value = success ? data : null
    items.value.push(data)
  }

  /**
   * This asynchronous function sends a GET request to the API to retrieve a specific item.
   *
   * @param url - The base URL of the API to interact with.
   * @param id - The ID of the item to be retrieved.
   *
   * The method uses the `useHttp` function to send a GET request to the appropriate API endpoint,
   * constructed using the provided `url` and `id`.
   *
   * The response from the request is awaited and then used to update the status
   * and potentially the item value, if the retrieval operation was successful.
   */
  const get = async (id: number, fields?: string) => {
    const { data, error, success } = await useHttp(`${url}/${id}?fields=${fields}`, {
      method: 'get'
    })

    // Update the value of status based on the success of the response
    status.value = success
    errors.value = error
    // If the retrieval operation was successful, update the value of item with the response data
    item.value = success ? data : null
  }

  /**
   * This asynchronous function sends a DELETE request to the API to remove a specific item.
   *
   * @param id - The ID of the item to be removed.
   *
   * The method uses the `useHttp` function to send a DELETE request to the appropriate API endpoint,
   * constructed using the provided `url` and `id`.
   *
   * The function returns the Promise returned by the `useHttp` function, allowing the caller to handle
   * the success or failure of the request.
   */
  const remove = async (id: number) => {
    const { data, error, success } = await useHttp(`${url}/${id}`, { method: 'delete' })
    status.value = success
    errors.value = error
    item.value = success ? data : null
  }

  /**
   * This asynchronous function sends a PUT request to the API to update a specific item.
   *
   * @param id - The ID of the item to be updated. Can be of type string or number.
   * @param body - The data for the new item to be sent in the request body.
   * @param _url - An optional parameter, can be used to specify a specific API endpoint.
   *
   * The response from the request is awaited and then used to update the status
   * and potentially the item value, if the update operation was successful.
   */
  const update = async (id: string | number, body: any, _url?: string) => {
    const { data, error, success } = await useHttp(`${url}/${id}`, {
      method: 'put',
      body
    })

    // Update the value of status based on the success of the response
    status.value = success
    errors.value = error
    item.value = success ? data : null
  }

  /**
   * Generates a URL for an API request.
   *
   * @param query - Query parameters for the API request. It can be a string or an object.
   * @param _url - An optional parameter, can be used to specify a specific endpoint.
   * If 'query' is a string, it's treated as the URL. If 'query' is an object,
   * it's converted into URL parameters.
   *
   * The resulting URL is composed of the base URL, the specified endpoint,
   * and any query parameters, separated by slashes.
   *
   * @returns {string} - The generated API URL.
   */
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

  const getGrid = async () => {
    grid.value = await useGrid(url).getCols()
    return grid.value
  }

  const sendHttp = async (payload: any, method: string, body?: any) => {
    const { data, error, success } = await useHttp(`${url}/${payload}`, {
      method,
      body
    })
    status.value = success
    errors.value = error
    // item.value = success ? data : null
    // items.value.push(data)
    return success ? data : error
  }

  const Post = async (payload: string, body?: any) => {
    return sendHttp(payload, 'post', body)
  }

  const Get = async (payload: string, body?: any) => {
    return sendHttp(payload, 'get', generateApiUrl(body))
  }

  const find = async (body: any) => {
    return await Post('find', body)
  }

  const exec = async (body: any) => {
    return await Post('exec', body)
  }

  const gridState = async (body: any) => {
    const response = await Post('state', body)
    return response?.bb_grid ? useNuxtApp().$base64ToJson(response?.bb_grid) : null
  }

  const menu = async () => {
    return await Get('menu')
  }

  const log = async () => {
    return await Get('log')
  }

  return {
    status,
    errors,
    getGrid,
    getAll,
    remove,
    create,
    update,
    get,
    log,
    find,
    exec,
    gridState,
    menu
  }
}
