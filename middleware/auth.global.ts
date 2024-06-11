// import { storeToRefs } from 'pinia'
// import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  // const { authenticated } = storeToRefs(useAuthStore()) // make authenticated state reactive
  const token = useCookie('token') // get token from cookies

  if (['login', 'signup', 'signout', 'system-client'].includes(to?.name as string)) {
    return
  }

  if (token.value) {
    // check if value exists
    // todo verify if token is valid, before updating the state
    // authenticated.value = true // update the state to authenticated
  }
  // if token exists and url is /login redirect to homepage
  if (token.value && to?.name === 'login') {
    return navigateTo('/')
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== 'login') {
    abortNavigation()
    return navigateTo('/signout')
  }
})
