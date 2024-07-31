<script setup lang="ts">
import { setMainMenu } from '~/types/system'
import { useSetup } from '~/composables/gerencial/useSetup'

const { signOut, getSession, refreshToken } = useAuthStore()
const { user, token } = storeToRefs(useAuthStore())
const { moduleId, clientId, clientName } = useRouterStore()
const userColor = computed(() => user.value?.idmedico > 0 ? 'primary' : 'red')
const userName = computed(() => user.value?.name)
const homeUrl = computed(() => `/${moduleId}/${clientId}`)
onMounted(async () => {
  getSession()
  refreshToken()
})
const logout = () => {
  signOut()
  useAuthStore().$reset()
  useSystemStore().$reset()
  // useRouterStore().$reset()
}
const idleTime = await useSetup().getSetup('nr_login_tempo') || 15
const { idle } = useIdle(idleTime * 60 * 1000)
console.log('idleValue', idle.value, idleTime)
watch(idle, (idleValue) => {
  if (idleValue) {
    console.log('Tempo ocioso atingido: ' + idleValue)
    useAuthStore().signOut()
  }
})
</script>

<template>
  <UHeader
    :links="setMainMenu()"
  >
    <template #logo>
      {{ clientName }}
      <UBadge
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
        :links="setMainMenu()"
        default-open
      />
    </template>
  </UHeader>
</template>
