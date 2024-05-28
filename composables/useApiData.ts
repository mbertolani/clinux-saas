import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

const auth = useAuth()
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
    Authorization: auth.token.value ? auth.token.value : '',
    ...options?.headers
  }
})
