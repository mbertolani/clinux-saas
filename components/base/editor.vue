<script lang="ts">
import type { DocumentEditor, DocumentEditorContainer } from '@syncfusion/ej2-vue-documenteditor' // CustomToolbarItemModel, ToolbarItem
import { registerLicense } from '@syncfusion/ej2-base'
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-vue-documenteditor'
import { ptBr } from '~/utils/editor'

// registerLicense('Mgo+DSMBMAY9C3t2U1hhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5Vd0diWX9ZcHZRQWRf')
// registerLicense(useRuntimeConfig().public.syncfusionKey)

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
    },
    toolBar: {
      type: Object,
      required: false
    }
  },
  emits: ['load', 'save', 'close', 'texto'],
  data() {
    return {
      // serviceUrl: 'http://localhost:6002/api/documenteditor/'
      serviceUrl: 'https://editor.telelaudo.com.br/api/documenteditor/'
      // https://github.com/SyncfusionExamples/EJ2-Document-Editor-Web-Services
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
  created() {
    registerLicense(useRuntimeConfig().public.syncfusionKey)
  },
  async mounted() {
    // console.log('mounted')
    this.editor.defaultLocale = ptBr
    this.editor.locale = 'pt-BR'
    this.editor.enableLocalPaste = false
    this.editor.keyDown = this.keyDown
    this.$emit('load', this)
    this.setToolBar()
    window.addEventListener('resize', this.updateContainerSize)
    setTimeout(() => {
      this.updateContainerSize()
    }, 100)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateContainerSize)
  },
  methods: {
    clear() {
      this.editor.openBlank()
      this.updateContainerSize()
    },
    async load(payload) {
      this.updateContainerSize()
      // const formData = new FormData()
      // formData.append('name', 'laudo.rtf')
      // formData.append('contents', new Blob([payload], { type: 'application/rtf' }))
      // const response = await $fetch('Import', {
      //   baseURL: this.serviceUrl,
      //   method: 'POST',
      //   body: formData
      // }).catch((e) => {
      //   console.error(e)
      // })
      const response = await useEditor().Import(payload)
      this.editor.open(response)
      this.editor.selection.moveToDocumentEnd()
    },
    async paste(payload) {
      const sfdt = await useEditor().Import(payload)
      this.editor.editor.paste(sfdt)
      this.editor.focusIn()
    },
    insert(payload) {
      this.editor.editor.insertText(payload)
      this.editor.focusIn()
    },
    async save() {
      const response = await this.saveBase()
      return response.split(',')[1]
    },
    async saveBase() {
      const response = await this.saveBlob()
      return await convertToBase64Image(response as Blob)
    },
    async saveBlob() {
      const payload = await this.editor.saveAsBlob('Docx')
      const formData = new FormData()
      formData.append('name', 'laudo')
      formData.append('filename', 'laudo.rtf')
      formData.append('contents', payload)
      const response = await $fetch('Export', {
        baseURL: this.serviceUrl,
        method: 'POST',
        body: formData
      }).catch((e) => {
        console.error(e)
      })
      return response as Blob
      // await useUseEditor().Export(payload as any)
    },
    updateContainerSize() {
      const containerPanel = document.getElementById('documentEditorContainer')
      if (containerPanel)
        containerPanel.style.height = (window.innerHeight - 86) + 'px'
      // - (document.getElementById('documenteditor_titlebar').offsetHeight + document.getElementById('documenteditor_toolbar').offsetHeight)
      // console.log(containerPanel?.style.height)
    },
    // setToolBar(): Array<CustomToolbarItemModel | ToolbarItem> {
    setToolBar() {
      // https://ej2.syncfusion.com/vue/documentation/appearance/icons#available-icons
      if (this.toolBar) {
        this.container.toolbarItems = this.toolBar.items
        this.container.toolbarClick = this.toolBar.click
        return
      }
      this.container.toolbarItems = [
        {
          prefixIcon: 'e-arrow-left',
          tooltipText: 'Cancelar Edição',
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
        // 'LocalClipboard',
        'RestrictEditing',
        'Separator',
        'FormFields',
        'UpdateFields'
      ]
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
    },
    keyDown(args) {
      // const keyCode: number = args.event.which || args.event.keyCode
      // const isCtrlKey: boolean = (args.event.ctrlKey || args.event.metaKey) ? true : ((keyCode === 17) ? true : false)
      // // 67 is the character code for 'C'
      // if (isCtrlKey && keyCode === 67) {
      //   // To prevent copy operation set isHandled to true
      //   args.isHandled = true
      // }
      const keyActions = {
        f3: () => {
          args.event.preventDefault()
          args.isHandled = true
          const so = this.editor.selection.startOffset
          const eo = this.editor.selection.endOffset
          this.editor.selection.moveToPreviousCharacter()
          this.editor.selection.selectCurrentWord()
          const texto = this.editor.selection.text
          if (!texto.trim())
            this.editor.selection.select(so, eo)
          this.$emit('texto', texto.trim() || '%')
        }
      }
      const key = args.event.key.toLowerCase()
      if (keyActions[key]) {
        keyActions[key]()
      }
    }
    // async appendHtml({ state }, payload) {
    //   const bb_rtf = window.btoa(payload)
    //   try {
    //     const sanitizedHtml = await useUseEditor().RtfToHtml({ bb_rtf })
    //     console.log('RtfToHtml', sanitizedHtml)

    //     // if (!sanitizedHtml)         return false

    //     const sfd = await useUseEditor().SystemClipboard(sanitizedHtml)
    //     console.log('SystemClipboard', sfd)
    //     return

    //     state.editor.editor.paste(JSON.stringify(sfd.data))
    //     state.editor.selection.selectAll()
    //     state.editor.selection.characterFormat.fontColor = '#000000'
    //     state.editor.editor.selection.moveToDocumentEnd()

    //     return true
    //   } catch (e) {
    //     console.error(e)
    //   }
    // }
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
