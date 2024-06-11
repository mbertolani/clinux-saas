export default defineNuxtPlugin(async () => {
  const token = useCookie('token') // useCookie new hook in nuxt 3
  const { loadClient, apiUrl } = useRouterStore()
  await loadClient()
  const api = $fetch.create({
    // baseURL: apiUrl.value,
    onRequest({ options }) {
      this.baseURL = apiUrl
      if (token.value) {
        const headers = options.headers ||= {}
        if (Array.isArray(headers)) {
          headers.push(['Authorization', `${token.value}`])
        } else if (headers instanceof Headers) {
          headers.set('Authorization', `${token.value}`)
        } else {
          headers.Authorization = `${token.value}`
        }
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await navigateTo('/login')
      }
    }
  })

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api
    }
  }
})
