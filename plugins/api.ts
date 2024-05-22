export default defineNuxtPlugin({
  setup() {
    console.log('API Plugin')
    const userAuth = useCookie('token')
    const config = useRuntimeConfig()

    const api = $fetch.create({
      baseURL: (config.public.apiBaseURL as string) || 'http://localhost:8082',
      // headers: {
      //   'Content-Type': 'application/json',
      //   Authorization: `Bearer ${userAuth.value}`
      // },
      onRequest({ options }) {
        console.log('onRequest', options)
        if (userAuth.value) {
          options.headers = {} as Record<string, string>
          options.headers.Authorization = `Bearer ${userAuth.value}`
        }
      },
      onResponse({ response }): void | Promise<void> {
        console.log('onResponse', response)
      },
      onResponseError({ response }): void | Promise<void> {
        console.log('onResponseError', response)
        if (response.status === 401) {
          navigateTo('/login')
        }
      }
    })

    return {
      provide: {
        api
      }
    }
  }
})
