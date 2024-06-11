<script lang="ts" setup>
// import { storeToRefs } from 'pinia'
import type { Empresa } from '~/stores/gerencial/empresa'
import type { Funcionario } from '~/stores/gerencial/funcionario'
import { useEmpresaStore } from '~/stores/gerencial/empresa'
import { useFuncionarioStore } from '~/stores/gerencial/funcionario'

const { appConfig } = useAppConfig()

useHead({
  titleTemplate: 'Index page',
  title: (appConfig as { name: string })?.name || 'Nuxt 3 Awesome Starter'
})
// const router = useRouter()

// const { logUserOut } = useAuthStore()
// const { authenticated } = storeToRefs(useAuthStore()) // make authenticated state reactive
const listaEmpresas = ref<Empresa[]>([])
const listaFuncionarios = ref<Funcionario[]>([])
// const setupStore = useSystemStore
// const { useLoadSetup } = setupStore()
// const { setup } = storeToRefs(setupStore())
// useLoadSetup()

const { $api } = useNuxtApp()

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
        @click="navigateTo('/tools/data')"
      >
        useApi Fetch()
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
        Store getEmpresas()
      </button>
      <button
        class="bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white"
        @click="getFuncionarios()"
      >
        Store getFuncionarios()
      </button>
      <button
        class="bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white"
        @click="showPageError()"
      >
        Page Error
      </button>
    </div>
    Empresas
    <pre>{{ listaEmpresas }}</pre>
    Funcionarios
    <pre>{{ listaFuncionarios }}</pre>
  </div>
</template>
