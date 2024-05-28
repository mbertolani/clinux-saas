import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

export const useApiData = async <
    DefaultT = unknown,
    DefaultR extends NitroFetchRequest = NitroFetchRequest,
    T = DefaultT,
    R extends NitroFetchRequest = DefaultR,
    O extends NitroFetchOptions<R> = NitroFetchOptions<R>
  >(
  url: R,
  options?: O
) => $fetch<T>(url, {
  ...options,
  headers: {
    Authorization: useAuth().token.value ? useAuth().token.value : '',
    ...options?.headers
  }
})
