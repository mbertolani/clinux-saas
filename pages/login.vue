<script setup lang="ts">
definePageMeta({
  auth: false,
  layout: 'auth'
})
const { clientId, moduleId, user } = useRouterStore()
console.log(clientId, moduleId, user)
// await navigateTo('/')
</script>

<template>
  <div class="flex justify-center" />
</template>
