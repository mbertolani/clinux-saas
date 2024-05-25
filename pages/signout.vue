<script setup lang="ts">
definePageMeta({
  auth: false,
  layout: 'auth'
})
const { client } = useSystemStore()
const homeUrl = computed(() => `/login?id=${client.ds_portal_id}`)
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
