<script lang="ts">
import type { DocumentEditor, DocumentEditorContainer } from '@syncfusion/ej2-vue-documenteditor'
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-vue-documenteditor'
import { registerLicense } from '@syncfusion/ej2-base'
import { ptBr } from '~/utils/editor'

registerLicense(
  useRuntimeConfig().public.syncfusionKey
)

export default {
  name: 'BaseEditor',
  components: {
    ejsDocumenteditor: DocumentEditorContainerComponent
  },
  provide: {
    DocumentEditorContainer: [Toolbar]
  },
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    enableToolbar: {
      type: Boolean,
      default: true
    }
  },
  emits: ['load', 'save', 'close'],
  data() {
    return {
      // documentEditor: null,
      toolBarItens: null,
      serviceUrl: 'http://localhost:6002'// 'https://editor.telelaudo.com.br'
    }
  },
  computed: {
    container(): DocumentEditorContainer {
      return (this.$refs.documentEditor as any).ej2Instances
    },
    editor(): DocumentEditor {
      return (this.$refs.documentEditor as any).ej2Instances.documentEditor
    }
  },
  async mounted() {
    console.log('mounted')
    this.editor.defaultLocale = ptBr
    this.editor.locale = 'pt-BR'
    this.editor.enableLocalPaste = true
    this.$emit('load', this)
    this.setToolBar()
    window.addEventListener('resize', this.updateContainerSize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateContainerSize)
  },
  methods: {
    clear() {
      this.editor.openBlank()
    },
    async load(payload) {
      this.updateContainerSize()
      const formData = new FormData()
      formData.append('name', 'laudo.rtf')
      formData.append('contents', new Blob([payload], { type: 'application/rtf' }))
      const response = await $fetch('api/documenteditor/Import', {
        baseURL: this.serviceUrl,
        method: 'POST',
        body: formData
      }).catch((e) => {
        console.error(e)
      })
      this.editor.open(response as string)
    },
    async save() {
      const payload = await this.editor.saveAsBlob('Docx')
      const formData = new FormData()
      formData.append('name', 'laudo')
      formData.append('filename', 'laudo.rtf')
      formData.append('contents', payload)
      const response = await $fetch('api/documenteditor/Export', {
        baseURL: this.serviceUrl,
        method: 'POST',
        body: formData
      }).catch((e) => {
        console.error(e)
      })
      return await convertToBase64Image(response as Blob)
    },
    updateContainerSize() {
      console.log('updateContainerSize')
      const containerPanel = document.getElementById('documentEditorContainer')
      console.log(window.innerHeight, containerPanel?.style.height)
      if (containerPanel)
        containerPanel.style.height = (window.innerHeight - 86) + 'px'
      // - (document.getElementById('documenteditor_titlebar').offsetHeight + document.getElementById('documenteditor_toolbar').offsetHeight)
      console.log(containerPanel.style.height)
    },
    setToolBar() {
      this.toolBarItens = [
        {
          prefixIcon: 'e-save',
          tooltipText: 'Salvar Documento',
          text: 'Salvar',
          id: 'CustomSave',
          cssClass: 'e-de-toolbar-btn'
        },
        {
          prefixIcon: 'e-close',
          tooltipText: 'Cancelar Edição',
          text: 'Sair',
          id: 'CustomClose',
          cssClass: 'e-de-toolbar-btn'
        },
        'Separator',
        'Undo',
        'Redo',
        'Separator',
        'Image',
        'Table',
        'Hyperlink',
        'Bookmark',
        'TableOfContents',
        'Separator',
        'Header',
        'Footer',
        'PageSetup',
        'PageNumber',
        'Break',
        'Separator',
        'Find',
        'Separator',
        'LocalClipboard',
        'RestrictEditing',
        'Separator',
        'FormFields',
        'UpdateFields'
      ]
      // this.container.toolbarItems = [
      //   'Open',
      //   'New',
      //   {
      //     prefixIcon: 'e-de-ctnr-pagenumber',
      //     tooltipText: 'Custom toolbar item',
      //     text: 'Custom toolbar item',
      //     id: 'Custom',
      //     cssClass: 'e-de-toolbar-btn'
      //   },
      //   'Separator',
      //   'Image',
      //   'Break',
      //   'Bookmark',
      //   'Separator',
      //   'Hyperlink',
      //   'RestrictEditing'
      // ]
      this.container.toolbarClick = (args) => {
        if (args.item.id === 'CustomSave') {
          console.log('CustomSave')
          this.$emit('save', this)
        }
        if (args.item.id === 'CustomClose') {
          console.log('CustomClose')
          this.$emit('close', this)
        }
      }
    }
  }
}
</script>

<template>
  <ejs-documenteditor
    id="documentEditorContainer"
    ref="documentEditor"
    class="p-4"
    height="600"
    :service-url
    :enable-toolbar="enableToolbar"
    :readonly="readOnly"
    :show-properties-pane="false"
    :toolbar-items="toolBarItens"
    :enable-local-paste="true"
  />
</template>

<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/tailwind-dark.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/tailwind-dark.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/tailwind-dark.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/tailwind-dark.css";
@import "../../node_modules/@syncfusion/ej2-lists/styles/tailwind-dark.css";
@import "../../node_modules/@syncfusion/ej2-navigations/styles/tailwind-dark.css";
@import "../../node_modules/@syncfusion/ej2-splitbuttons/styles/tailwind-dark.css";
@import "../../node_modules/@syncfusion/ej2-dropdowns/styles/tailwind-dark.css";
@import "../../node_modules/@syncfusion/ej2-vue-documenteditor/styles/tailwind-dark.css";
</style>
