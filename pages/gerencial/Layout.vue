<script lang="ts" setup>
import { GerencialLayout } from '#components'
import { useLayout } from '~/composables/gerencial/useLayout'
import { Icones, Messages } from '~/types/system'

const title = 'Impressora'
const apiPage = ref(null)
const controller = useLayout()
const showModal = ref(false)
const id = ref(0)
const apiEditor = ref(null)
const showFormula = ref(false)
const showEditor = ref(false)

const openForm = (codigo?: number) => {
  showModal.value = true
  id.value = Number(codigo)
}

const onSubmit = (data: any) => {
  showModal.value = false
  apiPage.value.applyTransaction(id.value ? { update: [data] } : { add: [data] })
}

const actionMenu = [
  {
    title: 'Editar Texto',
    icon: Icones.editor,
    action: () => editarTexto()
  },
  {
    title: 'Editar Fórmula',
    icon: Icones.formula,
    action: () => editarFormula()
  }
]
const editarTexto = async () => {
  const node = apiPage.value.selectedNode()
  if (!node) {
    showError(Messages.MSG_FNF_GRID)
    return
  }
  id.value = Number(node.id)
  const response = await useLayout().getTexto(id.value)
  openEditor(response)
}
const editarFormula = async () => {
  const node = apiPage.value.selectedNode()
  if (!node) {
    showError(Messages.MSG_FNF_GRID)
    return
  }
  id.value = Number(node.id)
  showFormula.value = true
}
const loadEditor = (payload) => {
  apiEditor.value = payload
}
const openEditor = (payload) => {
  showEditor.value = true
  apiEditor.value.load(payload)
}
const closeEditor = async () => {
  apiEditor.value.close()
  showEditor.value = false
}
const saveEditor = async () => {
  if (showEditor.value)
    await salvarTexto()
  else
    await salvarFormula()
  id.value = 0
}
const salvarTexto = async () => {
  const payload = await apiEditor.value.save()
  const response = await useLayout().setTexto(id.value, payload)
  if (response) {
    closeEditor()
    showEditor.value = false
  }
}
const salvarFormula = async () => {
  const payload = await apiEditor.value.save()
  const response = await useLayout().setFormula(id.value, payload)
  if (response) {
    showFormula.value = false
  }
}
</script>

<template>
  <div>
    <BasePage
      v-show="!showEditor"
      ref="apiPage"
      :header="{ title, icon: Icones.layout }"
      :controller
      :action-menu
      @open-form="openForm"
    >
      <GerencialLayout
        :id
        v-model="showModal"
        :title
        @submit="onSubmit"
        @close="showModal = false"
      />
    </BasePage>
    <BaseEditor
      v-show="showEditor"
      @load="loadEditor($event)"
      @close="closeEditor()"
      @save="saveEditor()"
    />
    <GerencialLayoutFormula
      v-if="showFormula"
      :id
      v-model="showFormula"
      @close="showFormula = false"
    />
  </div>
</template>
