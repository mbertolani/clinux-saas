<script lang="ts" setup>
import { BaseEditor, LaudoAssinado } from '#components'
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
  switch (args.item.id) {
    case 'close':
      closeEditor()
      break
    case 'save':
      salvarLaudo()
      break
    case 'Leo':
      console.log('Leo')
      break
    case 'imagem':
      console.log('imagem')
      break
    case 'modelo':
      console.log('modelo')
      break
    case 'pendencia':
      console.log('pendencia')
      break
    case 'achado':
      console.log('achado')
      break
    case 'anexo':
      console.log('anexo')
      break
    case 'dicionario':
      console.log('dicionario')
      break
    case 'revisar':
      console.log('revisar')
      break
    case 'assinar':
      buttonAssinado()
      break
    case 'proximo':
      console.log('proximo')
      break
    case 'imprimir':
      console.log('imprimir')
      break
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
const { user } = useRouterStore()
const modal = useModal()
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
  if (!id) return
  const response = await useLaudo().doLaudoAbrir({ cd_exame: id, cd_medico: user.idmedico }) as any
  if (response.error) return
  response.data
    ? apiEditor.value.load(atob(response.data))
    : apiEditor.value.clear()
  idEditor.value = id
}
const salvarLaudo = async () => {
  const texto = await apiEditor.value.save()
  const response = await useLaudo().doLaudoGravar({ cd_exame: idEditor.value, cd_medico: user.idmedico, bb_html: texto })
  if (!response.error) {
    useSystemStore().showMessage()
    closeEditor()
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

const autoTexto = (payload: any) => {
  payload.event.preventDefault()
  // isHandled = true
  apiEditor.value.editor().selection.moveToPreviousCharacter()
  apiEditor.value.editor().selection.selectCurrentWord()
  const texto = apiEditor.value.editor().selection.text
  if (texto) {
    apiEditor.value.editor().search.find(texto, 'WholeWord')
    useLaudo().doLaudoFiltroTexto({ cd_exame: 1, cd_medico: 1, ds_texto: texto })
  }
}
const buttonAssinado = async () => {
  const selectedNode = apiPage.value.getSelectedNodes()[0]
  if (!selectedNode) {
    showError('Nenhum registro selecionado')
    return
  }
  const { cd_atendimento, cd_exame } = selectedNode.data
  const response = await useLaudo().laudoAssinado({ cd_atendimento, cd_exame, cd_medico: user.idmedico }) // cd_atendimento: 1723321, cd_exame: 12834
  // const data = await convertToBase64Image(response.data as Blob)
  if (response.data)
    modal.open(LaudoAssinado, {
      src: URL.createObjectURL(response.data),
      onClose() {
        modal.close()
      }
    })
}
// const response = await useLaudo().execPendencia({ cd_atendimento: 1 })
// console.log(response)
const appendColumnDefs = [
  {
    field: 'Sinalizadores',
    width: 200,
    pinned: 'right',
    cellRenderer: (params) => {
      const achado = `<i class="i-heroicons-magnifying-glass-plus" style="color: ${params.data?.ds_achado ? 'orange' : '#ddd'}; font-size: 24px; margin-top: 4px" title="Achado Crítico"></i>`
      const urgencia = `<i class="i-heroicons-bell-alert" style="color: ${params.data?.sn_urgencia ? 'red' : '#ddd'}; font-size: 24px; margin-top: 4px" title="Urgência"></i>`
      const imagem = `<i class="i-heroicons-user" style="color: ${params.data?.sn_imagem ? 'green' : '#ddd'}; font-size: 24px; margin-top: 4px" title="Imagem"></i>`
      const complemento = `<i class="i-heroicons-receipt-refund" style="color: ${params.data?.ds_complemento ? 'cyan' : '#ddd'}; font-size: 24px; margin-top: 4px" title="Complemento"></i>`
      return achado + urgencia + imagem + complemento
    }
  }
]
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
      @texto="autoTexto"
    />
    <BasePage
      v-show="!idEditor"
      ref="apiPage"
      :header="{ title: 'Laudos', icon: 'mdi:text-box-outline' }"
      :controller
      :append-column-defs
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
