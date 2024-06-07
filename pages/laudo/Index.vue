<script lang="ts" setup>
import { BaseEditor } from '#components'
import { useLaudo } from '~/composables/laudo/useLaudo'
import type { ActionMenuItem } from '~/types/grid'

const toolBarItens = [
  {
    prefixIcon: 'e-arrow-left',
    tooltipText: 'Fechar Editor',
    text: 'Sair',
    id: 'close',
    cssClass: 'e-de-toolbar-btn'
  },
  {
    prefixIcon: 'e-save',
    tooltipText: 'Salvar Documento',
    text: 'Salvar',
    id: 'save',
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
    text: 'A. Crítico',
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
  if (args.item.id === 'close') {
    closeEditor()
  } else if (args.item.id === 'save') {
    salvarLaudo()
  }
}

const actionMenu: ActionMenuItem[] = [
  {
    name: 'acMedico',
    action: () => { console.log('Rota') }
  },
  {
    name: 'acRevisor',
    action: () => { console.log('Rota') }
  }
]
const idEditor = ref(0)
const apiPage = ref(null)
const apiEditor = ref(null)
const controller = useLaudo()
const { userId } = useRouterStore()
// const modal = useModal()
const openForm = (codigo?: number) => {
  abrirLaudo(codigo)
}
const loadEditor = (editor) => {
  apiEditor.value = editor
}
const closeEditor = async () => {
  idEditor.value = 0
}
const abrirLaudo = async (id: number) => {
  idEditor.value = id // apiPage.value.getSelectedNodes()[0]?.id
  if (!idEditor.value) return
  const response = await useLaudo().doLaudoAbrir({ cd_exame: idEditor.value, cd_medico: userId.id })
  if (response) {
    apiEditor.value.load(atob(response))
  } else {
    apiEditor.value.clear()
  }
}
const salvarLaudo = async () => {
  const payload = await apiEditor.value.save()
  const laudo = payload.split(',')[1]
  // const response = await controller.api.update(idEditor.value, { bb_laudo: payload.split(',')[1] })
  const response = await useLaudo().doLaudoGravar({ cd_exame: idEditor.value, cd_medico: userId.id, bb_html: laudo })
  if (response) {
    useSystemStore().showMessage()
    closeEditor()
  } else {
    useSystemStore().showError('Erro ao salvar modelo')
  }
}
const dataAtual = new Date()
dataAtual.setDate(dataAtual.getDate() - 90)
const modelFilter = ref({
  'dt_de': useDateFormat(dataAtual, 'YYYY-MM-DD').value,
  'dt_ate': useDateFormat(useNow(), 'YYYY-MM-DD').value,
  'ae.nr_controle': null,
  'sa.cd_modalidade': null,
  'sa.cd_empresa': null,
  'ae.cd_medico': null
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
