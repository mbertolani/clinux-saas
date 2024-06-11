import { defineStore } from 'pinia'

interface UserPayloadInterface {
  username: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    authenticated: false
  }),
  getters: {
    token() {
      return useCookie('token')
    }
  },
  actions: {
    async signIn({ username, password }: UserPayloadInterface) {
      const { data, success }: any = await useHttp(useRouterStore().apiUrl + '/auth/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          username,
          password
        }
      })
      // this.loading = pending
      this.authenticated = success
      if (success) {
        const token = useCookie('token') // useCookie new hook in nuxt 3
        token.value = 'Bearer ' + data?.token.bearer // set token to cookie `Bearer ${token}`
        this.authenticated = true // set authenticated  state value to true
        navigateTo('/')
      }
      return data
    },
    signOut() {
      const token = useCookie('token') // useCookie new hook in nuxt 3
      this.authenticated = false // set authenticated  state value to false
      token.value = null // clear the token cookie
      navigateTo('/signout')
    },
    getSession() {
      const { data, success }: any = useHttp('/auth/login', {
        method: 'post'
      })
      if (success) {
        this.user = data
      }
      console.log('getSession', data, success)
      return data
    }
  }
})
