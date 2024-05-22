<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import type { Empresa } from '~/stores/gerencial/empresa'
import type { Funcionario } from '~/stores/gerencial/funcionario'
import { useEmpresaStore } from '~/stores/gerencial/empresa'
import { useFuncionarioStore } from '~/stores/gerencial/funcionario'

const { $api } = useNuxtApp()

const { appConfig } = useAppConfig()
definePageMeta({ layout: 'default' })
useHead({
  titleTemplate: 'Index page',
  title: (appConfig as { name: string })?.name || 'Nuxt 3 Awesome Starter'
})
const router = useRouter()

const { logUserOut } = useAuthStore()
const { authenticated } = storeToRefs(useAuthStore()) // make authenticated state reactive
const listaEmpresas = ref<Empresa[]>([])
const listaFuncionarios = ref<Funcionario[]>([])
const logout = () => {
  logUserOut()
  router.push('/login')
}

const _customFetch = async () => {
  // const data = await useNuxtApp().$api("/gerencial/funcionario");
  const data = await useNuxtApp().$api('/setup/data')
  listaEmpresas.value = data as Empresa[]
}

const apiFetch = async () => {
  listaEmpresas.value = await $api('/gerencial/empresa')
}

const getEmpresas = async () => {
  const workGroupStore = useEmpresaStore
  await workGroupStore().api.getAll()
  listaEmpresas.value = workGroupStore().items
  listaFuncionarios.value = []
  workGroupStore().sayOla()
}

const getFuncionarios = async () => {
  const functionarioStore = useFuncionarioStore
  await functionarioStore().api.getAll()
  listaFuncionarios.value = functionarioStore().items
  listaEmpresas.value = []
  functionarioStore().sayHello()
}

const showPageError = () => {
  // router.push({ name: 'error', params: { error } })
  throw createError({
    statusCode: 404,
    statusMessage: 'Página não encontrada !!!'
  })
}
</script>

<template>
  <div>
    <div class="flex flex-col space-y-5">
      <button
        class="bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white"
        @click="_customFetch()"
      >
        Custom Fetch()
      </button>
      <button
        class="bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white"
        @click="navigateTo('/utils/fetch')"
      >
        useCustom Fetch()
      </button>
      <button
        class="bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white"
        @click="apiFetch()"
      >
        Api Fetch()
      </button>
      <button
        class="bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white"
        @click="getEmpresas()"
      >
        getEmpresas()
      </button>
      <button
        class="bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white"
        @click="getFuncionarios()"
      >
        getFuncionarios()
      </button>
      <button
        class="bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white"
        @click="showPageError()"
      >
        Page Error
      </button>
      <button
        v-if="!authenticated"
        class="bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white"
        @click="navigateTo('/login')"
      >
        Login
      </button>
      <button
        v-if="authenticated"
        class="bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white"
        @click="logout()"
      >
        Logout
      </button>
      <button
        v-if="!authenticated"
        class="bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white"
        @click="navigateTo('/about')"
      >
        About
      </button>
      <button
        v-if="!authenticated"
        class="bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white"
        @click="navigateTo('/')"
      >
        Home
      </button>
    </div>
    <pre>{{ listaEmpresas }}</pre>
    <pre>{{ listaFuncionarios }}</pre>
    <footer v-if="authenticated">
      <h1>Footer</h1>
    </footer>
  </div>
</template>
