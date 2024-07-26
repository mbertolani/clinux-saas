<script lang="ts" setup>
import { BaseEditor, GerencialModelo, GerencialModeloVariavel } from '#components'
import { useModelo } from '~/composables/gerencial/useModelo'
import type { ActionMenuItem } from '~/types/grid'
import { Icones, Messages } from '~/types/system'

const actionMenu: ActionMenuItem[] = [
  {
    name: 'miEditarArquivo',
    title: 'Editar Texto',
    icon: 'i-mdi-file-edit-outline',
    action: () => abrirModelo()
  },
  {
    name: 'miEditarLayout',
    title: 'Editar Layout',
    icon: 'i-mdi-text-box-outline',
    action: () => abrirLayout()
  },
  {
    name: 'miEditarFormula',
    title: 'Editar Fórmula',
    icon: 'i-mdi-function-variant',
    action: () => abrirFormula()
  }
]
const title = 'Modelo'
const showMonaco = ref(false)
const idFormula = ref(0)
const idEditor = ref(0)
const apiPage = ref(null)
const apiEditor = ref(null)
const controller = useModelo()
const showModal = ref(false)
const id = ref(0)
const openForm = (codigo?: number) => {
  showModal.value = true
  id.value = Number(codigo)
}
const onSubmit = (data: any) => {
  showModal.value = false
  apiPage.value.applyTransaction(id.value ? { update: [data] } : { add: [data] })
}
const loadEditor = (payload) => {
  apiEditor.value = payload
}
const openEditor = (id, payload) => {
  idEditor.value = id
  apiEditor.value.load(payload)
}
const closeEditor = async () => {
  idEditor.value = 0
  apiEditor.value.close()
}
const saveEditor = async () => {
  if (idEditor.value === apiPage.value.selectedNode()?.id)
    await salvarModelo()
  else
    await salvarLayout()
}
const abrirModelo = async () => {
  const id = apiPage.value.selectedNode()?.id
  if (!id) return
  const response = await useModelo().getModelo(id)
  openEditor(id, response)
}
const salvarModelo = async () => {
  const payload = await apiEditor.value.save()
  const response = await useModelo().setModelo(idEditor.value, payload)
  if (response)
    closeEditor()
}
const abrirFormula = async () => {
  idFormula.value = Number(apiPage.value.selectedNode()?.id)
  if (!idFormula.value)
    useMessage().showError(Messages.MSG_FNF_GRID)
  showMonaco.value = idFormula.value > 0
}
const abrirLayout = async () => {
  const id = apiPage.value.selectedData()?.cd_modalidade
  if (!id) return
  const response = await useModelo().getLayout(id)
  openEditor(id, response)
}
const salvarLayout = async () => {
  const payload = await apiEditor.value.save()
  const response = await useModelo().setLayout(idEditor.value, payload)
  if (response)
    closeEditor()
}
const filter = ref()
const filtrar = async () => {
  apiPage.value.applyFilter()
}
</script>

<template>
  <div>
    <BaseEditor
      v-show="idEditor"
      @load="loadEditor($event)"
      @close="closeEditor()"
      @save="saveEditor()"
    />
    <GerencialModeloVariavel
      v-if="showMonaco"
      :id="idFormula"
      v-model="showMonaco"
      @close="showMonaco = false"
    />
    <BasePage
      v-show="!idEditor"
      ref="apiPage"
      :header="{ title, icon: Icones.modelo }"
      :controller
      :action-menu
      :filter
      @open-form="openForm"
    >
      <template #filter>
        <FormKit
          v-model="filter"
          type="form"
          :actions="false"
          @submit="filtrar"
        >
          <BaseLayout>
            <FiltroEmpresa :cols="3" />
            <FiltroModalidade :cols="3" />
            <FiltroMedico :cols="3" />
          </BaseLayout>
        </FormKit>
      </template>
    </BasePage>
    <GerencialModelo
      :id="id"
      v-model="showModal"
      :title
      :value="filter"
      @submit="onSubmit"
      @close="showModal = false"
    />
  </div>
</template>
