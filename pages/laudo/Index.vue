<script lang="ts" setup>
import { BaseEditor, LaudoExame } from '#components'
import { useLaudo } from '~/composables/laudo/useLaudo'
import type { ActionMenuItem } from '~/types/grid'

const toolBarItens = [
  {
    prefixIcon: 'e-arrow-left',
    tooltipText: 'Fechar Editor',
    text: 'Sair',
    id: 'CustomClose',
    cssClass: 'e-de-toolbar-btn'
  },
  {
    prefixIcon: 'e-save',
    tooltipText: 'Salvar Documento',
    text: 'Salvar',
    id: 'CustomSave',
    cssClass: 'e-de-toolbar-btn'
  },
  'Separator',
  {
    prefixIcon: 'e-cell',
    tooltipText: 'Laudo Estruturado',
    text: 'Leo',
    id: 'Leo',
    cssClass: 'e-de-toolbar-btn'
  },
  'Separator',
  {
    prefixIcon: 'e-image',
    tooltipText: 'Visualizar Imagem',
    text: 'Imagem',
    id: 'imagem',
    cssClass: 'e-de-toolbar-btn'
  },
  {
    prefixIcon: 'e-print-layout',
    tooltipText: 'Modelos de Laudo',
    text: 'Modelo',
    id: 'modelo',
    cssClass: 'e-de-toolbar-btn'
  },
  {
    prefixIcon: 'e-upper-case',
    tooltipText: 'Auto-Texto',
    text: 'Auto-Texto',
    id: 'texto',
    cssClass: 'e-de-toolbar-btn'
  },
  'Separator',
  {
    prefixIcon: 'e-circle-info',
    tooltipText: 'Informar Pendência',
    text: 'Pendência',
    id: 'pendencia',
    cssClass: 'e-de-toolbar-btn'
  },
  {
    prefixIcon: 'e-warning',
    tooltipText: 'Informar Achado Crítico',
    text: 'Achado Crítico',
    id: 'achado',
    cssClass: 'e-de-toolbar-btn'
  },
  'Separator',
  {
    prefixIcon: 'e-folder-open',
    tooltipText: 'Cadastrar Anexos',
    text: 'Anexo',
    id: 'anexo',
    cssClass: 'e-de-toolbar-btn'
  },
  {
    prefixIcon: 'e-sort-ascending',
    tooltipText: 'Dicionário',
    text: 'Dicionário',
    id: 'dicionario',
    cssClass: 'e-de-toolbar-btn'
  },
  'Separator',
  {
    prefixIcon: 'e-repeat',
    tooltipText: 'Enviar para Revisão',
    text: 'Revisar',
    id: 'revisar',
    cssClass: 'e-de-toolbar-btn'
  },
  {
    prefixIcon: 'e-edit',
    tooltipText: 'Assinar Laudo',
    text: 'Assinar',
    id: 'assinar',
    cssClass: 'e-de-toolbar-btn'
  },
  {
    prefixIcon: 'e-redo',
    tooltipText: 'Assinar e Próximo',
    text: 'Próximo',
    id: 'proximo',
    cssClass: 'e-de-toolbar-btn'
  },
  {
    prefixIcon: 'e-print',
    tooltipText: 'Assinar e Imprimir',
    text: 'Imprimir',
    id: 'imprimir',
    cssClass: 'e-de-toolbar-btn'
  }
]
const toolBarClick = (args) => { // EmitType<(ClickEventArgs)>
  if (args.item.id === 'CustomSave') {
    console.log('XCustomSave')
    // salvar()
  } else if (args.item.id === 'CustomClose') {
    console.log('XCustomClose')
    // close()
  }
}

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
const controller = useLaudo()
const modal = useModal()
const openForm = (codigo?: number) => {
  modal.open(LaudoExame, {
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
  const response = await useLaudo().api.get(idEditor.value, 'bb_modelo')
  if (response?.bb_modelo) {
    apiEditor.value.load(atob(response.bb_modelo))
  } else {
    apiEditor.value.clear()
  }
}
const salvarModelo = async () => {
  const payload = await apiEditor.value.save()
  const response = await controller.api.update(idEditor.value, { bb_modelo: payload.split(',')[1] })
  if (response) {
    useSystemStore().showMessage('Modelo salvo com sucesso')
    closeEditor()
  } else {
    useSystemStore().showError('Erro ao salvar modelo')
  }
}
const modelFilter = ref({
  dt_de: useDateFormat(useNow(), 'YYYY-MM-DD').value,
  dt_ate: null,
  nr_controle: null,
  cd_modalidade: null,
  cd_empresa: null,
  cd_medico: null
})

const apiFilter = ref(null)
const filtrar = async () => {
  apiPage.value.applyFilter()
}
</script>

<template>
  <div>
    <BaseEditor
      v-show="idEditor"
      :tool-bar="{
        items: toolBarItens,
        click: toolBarClick
      }"
      @load="loadEditor($event)"
      @close="closeEditor()"
      @save="salvarModelo()"
    />
    <BasePage
      v-show="!idEditor"
      ref="apiPage"
      :header="{ title: 'Laudos', icon: 'mdi:text-box-outline' }"
      :controller
      :action-menu
      :filter="modelFilter"
      @open-form="openForm"
    >
      <template #filter>
        <LaudoFiltro
          ref="apiFilter"
          v-model="modelFilter"
          @submit="filtrar"
        />
      </template>
    </BasePage>
  </div>
</template>
