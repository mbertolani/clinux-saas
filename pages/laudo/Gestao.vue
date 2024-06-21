<script lang="ts" setup>
import { BaseEditor, LaudoAchado, LaudoAssinado, LaudoAuditoria, LaudoPendencia, LaudoLeo, ModalPesquisa, LaudoAnexo, LaudoChat, LaudoDiff, LaudoVariavel } from '#components'
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
  },
  {
    prefixIcon: 'e-undo',
    tooltipText: 'Alterações do Laudo',
    text: 'Diff',
    id: 'diff',
    cssClass: 'e-de-toolbar-btn'
  }
]
const toolBarClick = async (args) => { // EmitType<(ClickEventArgs)>
  switch (args.item.id) {
    case 'close':
      closeEditor()
      break
    case 'save':
      salvarLaudo()
      break
    case 'Leo':
      openLeo.value = true
      break
    case 'imagem':
      openImagem()
      break
    case 'modelo':
      selecionarModelo()
      break
    case 'texto':
      selecionarAutotexto()
      break
    case 'pendencia':
      editarPendencia(selectedData()?.cd_atendimento)
      break
    case 'achado':
      editarAchado(Number(idEditor.value))
      break
    case 'anexo':
      editarAnexo(Number(selectedData()?.cd_atendimento))
      break
    case 'dicionario':
      console.log('dicionario')
      break
    case 'revisar':
      console.log('revisar')
      break
    case 'assinar':
      assinarLaudo()
      break
    case 'proximo':
      console.log('proximo')
      break
    case 'imprimir':
      console.log('imprimir')
      break
    case 'diff':
      openDiff()
      break
  }
}
const actionMenu: ActionMenuItem[] = [
  {
    name: 'acAnexo',
    action: () => { editarAnexo(selectedData()?.cd_atendimento) }
  },
  {
    name: 'acChat',
    action: () => { editarChat(selectedData()?.cd_atendimento) }
  },
  {
    name: 'acProcedimento',
    action: () => { editarProcedimento() }
  },
  {
    name: 'acProcedencia',
    action: () => { editarProcedencia() }
  },
  {
    name: 'acMedico',
    action: () => { editarMedico() }
  },
  {
    name: 'acRevisor',
    action: () => { editarRevisor() }
  },
  {
    name: 'acAuditor',
    action: () => { editarAuditor() }
  },
  {
    name: 'acUrgencia',
    action: () => { editarUrgencia() }
  },
  {
    name: 'acCancelar',
    action: () => { cancelarLaudo() }
  },
  {
    name: 'acPendencia',
    action: () => { editarPendencia(selectedData()?.cd_atendimento) }
  },
  {
    name: 'acAchado',
    action: () => { editarAchado(selectedNodeId()) }
  },
  {
    name: 'acAuditar',
    action: () => { editarAuditoria(selectedData()?.cd_atendimento) }
  },
  {
    name: 'acAssinado',
    action: () => { laudoAssinado() }
  },
  {
    name: 'acDigitado',
    action: () => { laudoAssinado() }
  },
  {
    name: 'Diff',
    title: 'Laudo Diff',
    action: () => { openDiff() }
  }
]
const idEditor = ref<number>(0)
const apiPage = ref(null)
const apiEditor = ref(null)
const controller = useLaudo()
const { user } = useAuthStore()
const modal = useModal()
const openForm = (codigo?: number) => {
  if (codigo) {
    if (selectedNode().data?.dt_assinado) {
      laudoAssinado()
    } else {
      abrirLaudo(codigo)
    }
  } else {
    abrirLaudo(codigo)
  }
}
const loadEditor = (editor) => {
  apiEditor.value = editor
}
const closeEditor = async () => {
  useLaudo().doLaudoSair(idEditor.value)
  idEditor.value = 0
}
const abrirLaudo = async (id: number) => {
  if (!id) return
  const response = await useLaudo().doLaudoAbrir({ cd_exame: id, cd_medico: user.idmedico, cd_fila: modelFilter.value.cd_fila }) as any
  if (response.error) return
  apiEditor.value.clear()
  if (response.data) {
    apiEditor.value.load(response.data)
  } else {
    const response = await useLaudo().carregarModelo(id, 0) as any
    if (response.layout)
      await apiEditor.value.load(response.layout)
  }
  idEditor.value = id
}
const salvarLaudo = async () => {
  const texto = await apiEditor.value.save()
  const response = await useLaudo().doLaudoGravar({ cd_exame: idEditor.value, cd_medico: user.idmedico, bb_html: texto, ds_exame: selectedNodeIds().join(',') })
  if (!response.error) {
    useMessage().showMessage()
    closeEditor()
    apiPage.value.applyTransaction({ update: response.data })
  }
}
const assinarLaudo = async () => {
  const response = await useLaudo().doLaudoAssinar({ cd_exame: idEditor.value, cd_medico: user.idmedico, bb_html: await apiEditor.value.save() })
  if (response) {
    useMessage().showMessage()
    closeEditor()
    apiPage.value.applyTransaction({ update: response.data })
  }
}
const dataInicio = new Date()
dataInicio.setDate(dataInicio.getDate() - 90)
const modelFilter = ref({
  'dt_de': useDateFormat(dataInicio, 'YYYY-MM-DD').value,
  'dt_ate': useDateFormat(useNow(), 'YYYY-MM-DD').value,
  'nr_periodo': 1,
  'ae.nr_controle': null,
  'sa.cd_modalidade': null,
  'sa.cd_empresa': null,
  'ae.cd_medico': null,
  'cd_fila': null
})
const apiFilter = ref(null)
const filtrar = async () => {
  apiPage.value.applyFilter()
}
watch(() => modelFilter.value.cd_fila, async () => {
  apiPage.value.applyFilter()
})
const selecionarFormula = (data?: any) => {
  modal.close()
  modal.open(LaudoVariavel,
    {
      title: 'Variáveis e Fórmulas',
      schema: data,
      data: null,
      async onSubmit(data: any) {
        apiEditor.value.searchReplace(data)
        modal.close()
      }
    }
  )
}
const selecionarAutotexto = async (payload?: any) => {
  const response = await useLaudo().doLaudoFiltroTexto({ cd_exame: idEditor.value, cd_medico: user.idmedico, ds_texto: payload || '%' })
  if (response.error)
    return
  if (!response.data.length) {
    useMessage().showMessage('Chave não encontrada !')
    return
  }
  if (response.data.length === 1 && payload !== '%') {
    const texto = Decode64(response.data[0].bb_html)
    if (texto.includes('{\\rtf1')) {
      apiEditor.value.paste(texto)
    } else {
      apiEditor.value.insert(texto)
    }
  } else {
    modal.open(ModalPesquisa,
      {
        title: 'Auto-Texto',
        data: response.data,
        async onSubmit(payload: any, data: any) {
          if (data.label)
            selecionarAutotexto(data.label)
        },
        onCancel() {
          modal.close()
        }
      }
    )
  }
}
const selectedNodeIds = (): number[] => {
  return apiPage.value.getSelectedNodes().map(node => Number(node.id))
}
const selectedNodeId = (): number => {
  return Number(selectedNode()?.id)
}
const selectedData = () => {
  return selectedNode()?.data
}
const selectedNode = () => {
  const selectedNode = apiPage.value.getSelectedNodes()[0]
  if (!selectedNode) {
    useMessage().showError()
    return
  }
  return selectedNode
}
const laudoAssinado = async () => {
  if (!selectedNode())
    return
  const { cd_atendimento, cd_exame } = selectedNode().data
  const response = await useLaudo().laudoAssinado({ cd_atendimento, cd_exame, cd_medico: user.idmedico })// cd_atendimento: 1723321, cd_exame: 12834
  // const data = await convertToBase64Image(response as Blob)
  if (!response.error)
    modal.open(LaudoAssinado, {
      src: URL.createObjectURL(response.data),
      onClose() {
        modal.close()
      }
    })
}
const selecionarModelo = async () => {
  if (!idEditor.value)
    return
  const response = await useLaudo().doModeloLista({ cd_exame: idEditor.value }) as any
  if (response.error)
    return
  modal.open(ModalPesquisa, {
    title: 'Modelos de Laudo',
    data: response.data,
    async onSubmit(id) {
      const response = await useLaudo().carregarModelo(idEditor.value, id) as any
      if (!response.error) {
        modal.close()
        apiEditor.value.clear()
        if (response.data.layout)
          await apiEditor.value.load(response.data.layout)
        if (response.data.modelo) {
          const sfdt = await useEditor().Import(response.data.modelo)
          apiEditor.value.editor.editor.paste(sfdt)
        }
        if (response.data.formula) {
          selecionarFormula(response.data.formula)
        }
      }
    },
    onCancel() {
      modal.close()
    }
  })
}
const updateNodes = (responses) => {
  let nodes = []
  responses.forEach((response) => {
    if (!response.error)
      nodes = nodes.concat(response.data)
  })
  apiPage.value.applyTransaction({ update: nodes })
  modal.close()
}
const editarProcedimento = async () => {
  if (!selectedNode())
    return
  const cd_exame = selectedNodeId()
  const response = await useLaudo().execProcedimento({ cd_exame })
  if (response.error)
    return
  modal.open(ModalPesquisa, {
    title: 'Alterar Procedimento',
    data: response.data,
    async onSubmit(cd_procedimento) {
      updateNodes(await Promise.all(apiPage.value.getSelectedNodes().map((node) => {
        return useLaudo().execProcedimento({ cd_exame: node.id, cd_procedimento })
      })))
    }
  })
}
const editarMedico = async () => {
  if (!selectedNode())
    return
  const cd_atendimento = selectedData().cd_atendimento
  const response = await useLaudo().execMedico({ cd_atendimento })
  if (response.error)
    return
  modal.open(ModalPesquisa, {
    title: 'Alterar Médico',
    data: response.data,
    async onSubmit(cd_medico) {
      // const response = await useLaudo().execMedico({ cd_atendimento, cd_medico })
      // if (!response.error) {
      //   apiPage.value.applyTransaction({ update: response.data })
      //   modal.close()
      // }
      updateNodes(await Promise.all(apiPage.value.getSelectedNodes().map((node) => {
        return useLaudo().execMedico({ cd_atendimento: node.data.cd_atendimento, cd_medico })
      })))
    }
  })
}
const editarRevisor = async () => {
  if (!selectedNode())
    return
  const cd_atendimento = selectedData().cd_atendimento
  const response = await useLaudo().execRevisor({ cd_atendimento })
  if (response.error)
    return
  modal.open(ModalPesquisa, {
    title: 'Alterar Revisor',
    data: response.data,
    async onSubmit(cd_medico) {
      // const response = await useLaudo().execRevisor({ cd_atendimento, cd_medico })
      // if (!response.error) {
      //   apiPage.value.applyTransaction({ update: response.data })
      //   modal.close()
      // }
      updateNodes(await Promise.all(apiPage.value.getSelectedNodes().map((node) => {
        return useLaudo().execRevisor({ cd_atendimento: node.data.cd_atendimento, cd_medico })
      })))
    }
  })
}
const editarAuditor = async () => {
  if (!selectedNode())
    return
  const cd_atendimento = selectedData().cd_atendimento
  const response = await useLaudo().execAuditor({ cd_atendimento })
  if (response.error)
    return
  modal.open(ModalPesquisa, {
    title: 'Alterar Auditor',
    data: response.data,
    async onSubmit(cd_medico) {
      // const response = await useLaudo().execAuditor({ cd_atendimento, cd_medico })
      // if (!response.error) {
      //   apiPage.value.applyTransaction({ update: response.data })
      //   modal.close()
      // }
      updateNodes(await Promise.all(apiPage.value.getSelectedNodes().map((node) => {
        return useLaudo().execAuditor({ cd_atendimento: node.data.cd_atendimento, cd_medico })
      })))
    }
  })
}
const editarUrgencia = async () => {
  if (!selectedNode())
    return
  const cd_atendimento = selectedData().cd_atendimento
  const response = await useLaudo().execUrgencia({ cd_atendimento })
  if (response.error)
    return
  modal.open(ModalPesquisa, {
    title: 'Alterar Revisor',
    data: response.data,
    async onSubmit(cd_urgente) {
      // const response = await useLaudo().execUrgencia({ cd_atendimento, cd_urgente })
      // if (!response.error) {
      //   apiPage.value.applyTransaction({ update: response.data })
      //   modal.close()
      // }
      updateNodes(await Promise.all(apiPage.value.getSelectedNodes().map((node) => {
        return useLaudo().execUrgencia({ cd_atendimento: node.data.cd_atendimento, cd_urgente })
      })))
    }
  })
}
const editarProcedencia = async () => {
  if (!selectedNode())
    return
  const cd_atendimento = selectedData().cd_atendimento
  const response = await useLaudo().execProcedencia({ cd_atendimento })
  if (response.error)
    return
  modal.open(ModalPesquisa, {
    title: 'Alterar Procedência',
    data: response.data,
    async onSubmit(cd_procedencia) {
      updateNodes(await Promise.all(apiPage.value.getSelectedNodes().map((node) => {
        return useLaudo().execProcedencia({ cd_atendimento: node.data.cd_atendimento, cd_procedencia })
      })))
    }
  })
}
const cancelarLaudo = async () => {
  if (!selectedNode())
    return
  const cd_exame = selectedData().cd_exame
  const response = await useLaudo().execCancelar({ cd_exame })
  if (response.error)
    return
  modal.open(ModalPesquisa, {
    title: 'Alterar Revisor',
    data: response.data,
    async onSubmit(cd_motivo) {
      // const response = await useLaudo().execCancelar({ cd_exame, cd_motivo })
      // if (!response.error) {
      //   apiPage.value.applyTransaction({ update: response.data })
      //   modal.close()
      // }
      updateNodes(await Promise.all(apiPage.value.getSelectedNodes().map((node) => {
        return useLaudo().execCancelar({ cd_exame: node.data.cd_exame, cd_motivo })
      })))
    }
  })
}
const editarPendencia = async (id: number) => {
  if (id)
    modal.open(LaudoPendencia, {
      id,
      async onSubmit(data) {
        apiPage.value.applyTransaction({ update: data })
        modal.close()
      },
      onClose() {
        modal.close()
      }
    })
}
const editarAchado = async (id: number) => {
  if (id)
    modal.open(LaudoAchado, {
      id,
      async onSubmit(data) {
        apiPage.value.applyTransaction({ update: data })
        modal.close()
      },
      onClose() {
        modal.close()
      }
    })
}
const editarAuditoria = async (id: number) => {
  if (id)
    modal.open(LaudoAuditoria, {
      id,
      async onSubmit(data) {
        apiPage.value.applyTransaction({ update: data })
        modal.close()
      },
      onClose() {
        modal.close()
      }
    })
}
const editarAnexo = async (id: number) => {
  modal.close()
  if (id)
    modal.open(LaudoAnexo, { id })
}
const editarChat = async (id: number) => {
  if (id)
    modal.open(LaudoChat, {
      id,
      onClose() {
        modal.close()
      }
    })
}
const appendColumnDefs = [
  {
    field: 'Sinalizadores',
    width: 200,
    pinned: 'right',
    cellRenderer: (params) => {
      const achado = `<i class="i-heroicons-magnifying-glass-plus" style="color: ${params.data?.ds_achado ? 'orange' : '#ddd'}; font-size: 24px; margin-top: 4px" title="Achado Crítico"></i>`
      const urgencia = `<i class="i-heroicons-bell-alert" style="color: ${params.data?.ds_urgente ? 'red' : '#ddd'}; font-size: 24px; margin-top: 4px" title="Urgência"></i>`
      const imagem = `<i class="i-heroicons-user" style="color: ${params.data?.sn_imagem ? 'green' : '#ddd'}; font-size: 24px; margin-top: 4px" title="Imagem"></i>`
      const complemento = `<i class="i-heroicons-receipt-refund" style="color: ${params.data?.ds_complemento ? 'cyan' : '#ddd'}; font-size: 24px; margin-top: 4px" title="Complemento"></i>`
      return achado + urgencia + imagem + complemento
    }
  }
  // {
  //   field: 'Laudo',
  //   width: 200,
  //   pinned: 'left'
  // }
]
const mergeColumnDefs = {
  sn_atrasado: {
    cellRenderer: (params) => {
      if (params.data.nr_entrega) {
        if (params.data.nr_entrega > params.data.nr_atendimento_entrega) {
          return `<div class="i-heroicons-face-smile" style="color: green; font-size: 24px; margin-top: 4px" title="Sem prazo definido"/>`
        } else if (
          params.data.nr_entrega === params.data.nr_atendimento_entrega
        ) {
          return `<div class="i-heroicons-face-smile" style="color: yellow; font-size: 24px; margin-top: 4px" title="Sem prazo definido"/>`
        } else if (params.data.sn_atrasado) {
          return `<div class="i-heroicons-face-frown" style="color: red; font-size: 24px; margin-top: 4px" title="Sem prazo definido"/>`
        } else {
          return `<div class="i-heroicons-clock" style="color: gray; font-size: 24px; margin-top: 4px" title="Sem atraso"/>`
        }
      } else {
        return `<div class="i-heroicons-clock" style="color: gray; font-size: 24px; margin-top: 4px" title="Sem prazo definido"/>`
      }
    }
  },
  nr_controle: {
    cellStyle: ({ data }) => {
      return {
        'background-color': data?.ds_sla ? '#' + data.ds_sla : 'undefined',
        'color': useColorMode().value === 'dark' ? 'white' : '#111827' // colorDark.value
      }
    }
  },
  ds_urgente: {
    cellStyle: ({ data }) => {
      return {
        'background-color': data.ds_urgente ? '#ff0000' : 'undefined',
        'color': useColorMode().value === 'dark' ? 'white' : '#111827' // colorDark.value
      }
    }
  },
  nr_entrega: {
    cellRenderer: (params) => {
      if (params.data.nr_entrega < 0) {
        return `${params.data.nr_entrega} dia(s)`
      } else if ((params.data.nr_entrega || 0) === 0) {
        return 'Hoje'
      } else {
        return params.data.nr_entrega + ' dia(s)'
      }
    }
  },
  nr_entrega_laudo: {
    cellRenderer: (params) => {
      if (params.data.nr_entrega_laudo < 0) {
        return `${params.data.nr_entrega_laudo} dia(s)`
      } else if ((params.data.nr_entrega_laudo || 0) === 0) {
        return 'Imediato'
      } else {
        return params.data.nr_entrega_laudo + ' dia(s)'
      }
    }
  }
}
const openLeo = ref(false)
const capturarLeo = async (texto) => {
  // console.log('capturarLeo', texto)
  const Html = await useEditor().RtfToHtml({ bb_rtf: Encode64(texto) }) as any
  // console.log('RtfToHtml', Html)
  const sfdt = await useEditor().Import(Html)
  // console.log('Import', sfdt)
  apiEditor.value.editor.editor.paste(sfdt)
  openLeo.value = false
}
const openImagem = async () => {
  // console.log('openImagem')
  const response = await useLaudo().doDicomViewer({ cd_exame: idEditor.value })
  window.open(response.data, '_blank')
}
const openDiff = async () => {
  const id = selectedNodeId() || idEditor.value
  modal.close()
  modal.open(LaudoDiff, {
    id: Number(id),
    onClose() {
      modal.close()
    }
  })
}
</script>

<template>
  <div>
    <BaseEditor
      v-show="idEditor && !openLeo"
      :tool-bar="{
        items: toolBarItens,
        click: toolBarClick
      }"
      @load="loadEditor($event)"
      @texto="selecionarAutotexto"
    />
    <LaudoLeo
      v-if="openLeo"
      :token="user.idleo"
      @laudo-capturado="capturarLeo"
    />
    <BasePage
      v-show="!idEditor"
      ref="apiPage"
      :header="{ title: 'Laudos', icon: 'i-heroicons-document-text' }"
      :controller
      :append-column-defs
      :merge-column-defs
      :action-menu
      :filter="modelFilter"
      :action-delete="cancelarLaudo"
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
