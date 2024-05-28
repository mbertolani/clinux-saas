<script setup lang="ts">
import { mainMenu } from '~/types/system'

// import type { NavItem } from '@nuxt/content/dist/runtime/types'

// const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))
const { signOut, token } = useAuth()
const logout = () => {
  signOut({ callbackUrl: '/signout' })
}
const { moduleId, clientName } = useRouterStore()
</script>

<template>
  <UHeader
    :links="mainMenu"
  >
    <template #logo>
      {{ clientName }} <UBadge
        :label="moduleId"
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
        :links="mainMenu"
        default-open
      />
    </template>
  </UHeader>
</template>
