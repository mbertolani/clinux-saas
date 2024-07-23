<script setup lang="ts">
import { setMainMenu } from '~/types/system'

// const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
// if (!page.value) {
//   throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
// }
const page = ref({
  hero: {
    title: 'Synapse EIS/RIS',
    description: 'Enterprise Imaging'
    // links: [
    //   { label: 'Learn more', href: '/' }
    // ]
  }
})
// const modal = useModal()
// const count = ref(0)

// function openModal() {
//   console.log('openModal')
//   count.value += 1
//   modal.open(ModalDelete, {
//     count: count.value,
//     onSuccess() {
//       useSystemStore().showMessage('teste')
//     }
//   })
// }
// const config = useRuntimeConfig()
// console.log(11, config.public.auth.computed)
// config.public.auth.computed.fullBaseUrl = '/api/auth'
// config.public.auth.computed.origin = ''
// console.log(22, config.public.auth.computed)
</script>

<template>
  <div v-if="page">
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      :links="setMainMenu(true)"
    >
      <div class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" />
    </ULandingHero>
  </div>
</template>

<style scoped>
.landing-grid {
  background-size: 100px 100px;
  background-image:
    linear-gradient(to right, rgb(var(--color-gray-200)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}
.dark {
  .landing-grid {
    background-image:
      linear-gradient(to right, rgb(var(--color-gray-800)) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(var(--color-gray-800)) 1px, transparent 1px);
  }
}
</style>
