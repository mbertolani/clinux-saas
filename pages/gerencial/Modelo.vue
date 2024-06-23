<script lang="ts" setup>
import { BaseEditor, GerencialModelo, GerencialModeloVariavel } from '#components'
import { useModelo } from '~/composables/gerencial/useModelo'
import type { ActionMenuItem } from '~/types/grid'

const actionMenu: ActionMenuItem[] = [
  {
    name: 'miEditarArquivo',
    icon: 'i-mdi-file-edit-outline',
    action: () => abrirModelo()
  },
  {
    name: 'miEditarLayout',
    title: 'Editar Layout',
    icon: 'i-mdi-text-box-outline',
    action: () => {
      console.log('Rota')
    }
  },
  {
    name: 'miEditarFormula',
    title: 'Editar Fórmula',
    icon: 'i-mdi-function-variant',
    action: () => {
      abrirFormula()
    }
  }
]
const title = 'Modelos'
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
// const modal = useModal()
// const openForm = (codigo?: number) => {
//   modal.open(GerencialModelo, {
//     id: Number(codigo),
//     onClose: () => modal.close(),
//     onSubmit: (id: number, data: any) => {
//       const nodes = id ? { update: [data] } : { add: [data] }
//       apiPage.value.applyTransaction(nodes)
//       modal.close()
//     }
//   })
// }
const loadEditor = (payload) => {
  apiEditor.value = payload
}
const openEditor = () => {
  idEditor.value = apiPage.value.selectedNode()?.id
  if (!idEditor.value)
    useMessage().showError('Nenhum registro selecionado')
  return idEditor.value > 0
}
const closeEditor = async () => {
  idEditor.value = 0
}
const abrirModelo = async () => {
  if (!openEditor())
    return
  const response = await useModelo().getModelo(idEditor.value)
  apiEditor.value.load(response)
}
const salvarModelo = async () => {
  const payload = await apiEditor.value.save()
  const response = await useModelo().setModelo(idEditor.value, payload) // await controller.update(idEditor.value, { bb_modelo: payload }) // payload.split(',')[1]
  if (response)
    closeEditor()
}
const abrirFormula = async () => {
  idFormula.value = Number(apiPage.value.getSelectedNodes()[0]?.id)
  if (!idFormula.value)
    useMessage().showError('Nenhum registro selecionado')
  showMonaco.value = idFormula.value > 0
}
</script>

<template>
  <div>
    <BaseEditor
      v-if="idEditor"
      @load="loadEditor($event)"
      @close="closeEditor()"
      @save="salvarModelo()"
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
      :header="{ title, icon: 'i-heroicons-film' }"
      :controller
      :action-menu
      @open-form="openForm"
    >
      <template
        v-if="false"
        #filter
      />
    </BasePage>
    <GerencialModelo
      :id="id"
      v-model="showModal"
      :title
      @submit="onSubmit"
      @close="showModal = false"
    />
  </div>
</template>
