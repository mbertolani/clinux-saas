<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
const fields = [{
  name: 'username',
  type: 'text',
  value: 'root',
  label: 'Usuário',
  placeholder: 'Nome do Usuário',
  required: true
}, {
  name: 'password',
  label: 'Senha',
  value: '1523Be25',
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

// const socialAction = async (action: string) => {
//   console.log('action', action)
//   await signIn(action, { redirect: false })
// }

// const providers = [{
//   label: 'Continue with GitHub',
//   icon: 'i-simple-icons-github',
//   color: 'white' as const,
//   click: () => {
//     socialAction('github')
//   }
// },
// {
//   label: 'Continue with Google',
//   icon: 'i-simple-icons-google',
//   color: 'white' as const,
//   click: () => {
//     socialAction('google')
//   }
// }]

const { signIn } = useAuthStore()
// const { apiUrl } = useRouterStore()
const system = useSystemStore()
const { setup, logo } = storeToRefs(system)
const { loadLogo, loadSetup } = system
const loading = ref(false)

const onSubmit = async (form: any) => {
  try {
    loading.value = true
    await signIn(form)
    // await signIn(
    //   { ...form, api: apiUrl },
    //   { callbackUrl: '/' } // Where the user will be redirected after a successiful login
    // )
  } finally {
    loading.value = false
  }
}
const imageLogo = ref(null)
// const imageLogo = computed(() => {
//   return logo.value instanceof Blob ? URL.createObjectURL(logo.value as unknown as Blob) as string : ''
// })
// console.log('login setup apiUrl', apiUrl)

onMounted(async () => {
  // console.log('login mounted apiUrl', apiUrl)
  await loadSetup()
  await loadLogo()
  imageLogo.value = logo.value instanceof Blob ? URL.createObjectURL(logo.value as unknown as Blob) as string : ''
})
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
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
        >Termo de serviço</NuxtLink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
