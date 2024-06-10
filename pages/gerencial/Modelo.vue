<script lang="ts" setup>
import { BaseEditor, GerencialModelo } from '#components'
import { useModelo } from '~/composables/gerencial/useModelo'
import type { ActionMenuItem } from '~/types/grid'

const actionMenu: ActionMenuItem[] = [
  {
    name: 'miEditarArquivo',
    action: () => abrirModelo()
  },
  {
    name: 'miEditarLayout',
    action: () => {
      console.log('Rota')
    }
  }
]
const idEditor = ref(0)
const apiPage = ref(null)
const apiEditor = ref(null)
const controller = useModelo()
const modal = useModal()
const openForm = (codigo?: number) => {
  modal.open(GerencialModelo, {
    id: Number(codigo),
    onClose: () => modal.close(),
    onSubmit: (id: number, data: any) => {
      const nodes = id ? { update: [data] } : { add: [data] }
      apiPage.value.applyTransaction(nodes)
      modal.close()
    }
  })
}
const loadEditor = (editor) => {
  apiEditor.value = editor
}
const closeEditor = async () => {
  idEditor.value = 0
}
const abrirModelo = async () => {
  idEditor.value = apiPage.value.getSelectedNodes()[0]?.id
  if (!idEditor.value) {
    useSystemStore().showError('Nenhum registro selecionado')
    return
  }
  const response = await useModelo().api.get(idEditor.value, 'bb_modelo')
  if (response?.bb_modelo) {
    apiEditor.value.load(atob(response.bb_modelo))
  } else {
    apiEditor.value.clear()
  }
}
const salvarModelo = async () => {
  const payload = await apiEditor.value.save()
  const response = await controller.api.update(idEditor.value, { bb_modelo: payload }) // payload.split(',')[1]
  if (response) {
    useSystemStore().showMessage('Modelo salvo com sucesso')
    closeEditor()
  } else {
    useSystemStore().showError('Erro ao salvar modelo')
  }
}
// mdi:text-box-outline
</script>

<template>
  <div>
    <BaseEditor
      v-show="idEditor"
      @load="loadEditor($event)"
      @close="closeEditor()"
      @save="salvarModelo()"
    />
    <BasePage
      v-show="!idEditor"
      ref="apiPage"
      :header="{ title: 'Modelos', icon: 'i-heroicons-film' }"
      :controller
      :action-menu
      @open-form="openForm"
    >
      <template
        v-if="false"
        #filter
      />
    </BasePage>
  </div>
</template>
