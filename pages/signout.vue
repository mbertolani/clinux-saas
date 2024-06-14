<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
const { moduleId, clientId } = storeToRefs(useRouterStore())
const homeUrl = computed(() => clientId.value ? `/${moduleId.value}/${clientId.value}` : '/')
</script>

<template>
  <div class="flex justify-center">
    <UButton
      icon="i-heroicons-home"
      :to="homeUrl"
      color="black"
      class="absolute bottom-8"
    />
    <div class="text-center">
      <p class="mt-4">
        Sessão encerrada!
      </p>
    </div>
  </div>
</template>
