<script setup lang="ts">
// const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
// if (!page.value) {
//   throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
// }
const page = ref({
  hero: {
    title: 'Synapse EIS/RIS',
    description: 'Enterprise Imaging'
    // links: [
    //   { label: 'Learn more', href: '/about' }
    // ]
  }
})
useSeoMeta({
  titleTemplate: '',
  title: page.value.hero.title,
  ogTitle: page.value.hero.title,
  description: page.value.hero.description,
  ogDescription: page.value.hero.description
})
definePageMeta({
  auth: true
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
</script>

<template>
  <div v-if="page">
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
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
