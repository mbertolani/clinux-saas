import { defineStore } from 'pinia'

interface UserPayloadInterface {
  username: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    authenticated: false,
    loading: false
  }),
  actions: {
    authenticateUser({ username, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      console.log('authenticateUser', username, password)
      const { data, error, success }: any = useHttp('/login/auth', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          username,
          password
        }
      })
      // this.loading = pending
      console.log('set cookie', data, error, success)
      this.authenticated = success
      if (success) {
        const token = useCookie('token') // useCookie new hook in nuxt 3
        token.value = data?.value?.token // set token to cookie
        this.authenticated = true // set authenticated  state value to true
      }
    },
    logUserOut() {
      const token = useCookie('token') // useCookie new hook in nuxt 3
      this.authenticated = false // set authenticated  state value to false
      token.value = null // clear the token cookie
    }
  }
})
