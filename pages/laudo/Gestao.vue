<script lang="ts" setup>
import { BaseEditor, LaudoEditorPainelHistorico, LaudoAchado, LaudoAssinado, LaudoAuditoria, LaudoPendencia, LaudoEditorLeo, ModalPesquisa, LaudoAnexo, LaudoChat, LaudoDiff, LaudoEditorVariavel, LaudoEditorPainelData, LaudoEditorPainelChat, LaudoEditorPainelAnexo, LaudoExame, LaudoTransferencia, LaudoEditorPainelGrid } from '#components'
import { useLaudo } from '~/composables/laudo/useLaudo'
import { useTexto } from '~/composables/laudo/useTexto'
import { usePrescricao } from '~/composables/laudo/usePrescricao'
import { useLaudoMedico } from '~/composables/laudo/useLaudoMedico'
import { usePaciente } from '~/composables/atendimento/usePaciente'
import { useModelo } from '~/composables/gerencial/useModelo'
import { Icones } from '~/types/system'
import { useSetup } from '~/composables/gerencial/useSetup'

const toolBarItens = [
  {
    prefixIcon: 'e-arrow-left',
    tooltipText: 'Fechar Editor',
    text: 'Voltar',
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
  {
    prefixIcon: 'e-edit',
    tooltipText: 'Assinar Laudo',
    text: 'Assinar',
    id: 'assinar',
    cssClass: 'e-de-toolbar-btn'
  },
  {
    prefixIcon: 'e-arrow-right',
    tooltipText: 'Assinar e Próximo',
    text: 'Próximo',
    id: 'proximo',
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
  {
    prefixIcon: 'e-folder-open',
    tooltipText: 'Cadastrar Anexos',
    text: 'Anexo',
    id: 'anexo',
    cssClass: 'e-de-toolbar-btn'
  },
  {
    prefixIcon: 'e-description',
    tooltipText: 'Dados do Atendimento',
    text: 'Dados',
    id: 'dados',
    cssClass: 'e-de-toolbar-btn'
  },
  // {
  //   prefixIcon: 'e-sort-ascending',
  //   tooltipText: 'Dicionário',
  //   text: 'Dicionário',
  //   id: 'dicionario',
  //   cssClass: 'e-de-toolbar-btn'
  // },
  'Separator',
  {
    prefixIcon: 'e-search',
    tooltipText: 'Selecionar Revisor',
    text: 'Revisar',
    id: 'revisar',
    cssClass: 'e-de-toolbar-btn'
  },
  {
    prefixIcon: 'e-send',
    tooltipText: 'Transferir e Sair',
    text: 'Transferir',
    id: 'transferir',
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
    prefixIcon: 'e-changes-track',
    tooltipText: 'Alterações do Laudo',
    text: 'Versão',
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
      if (!await selecionarModelo())
        useMessage().showMessage('Modelo não encontrado !')
      break
    case 'texto':
      if (!await selecionarAutotexto())
        useMessage().showMessage('Auto-Texto não encontrado !')
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
    case 'dados':
      exibirDados(selectedData())
      break
    case 'dicionario':
      console.log('dicionario')
      break
    case 'revisar':
      revisarLaudo()
      break
    case 'assinar':
      assinarLaudo()
      break
    case 'transferir':
      transferirLaudo()
      break
    case 'proximo':
      assinarLaudo(true)
      break
    case 'imprimir':
      imprimirLaudo()
      break
    case 'diff':
      openDiff()
      break
  }
}
const actionMenu = [
  {
    name: 'acPaciente',
    title: 'Localizar Paciente',
    icon: Icones.paciente,
    action: () => { selecionarPaciente() }
  },
  {
    name: 'acHistorico',
    title: 'Histórico do Paciente',
    icon: Icones.calendario,
    action: () => { exibirHistorico() }
  },
  {
    title: '-'
  },
  {
    name: 'acDicom',
    title: 'Imagens',
    icon: Icones.imagem,
    action: () => {
      if (selectedData()?.dt_assinado) {
        openImagem()
      } else {
        useMessage().showError('Laudo não assinado !')
      }
    }
  },
  {
    title: 'Prescrição',
    icon: Icones.prescricao,
    action: () => { visualizarPrescricao(selectedData()?.cd_exame) }
  },
  {
    name: 'acAnexo',
    title: 'Documentos',
    icon: Icones.anexo,
    action: () => { editarAnexo(selectedData()?.cd_atendimento) }
  },
  {
    name: 'acChat',
    title: 'Mensagens',
    icon: Icones.chat,
    action: () => { editarChat(selectedData()?.cd_atendimento) }
  },
  {
    title: '-'
  },
  {
    name: 'acMedico',
    title: 'Alterar Médico',
    icon: Icones.medico,
    action: () => { editarMedico() }
  },
  {
    name: 'acRevisor',
    title: 'Alterar Revisor',
    icon: Icones.revisor,
    action: () => { editarRevisor() }
  },
  {
    name: 'acAuditor',
    title: 'Alterar Auditor',
    icon: Icones.auditor,
    action: () => { editarAuditor() }
  },
  {
    name: 'acUrgencia',
    title: 'Alterar Urgência',
    icon: Icones.urgencia,
    action: () => { editarUrgencia() }
  },
  {
    name: 'acProcedencia',
    title: 'Alterar Procedência',
    icon: Icones.procedencia,
    action: () => { editarProcedencia() }
  },
  {
    name: 'acProcedimento',
    title: 'Alterar Procedimento',
    icon: Icones.procedimento,
    action: () => { editarProcedimento() }
  },
  {
    title: '-'
  },
  {
    name: 'acExame',
    title: 'Atendimento',
    icon: Icones.atendimento,
    action: () => { editarExame(selectedNodeId()) }
  },
  {
    name: 'acPendencia',
    title: 'Pendência',
    icon: Icones.pendencia,
    action: () => { editarPendencia(selectedData()?.cd_atendimento) }
  },
  {
    name: 'acAchado',
    title: 'Achado Crítico',
    icon: Icones.achado,
    action: () => { editarAchado(selectedNodeId()) }
  },
  {
    name: 'acAuditar',
    title: 'Auditoria',
    icon: Icones.auditoria,
    action: () => { editarAuditoria(selectedData()?.cd_atendimento) }
  },
  {
    title: '-'
  },
  {
    name: 'acCancelar',
    title: 'Cancelar Laudo',
    icon: Icones.laudo_del,
    action: () => { cancelarLaudo() }
  },
  {
    name: 'acAssinado',
    title: 'Laudo Assinado',
    icon: Icones.laudo_pdf,
    action: () => { laudoAssinado(selectedNode().data) }
  },
  {
    name: 'acDigitado',
    title: 'Laudo Digitado',
    icon: Icones.laudo_txt,
    action: null
  },
  {
    name: 'Diff',
    title: 'Laudo Versão',
    icon: Icones.laudo_dif,
    action: () => { openDiff() }
  }
]
const idGrid = ref()
const idEditor = ref<number>(0)
const schemaFormula = ref()
const showFormula = ref(false)
const apiPage = ref(null)
const apiEditor = ref(null)
const controller = !useAuthStore().user.idmedico ? useLaudo() : useLaudoMedico()
const modal = useModal()
const showAnexo = ref(false)
const openForm = () => {
  if (selectedData()?.dt_assinado) {
    laudoAssinado(selectedNode().data)
  } else {
    abrirLaudo(selectedNodeId(), selectedNodeIds().join(','))
  }
}
const loadEditor = (editor) => {
  apiEditor.value = editor
}
const closeEditor = async (aChange: boolean = true) => {
  if (aChange && apiEditor.value.change()) {
    useMessage().openDialog({
      title: 'Edição de Laudo',
      description: 'Deseja salvar as alterações ?',
      okClick: () => salvarLaudo(),
      noClick: () => closeEditor(false)
    })
    return
  }
  useLaudo().doLaudoSair(idEditor.value)
  idEditor.value = 0
  apiEditor.value.close()
}
const abrirLaudo = async (cd_exame: number, ds_exame?: string) => {
  if (!cd_exame)
    return
  const certificado = await useLaudo().validarCertificado()
  if (!certificado)
    return
  const response = await useLaudo().doLaudoAbrir({ cd_exame, cd_fila: modelFilter.value.cd_fila, ds_exame })
  if (response.error)
    return
  idEditor.value = cd_exame
  idGrid.value = selectedData()
  if (response.data) {
    apiEditor.value.load(response.data)
  } else {
    const viewer = await useLaudo().doMedicoViewer()
    if (viewer)
      openImagem()
    const modelo = await selecionarModelo()
    if (!modelo)
      apiEditor.value.clear()
  }
}
const salvarLaudo = async () => {
  const texto = await apiEditor.value.save()
  const response = await useLaudo().doLaudoGravar({ cd_exame: idEditor.value, bb_html: texto, ds_exame: selectedNodeIds().join(',') })
  if (!response.error) {
    useMessage().showMessage()
    closeEditor()
    apiPage.value.applyTransaction({ update: response.data })
    return true
  }
}
const assinarLaudo = async (aProximo: boolean = false, aTipo: number = 0) => {
  if (!aTipo)
    if (await classificarLaudo(aProximo))
      return
  const response = await useLaudo().doLaudoAssinar({ cd_exame: idEditor.value, bb_html: await apiEditor.value.save(), cd_tipo: aTipo })
  if (response) {
    useMessage().showMessage()
    apiPage.value.applyTransaction({ update: response.data })
    closeEditor()
    if (aProximo)
      proximoLaudo()
  }
  return response
}
const dataHoje = new Date()
const dataInterval = useRouterStore().clientId === 'localhost'
  ? {
      dt_de: useDateFormat(dataHoje.setDate(dataHoje.getDate() - 90), 'YYYY-MM-DD').value,
      dt_ate: useDateFormat(new Date(), 'YYYY-MM-DD').value
    }
  : {
      dt_de: useDateFormat(new Date(), 'YYYY-MM-DD').value,
      dt_ate: null
    }
const modelFilter = ref({
  // 'dt_de': useDateFormat(dataInicio, 'YYYY-MM-DD').value,
  // 'dt_ate': useDateFormat(useNow(), 'YYYY-MM-DD').value,
  'dt_de': dataInterval.dt_de,
  'dt_ate': dataInterval.dt_ate,
  'nr_periodo': 1,
  'ae.nr_controle': null,
  'sa.cd_modalidade': null,
  'sa.cd_empresa': null,
  'ae.cd_medico': null,
  'cd_fila': null,
  'cd_paciente': null
})
const apiFilter = ref(null)
const filtrar = async () => {
  apiPage.value.applyFilter()
}
// watch(() => modelFilter.value.cd_fila, async () => {
//   apiPage.value.applyFilter()
// })
const exibirHistorico = async () => {
  modelFilter.value.cd_paciente = modelFilter.value.cd_paciente ? null : selectedData().cd_paciente
  apiPage.value.applySearch()
}
const salvarFormula = async (data: any) => {
  // await apiEditor.value?.searchReplace(data)
  apiEditor.value?.editorMerge(data)
  showFormula.value = false
}
const abrirFormula = async (id: number) => {
  const response = id ? await useModelo().getFormulaData(id) : null
  schemaFormula.value = response
  showFormula.value = response ? true : false
}
const abrirFormulaTexto = async (id: number) => {
  const response = id ? await useTexto().getFormulaData(id) : null
  schemaFormula.value = response
  showFormula.value = response ? true : false
}
const selecionarAutotexto = async (payload?: any) => {
  const response = await useLaudo().doLaudoFiltroTexto({ cd_exame: idEditor.value, ds_texto: payload || '%' })
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
    abrirFormulaTexto(response.data[0].id)
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
  return true
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
const updateNodes = (responses) => {
  let nodes = []
  responses.forEach((response) => {
    if (!response.error)
      nodes = nodes.concat(response.data)
  })
  apiPage.value.applyTransaction({ update: nodes })
  modal.close()
}
const laudoAssinado = async (data: any) => {
  if (!selectedNode())
    return
  const { cd_atendimento, cd_exame, ds_paciente } = data
  const response = await useLaudo().laudoAssinado({ cd_atendimento, cd_exame })// cd_atendimento: 1723321, cd_exame: 12834
  // incluir timeout para aguardar a geração do arquivo
  if (response.error) return
  // if (!response.data?.size && aRetry) {
  //   useMessage().showMessage('Aguarde um instante...')
  //   await new Promise(resolve => setTimeout(resolve, 3000))
  //   laudoAssinado(false)
  //   return
  // } else if (!response.error)
  modal.open(LaudoAssinado, {
    title: ds_paciente,
    src: URL.createObjectURL(response.data),
    onClose() {
      modal.close()
    }
  })
}
const carregarModelo = async (id: number) => {
  // const layout = await useLaudo().doModeloLayout(id)
  // const modelo = await useLaudo().doModeloAbrir(id)
  const response = await useLaudo().carregarModelo(idEditor.value, id) as any
  if (response) {
    apiEditor.value.clear()
    await apiEditor.value.load(response?.layout)
    if (response?.modelo) {
      const sfdt = await useEditor().Import(response?.modelo)
      apiEditor.value.editor.editor.paste(sfdt)
      abrirFormula(id)
    }
  }
}
const selecionarModelo = async () => {
  if (!idEditor.value)
    return
  const response = await useLaudo().doModeloLista({ cd_exame: idEditor.value }) as any
  if (response.error)
    return
  if (!response.data.length)
    return
  if (response.data.length === 1) {
    carregarModelo(response.data[0].cd_modelo)
    return true
  }
  modal.open(ModalPesquisa, {
    title: 'Modelos',
    data: response.data,
    onSubmit(id) {
      carregarModelo(id)
    },
    onCancel() {
      modal.close()
    }
  })
  return true
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
const selecionarPaciente = async () => {
  modal.open(ModalPesquisa, {
    title: 'Localizar Paciente',
    data: [],
    api: usePaciente().getPacientes,
    onSubmit(cd_paciente) {
      modal.close()
      modelFilter.value.cd_paciente = cd_paciente
      apiPage.value.applySearch()
    },
    onCancel() {
      modal.close()
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
    title: 'Alterar Urgência',
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

const cancelarLaudos = async (cd_motivo?: number) => {
  // updateNodes(await Promise.all(apiPage.value.getSelectedNodes().map((node) => {
  //   return useLaudo().execCancelar({ cd_exame: node.data.cd_exame, cd_motivo })
  // })))
  updateNodes(await Promise.all([
    useLaudo().execCancelar({ cd_exame: selectedData().cd_exame, cd_motivo })
  ]))
}
const cancelarLaudo = async () => {
  if (!selectedNode())
    return
  const cd_exame = selectedData().cd_exame
  const response = await useLaudo().execCancelar({ cd_exame })
  if (response.error)
    return
  if (!response.data.length) {
    useMessage().openDialog({
      title: 'Apagar Laudo',
      description: 'Confirmar exclusão ?',
      okClick: () => cancelarLaudos()
    })
    return
  }
  modal.open(ModalPesquisa, {
    title: 'Apagar Laudo',
    data: response.data,
    async onSubmit(cd_motivo) {
      cancelarLaudos(cd_motivo)
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
        closeEditor()
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
const exibirDados = async (data: object) => {
  modal.open(LaudoEditorPainelGrid, {
    gridData: data,
    gridHeader: await controller.getGrid(),
    onClose() {
      modal.close()
    }
  })
}
const visualizarPrescricao = async (id: number) => {
  const response = await usePrescricao().getPrescricao(id)
  if (!response)
    return useMessage().showError('Prescrição não encontrada !')
  const document = await usePrescricao().getAssinado(response)
  modal.open(LaudoAssinado, {
    title: 'Prescrição',
    src: URL.createObjectURL(document.data),
    onClose() {
      modal.close()
    }
  })
}
const editarAnexo = async (id: number) => {
  // if (id)
  //   modal.open(LaudoAnexo, { id })
  showAnexo.value = id > 0
  idGrid.value = selectedData()
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
const editarExame = async (id: number) => {
  if (!id) return
  modal.open(LaudoExame, {
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
        'background-color': !data?.ds_sla ? '#' + data.ds_sla : 'undefined'
        // 'color': useColorMode().value === 'dark' ? 'white' : '#111827' // colorDark.value
      }
    }
  },
  ds_paciente: {
    cellStyle: ({ data }) => {
      return {
        'background-color': data?.ds_vip ? '#229922' : 'undefined'
        // 'color': useColorMode().value === 'dark' ? 'white' : '#111827' // colorDark.value
      }
    }
  },
  ds_urgente: {
    cellStyle: ({ data }) => {
      return {
        'background-color': data.ds_urgente ? '#ff0000' : 'undefined'
        // 'color': useColorMode().value === 'dark' ? 'white' : '#111827' // colorDark.value
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
const revisarLaudo = async () => {
  const response = await useLaudo().execRevisao({ cd_atendimento: idGrid.value.cd_atendimento, cd_modalidade: idGrid.value.cd_modalidade })
  if (response.error)
    return
  modal.open(ModalPesquisa, {
    title: 'Médico Revisor',
    data: response.data,
    async onSubmit(cd_medico: number) {
      const response = await useLaudo().execRevisao({ cd_atendimento: idGrid.value.cd_atendimento, cd_medico })
      if (!response.error) {
        salvarLaudo()
        apiPage.value.applyTransaction({ update: response.data })
        modal.close()
      }
    }
  })
}
const transferirLaudo = async () => {
  modal.open(LaudoTransferencia, {
    id: idGrid.value.cd_atendimento,
    onClose() {
      modal.close()
    },
    async onSubmit(data) {
      apiPage.value.applyTransaction({ update: data })
      modal.close()
      closeEditor()
    }
  })
}
const proximoLaudo = async () => {
  // const response = await assinarLaudo(false)
  // if (!response)
  //   return
  // const proximo = await useLaudo().doLaudoProximo()
  // if (proximo.cd_exame) {
  //   abrirLaudo(proximo.cd_exame)
  // } else {
  //   closeEditor()
  // }
  const proximo = await useLaudo().doLaudoProximo()
  if (proximo?.cd_exame)
    abrirLaudo(proximo.cd_exame)
}
const imprimirLaudo = async () => {
  const response = await assinarLaudo()
  if (response) {
    console.log('imprimirLaudo', response)
    await new Promise(resolve => setTimeout(resolve, 3000))
    laudoAssinado(response)
  }
}
const classificarLaudo = async (aProximo: boolean = false) => {
  const response = await useLaudo().doLaudoFiltroTipo(selectedData().cd_modalidade)
  if (!response.data.length) {
    return false
  }
  modal.open(ModalPesquisa, {
    title: 'Classificar Laudo',
    data: response.data,
    onSubmit(id) {
      assinarLaudo(aProximo, id)
      modal.close()
    },
    onCancel() {
      modal.close()
    }
  })
  return true
}
const avisoVip = ref()
const selectionChanged = params => avisoVip.value = params?.ds_vip
const idleTime = await useSetup().getSetup('nr_login_tempo') || 15
const { idle } = useIdle(idleTime * 60 * 1000)
watch(idle, (idleValue) => {
  if (idleValue) {
    useAuthStore().signOut()
  }
})
watch(avisoVip, (aviso) => {
  if (aviso) {
    useMessage().showMessage(aviso)
  }
})
</script>

<template>
  <div>
    <div
      v-show="idEditor && !openLeo"
      class="grid gap-x-0 grid-cols-1 md:grid-cols-12"
    >
      <BaseEditor
        class="md:col-span-9 md:row-span-4 !p-0"
        :tool-bar="{
          items: toolBarItens,
          click: toolBarClick
        }"
        @load="loadEditor($event)"
        @texto="selecionarAutotexto"
      />
      <LaudoEditorPainelData
        v-if="idEditor"
        :id="Number(idEditor)"
        class="md:col-span-3 px-2 pb-2"
      />
      <LaudoEditorPainelChat
        v-if="idEditor"
        class="md:col-span-3 px-2 pb-2"
        :data="idGrid"
      />
      <LaudoEditorPainelAnexo
        v-if="idEditor"
        class="md:col-span-3 px-2 pb-2"
        :data="idGrid"
      />
      <LaudoEditorPainelHistorico
        v-if="idEditor"
        class="md:col-span-3 px-2"
        :data="idGrid"
      />
    </div>
    <LaudoEditorLeo
      v-if="openLeo"
      :token="useAuthStore().user.idleo"
      @laudo-capturado="capturarLeo"
    />
    <LaudoEditorVariavel
      v-model="showFormula"
      :schema="schemaFormula"
      @submit="salvarFormula"
      @close="showFormula = false"
    />
    <LaudoAnexo
      v-if="showAnexo"
      :id="idGrid.cd_atendimento"
      v-model="showAnexo"
      @close="showAnexo = false"
    />
    <BasePage
      v-show="!idEditor"
      ref="apiPage"
      :header="{ title: 'Gestão', icon: Icones.gestao }"
      :controller
      :append-column-defs
      :merge-column-defs
      :action-menu
      :filter="modelFilter"
      :action-delete="cancelarLaudo"
      @selection-changed="selectionChanged"
      @open-form="openForm"
    >
      <template #filter>
        <LaudoGestaoFiltro
          ref="apiFilter"
          v-model="modelFilter"
          @submit="filtrar"
          @historico="exibirHistorico"
        />
        <!-- <div
          v-if="avisoVip"
          class="bg-blue-500 text-white px-2 py-2 rounded"
        >
          {{ avisoVip }}
        </div> -->
      </template>
    </BasePage>
  </div>
</template>
