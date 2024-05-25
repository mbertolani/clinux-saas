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

const { signOut, token } = useAuth()
const logout = () => {
  signOut({ callbackUrl: '/signout' })
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
        v-if="!token"
        label="Login"
        color="gray"
        to="/login"
      />
      <UButton
        v-if="token"
        icon="i-heroicons-arrow-right-20-solid"
        trailing
        color="black"
        class="flex bg-center"
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
