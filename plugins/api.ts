export default defineNuxtPlugin(async () => {
  const { token } = useAuth()
  const url = await useRouterStore().loadClient()

  const api = $fetch.create({
    baseURL: url || 'http://localhost:8082',
    onRequest({ options }) {
      if (token) {
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
