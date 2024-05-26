<script setup lang="ts">
definePageMeta({
  auth: false,
  layout: 'auth'
})
const { moduleId, clientId } = useRouterStore()
const homeUrl = computed(() => `/${moduleId}/${clientId}`)
</script>

<template>
  <div class="flex justify-center">
    <UButton
      icon="i-heroicons-home"
      :to="homeUrl"
      color="black"
      class="absolute top-4"
    />
    <div class="text-center">
      <p class="mt-4">
        Sessão encerrada
      </p>
    </div>
  </div>
</template>
