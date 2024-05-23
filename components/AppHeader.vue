<script setup lang="ts">
// import type { NavItem } from '@nuxt/content/dist/runtime/types'

// const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

const links = [
  {
    label: 'Tools',
    to: '/tools',
    children: [
      { label: 'Editor', to: '/tools/editor' },
      { label: 'Grid', to: '/tools/grid' },
      { label: 'Data', to: '/tools/data' },
      { label: 'Form', to: '/tools/form' }
    ]
  },
  {
    label: 'Pricing',
    to: '/pricing'
  },
  {
    label: 'Blog',
    to: '/blog'
  }
]

const { logUserOut } = useAuthStore()
const { authenticated } = storeToRefs(useAuthStore()) // make authenticated state reactive
const logout = () => {
  logUserOut()
  navigateTo('/')
}
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      Clinux <UBadge
        label="Ris"
        variant="subtle"
        class="mb-0.5"
      />
    </template>

    <template #right>
      <UColorModeButton size="sm" />
      <UButton
        v-if="!authenticated"
        label="Login"
        color="gray"
        to="/login"
      />
      <UButton
        v-if="authenticated"
        label="Logout"
        icon="i-heroicons-arrow-right-20-solid"
        trailing
        color="black"
        class="hidden lg:flex"
        @click="logout()"
      />
    </template>

    <template #panel>
      <UNavigationTree
        :links="links"
        default-open
      />
    </template>
  </UHeader>
</template>
