<script setup lang="ts">
definePageMeta({
  auth: false,
  layout: 'auth'
})
const router = useRoute()
const { loadClient, apiUrl } = useRouterStore()
await loadClient()
const config = useRuntimeConfig()
config.public.auth.computed.fullBaseUrl = apiUrl + '/auth'
console.log(apiUrl, router.params, config.public.auth)
</script>

<template>
  <AppLogin />
</template>
