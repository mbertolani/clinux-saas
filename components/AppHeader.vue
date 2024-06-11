<script setup lang="ts">
import { mainMenu } from '~/types/system'

const { signOut, token } = useAuthStore()
const logout = () => {
  signOut()
}
const { moduleId, clientId, clientName, user } = useRouterStore()
const userColor = computed(() => user?.idmedico > 0 ? 'primary' : 'primary')
const userName = computed(() => user?.name)
const homeUrl = computed(() => `/${moduleId}/${clientId}`)
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
      <UAvatar
        :alt="userName"
        :chip-color="userColor"
      />
      <UColorModeButton size="sm" />
      <UButton
        v-if="!token"
        label="Login"
        color="gray"
        :to="homeUrl"
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
