<script setup lang="ts">
definePageMeta({
  auth: false,
  layout: 'auth'
})

useSeoMeta({
  title: 'Login'
})

const fields = [{
  name: 'username',
  type: 'text',
  label: 'Usuário',
  placeholder: 'Nome do Usuário',
  required: true
}, {
  name: 'password',
  label: 'Senha',
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

const providers = [{
  label: 'Continue with GitHub',
  icon: 'i-simple-icons-github',
  color: 'white' as const,
  click: () => {
    console.log('Redirect to GitHub')
  }
},
{
  label: 'Continue with Google',
  icon: 'i-simple-icons-google',
  color: 'white' as const,
  click: () => {
    console.log('Redirect to Google')
  }
}]

const { signIn } = useAuth()
// const { loading } = useAuthState()
const loading = ref(false)

const onSubmit = async (form: any) => {
  try {
    loading.value = true
    await signIn(
      { ...form },
      { callbackUrl: '/' } // Where the user will be redirected after a successiful login
    )
    useToast().add({
      title: 'Bem-Vindo',
      color: 'green',
      description: 'Login efetuado com sucesso !'
    })
  } catch (error) {
    useToast().add({
      title: 'Erro',
      color: 'red',
      description: error.response?._data.error
    })
  } finally {
    loading.value = false
  }
}
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      :providers="providers"
      title="Bem-Vindo"
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
