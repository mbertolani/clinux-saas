<script setup lang="ts">
import { mainMenu } from '~/types/system'

const { signOut, getSession } = useAuthStore()
const { user, token } = storeToRefs(useAuthStore())
const { moduleId, clientId, clientName } = storeToRefs(useRouterStore())
const userColor = computed(() => user.value?.idmedico > 0 ? 'primary' : 'red')
const userName = computed(() => user.value?.name)
const homeUrl = computed(() => `/${moduleId}/${clientId}`)
onMounted(async () => {
  getSession()
})
const logout = () => {
  signOut()
  useAuthStore().$reset()
  useSystemStore().$reset()
  // useRouterStore().$reset()
}
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
        @click="getSession()"
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
