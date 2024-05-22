import type { UseFetchOptions } from 'nuxt/app'

export function useCustomFetch<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api
  })
}

// export function $api<T> (
//   request: Parameters<typeof $fetch<T>>[0],
//   options?: Parameters<typeof $fetch<T>>[1]
// ) {
//   const userAuth = useCookie('token')

//   return $fetch<T>(request, {
//     ...options,
//     headers: {
//       Authorization: userAuth.value ? `Bearer ${userAuth.value}` : '',
//       ...options?.headers
//     }
//   })
// }
