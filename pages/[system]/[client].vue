<template>
  <div>
    {{ status }}
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  auth: false,
  layout: 'auth'
})

const status = ref('Carregando...')
const route = useRoute()
const routerStore = useRouterStore()

onMounted(async () => {
  if (routerStore.apiUrl) {
    navigateTo('/login')
  } else {
    status.value = `Client ${route.params.client} not found in system ${route.params.system}`
  }
})
</script>
