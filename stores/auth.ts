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
    async authenticateUser({ username, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const { data, pending }: any = await useCustomFetch('/login/auth', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          username,
          password
        }
      })
      this.loading = pending

      if (data.value) {
        console.log(data.value)
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
