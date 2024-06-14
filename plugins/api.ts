// used $fetch as server/api and useFetch as client/api (pages/components)
// You can use $fetch in any methods that are executed only on client-side.
// Nuxt uses ofetch to expose globally the $fetch helper

// During SSR data is fetched twice, once on the server and once on the client.
// const dataTwice = await $fetch('/api/item')

// During SSR data is fetched only on the server side and transferred to the client.
// const { data } = await useAsyncData('item', () => $fetch('/api/item'))

// You can also useFetch as shortcut of useAsyncData + $fetch
// const { data } = await useFetch('/api/item')

// https://stackoverflow.com/questions/73354780/nuxt-3-how-to-add-default-parameters-and-headers-to-fetch

// import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
// const $customFetch = async <
//     DefaultT = unknown,
//     DefaultR extends NitroFetchRequest = NitroFetchRequest,
//     T = DefaultT,
//     R extends NitroFetchRequest = DefaultR,
//     O extends NitroFetchOptions<R> = NitroFetchOptions<R>
//   >(
//   url: R,
//   options?: O
// ) => $fetch<T>(url, {
//   ...options,
//   headers: {
//     // Authorization: auth.logged ? `Bearer ${auth.accessToken}` : '',
//     ...options?.headers
//   }
// })

// export const useApiData = async <
//     DefaultT = unknown,
//     DefaultR extends NitroFetchRequest = NitroFetchRequest,
//     T = DefaultT,
//     R extends NitroFetchRequest = DefaultR,
//     O extends NitroFetchOptions<R> = NitroFetchOptions<R>
//   >(
//   url: R,
//   options?: O
// ) => $fetch<T>(url, {
//   ...options,
//   headers: {
//     Authorization: useAuthStore().token.value ? useAuthStore().token.value : '',
//     ...options?.headers
//   }
// })

// export default defineNuxtPlugin(async () => {
//   // const routerStore = useRouterStore()
//   // const { apiUrl } = storeToRefs(routerStore)
//   const apiServer = $fetch.create({
//     baseURL: 'https://sedi2.zapto.org/dwcluster', // apiUrl.value || 'http://localhost:8082',
//     onRequest({ options }) {
//       // this will set cookies from the client side to the request you want in the Nuxt server side
//       options.headers = { ...useRequestHeaders(['cookie']) as HeadersInit }
//       console.log('onRequest', useCookie('token').value)
//       if (useCookie('token').value) {
//         const headers = options.headers ||= {}
//         if (Array.isArray(headers)) {
//           headers.push(['Authorization', `${useCookie('token').value}`])
//         } else if (headers instanceof Headers) {
//           headers.set('Authorization', `${useCookie('token').value}`)
//         } else {
//           headers.Authorization = `${useCookie('token').value}`
//         }
//       }
//     },
//     async onResponseError({ response }) {
//       if (response.status === 401) {
//         await navigateTo('/login')
//       }
//     }
//   })

//   return {
//     provide: {
//       apiServer
//     }
//   }
// })

export default defineNuxtPlugin(() => {})
