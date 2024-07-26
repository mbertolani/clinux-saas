<script lang="ts" setup>
import { LaudoTexto, LaudoTextoFormula } from '#components'
import { useTexto } from '~/composables/laudo/useTexto'
import { Icones, Messages } from '~/types/system'

const title = 'Auto-Texto'
const apiPage = ref(null)
const controller = useTexto()
const modal = useModal()
const id = ref(0)
const apiEditor = ref(null)
const showFormula = ref(false)
const showEditor = ref(false)

const openForm = async (codigo?: number) => {
  modal.open(LaudoTexto, {
    title,
    id: Number(codigo),
    onClose: () => modal.close(),
    onSubmit: (data: any) => {
      const nodes = codigo ? { update: [data] } : { add: [data] }
      apiPage.value.applyTransaction(nodes)
      modal.close()
    }
  })
}

const actionMenu = [
  {
    name: 'acTexto',
    title: 'Editar Texto',
    icon: Icones.editor,
    action: () => editarTexto()
  },
  {
    name: 'miEditarFormula',
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
  id.value = node.id
  const response = await useTexto().getTexto(id.value)
  openEditor(response)
}
const editarFormula = async () => {
  const node = apiPage.value.selectedNode()
  if (!node) {
    showError(Messages.MSG_FNF_GRID)
    return
  }
  id.value = Number(node.id)
  // const response = await useTexto().getFormula(id.value)
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
  const response = await useTexto().setTexto(id.value, payload)
  if (response) {
    closeEditor()
    showEditor.value = false
  }
}
const salvarFormula = async () => {
  const payload = await apiEditor.value.save()
  const response = await useTexto().setFormula(id.value, payload)
  if (response) {
    showFormula.value = false
  }
}
const filter = []
</script>

<template>
  <div>
    <BasePage
      v-show="!showEditor"
      ref="apiPage"
      :header="{ title, icon: Icones.texto }"
      :controller
      :action-menu
      :filter="filter"
      @open-form="openForm"
    />
    <BaseEditor
      v-show="showEditor"
      @load="loadEditor($event)"
      @close="closeEditor()"
      @save="saveEditor()"
    />
    <LaudoTextoFormula
      v-if="showFormula"
      :id
      v-model="showFormula"
      @close="showFormula = false"
    />
  </div>
</template>
