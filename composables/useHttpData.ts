// import { build } from 'nuxt'
// import { Data } from '~/types/generated'

export const useHttpData = (
  url: string,
  items: any,
  meta: any,
  item: any,
  status: any,
  errors: object
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
    const response = await useHttp(generateApiUrl(query, _url), {
      method: 'get'
    })

    // Update the value of status based on the success of the response
    status.value = response.success

    // If the retrieval operation was successful
    if (response.success) {
      // If pagination was included in the query, update 'items' with the data and 'meta' with the pagination info
      if (query !== undefined && 'page' in query) {
        items.value = response.data.data
        meta.value = response.data.meta
      } else {
        // If pagination was not included in the query, update 'items' with the entire response data
        items.value = response.data
      }
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
    const response = await useHttp(`${generateApiUrl(_url)}`, {
      method: 'post',
      body
    })

    // Update the value of status based on the success of the response
    status.value = response.success

    // If the creation operation was successful, update the value of item and push the new item to items array
    if (response.success) {
      item.value = response.data
      items.value.push(response.data)
    }
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
  const get = async (url: string, id: number) => {
    const response = await useHttp(`${url}/${id}`, {
      method: 'get'
    })

    // Update the value of status based on the success of the response
    status.value = response.success

    // If the retrieval operation was successful, update the value of item with the response data
    if (response.success) {
      item.value = response.data
    }
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
    return await useHttp(`${url}/${id}`, {
      method: 'delete'
    })
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
    const response = await useHttp(`${generateApiUrl(_url)}/${id}`, {
      method: 'put',
      body
    })

    // Update the value of status based on the success of the response
    status.value = response.success

    // If the update operation was successful, update the value of item with the response data
    if (response.success) {
      item.value = response.data
    }
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
  function generateApiUrl(query: any, _url?: string) {
    _url = typeof query === 'string' ? query : _url
    const tempURL = _url ? `${url}/${_url}` : url
    let urlParam = ''

    if (query && typeof query === 'object') {
      urlParam = `?${useQueryToUrl(query)}`
    }

    const api_url = `${tempURL}${
      (query === undefined && query !== null) || Object.keys(query).length === 0
        ? ''
        : urlParam
    }`
    return api_url
  }

  return {
    status,
    errors,
    getAll,
    remove,
    create,
    update,
    get
  }
}
