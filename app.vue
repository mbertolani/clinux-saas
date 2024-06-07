<script setup lang="ts">
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.min.css'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

// const colorMode = useColorMode()

// const color = computed(() => colorMode.value === 'dark' ? '#111827' : 'white')

// const { apiUrl } = useRouterStore()

const colorMode = useColorMode()
const color = ref(null)
const getColor = () => {
  return colorMode.value === 'dark' ? '#111827' : 'white'
}
watch(colorMode, () => {
  color.value = getColor()
})
onMounted(() => {
  color.value = getColor()
})

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  // link: [
  //   { rel: 'icon', href: `${apiUrl}/setup/icon` }
  // ],
  htmlAttrs: {
    lang: 'pt-br'
  }
})

useSeoMeta({
  titleTemplate: '%s - Nuxt UI Pro - SaaS template',
  ogImage: 'https://saas-template.nuxt.dev/social-card.png',
  twitterImage: 'https://saas-template.nuxt.dev/social-card.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <pulse-loader
      class="loader-container"
      :loading="useSystemStore()?.loading>0"
      color="#D0D0D0"
      size="15px"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
    <UModals />
    <!-- <ModalDelete /> -->
    <ModalConfirmation />
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Fundo preto com 50% de opacidade */
  backdrop-filter: blur(0.15px); /* Embarcado */
  z-index: 9999; /* Garante que o loader esteja acima de outros elementos */
}
</style>
