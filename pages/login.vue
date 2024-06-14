<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const fields = [{
  name: 'username',
  type: 'text',
  // value: 'root',
  label: 'Usuário',
  placeholder: 'Nome do Usuário',
  required: true
}, {
  name: 'password',
  label: 'Senha',
  // value: '1523Be25',
  type: 'password',
  placeholder: 'Digite sua senha',
  icon: 'i-heroicons-lock-closed',
  required: true
}]

const validate = (state: any) => {
  const errors = []
  if (!state.username) errors.push({ path: 'email', message: 'Email is required' })
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
  return errors
}

const authStore = useAuthStore()
const { signIn } = authStore
const { user } = storeToRefs(authStore)
const system = useSystemStore()
const { setup, logo } = storeToRefs(system)
const { loadLogo, loadSetup } = system
const loading = ref(false)

const onSubmit = async (form: any) => {
  try {
    loading.value = true
    await signIn(form)
  } catch (error) {
    useMessage().showError(error.response?._data.error)
  } finally {
    loading.value = false
  }
}
const imageLogo = ref(null)
// const imageLogo = computed(() => {
//   return logo.value instanceof Blob ? URL.createObjectURL(logo.value as unknown as Blob) as string : ''
// })
useAuthStore().$reset() // reset the store
await loadSetup()
await loadLogo()
imageLogo.value = logo.value instanceof Blob ? URL.createObjectURL(logo.value as unknown as Blob) as string : ''

onMounted(async () => {
//  console.log('mounted', user.value)
//  console.log('reset', user.value)
})
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UCard
    class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur"
  >
    <NuxtImg
      v-if="imageLogo"
      :src="imageLogo"
      class="mx-auto mt-4 mb-4 opacity-1"
    />
    <UAuthForm
      ref="formRef"
      :fields="fields"
      :validate="validate"
      :title="setup?.ds_dicomvix_title"
      align="top"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid', label: 'Entrar', loading: loading }"
      @submit="onSubmit"
    >
      <!-- <template #description>
        Quer se cadastrar ? <NuxtLink
          to="/signup"
          class="text-primary font-medium"
        >Cadastrar</NuxtLink>.
      </template> -->

      <template #password-hint>
        <NuxtLink
          to="/"
          class="text-primary font-medium"
        >Esqueci a senha?</NuxtLink>
      </template>

      <template #footer>
        Você concorda com nosso <NuxtLink
          to="/"
          class="text-primary font-medium"
        >Termo de serviço</NuxtLink>..
        <UBadge
          :label="user.name || 'No User ID found'"
          variant="subtle"
          class="absolute top-8"
        />
      </template>
    </UAuthForm>
  </UCard>
</template>
