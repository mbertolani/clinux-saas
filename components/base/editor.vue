<script lang="ts">
import type { DocumentEditor, DocumentEditorContainer } from '@syncfusion/ej2-vue-documenteditor' // CustomToolbarItemModel, ToolbarItem
import { registerLicense } from '@syncfusion/ej2-base'
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-vue-documenteditor'
import { useStorage } from '@vueuse/core'
import type { PdfSection } from '@syncfusion/ej2-pdf-export'
import { PdfBitmap, PdfDocument, PdfPageOrientation, PdfPageSettings, SizeF } from '@syncfusion/ej2-pdf-export'
// import { Language } from './editor/language'
// import { localizeSyncfusion } from './editor/syncfusionLocalizationManager'
// "@syncfusion/ej2-locale": "latest",
// "cldr-data": "^36.0.2",
// localizeSyncfusion(Language.Portuguese)
// import { ptBr } from '~/utils/editor'
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
  emits: ['load', 'save', 'close', 'texto', 'export'],
  data() {
    return {
      sfdt: '',
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
    // this.editor.defaultLocale = ptBr
    // this.editor.locale = 'pt-BR'
    this.editor.enableLocalPaste = false
    this.editor.keyDown = this.keyDown
    this.$emit('load', this)
    this.setToolBar()
    window.addEventListener('resize', this.updateContainerSize)
    window.addEventListener('beforeunload', this.saveDraft)
    setTimeout(() => {
      this.updateContainerSize()
    }, 100)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateContainerSize)
    window.removeEventListener('beforeunload', this.saveDraft)
    // this.saveDraft
  },
  methods: {
    close() {
      this.clear()
      useStorage('draft', null).value = null
    },
    change() {
      return this.editor.serialize() !== this.sfdt
    },
    show() {
      this.editor.focusIn()
      this.updateContainerSize()
      this.sfdt = this.editor.serialize()
      this.loadDraft()
      this.hideShadingColor(false)
    },
    clear() {
      this.editor.openBlank()
      this.show()
    },
    async load(payload?: string, data?: Array<{ fieldName: string, value: string }>) {
      if (!payload) {
        this.clear()
        return
      }
      const response = await useEditor().Import(payload)
      this.editor.open(response)
      this.editor.selection.moveToDocumentEnd()
      this.show()
      if (data)
        this.editorMerge(data)
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
    async export() {
      return await this.editorExport()
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
      this.sfdt = this.editor.serialize()
      return response as Blob
    },
    saveDraft() {
      useStorage('draft', this.editor.serialize())
    },
    loadDraft() {
      if (useStorage('draft', null).value) {
        useMessage().openDialog({
          title: 'Rascunho Encontrado',
          description: 'Deseja recuperar o texto digitado ?',
          okClick: () => this.editor.open(JSON.parse(useStorage('draft', null).value)),
          noClick: () => this.close()
        })
      }
    },
    async updateContainerSize() {
      const containerPanel = document.getElementById('documentEditorContainer')
      if (containerPanel) {
        await new Promise(resolve => setTimeout(resolve, 500))
        containerPanel.style.height = (window.innerHeight - 86) + 'px'
        containerPanel.style.width = '100%'
      }
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
        {
          prefixIcon: 'e-print',
          tooltipText: 'Imprimir Documento',
          text: 'Imprimir',
          id: 'CustomPrint',
          cssClass: 'e-de-toolbar-btn'
        },
        // {
        //   prefixIcon: 'e-export-pdf',
        //   tooltipText: 'Exportar Documento',
        //   text: 'Exportar',
        //   id: 'CustomExport',
        //   cssClass: 'e-de-toolbar-btn'
        // },
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
          this.$emit('save', this)
        } else if (args.item.id === 'CustomClose') {
          this.$emit('close', this)
        } else if (args.item.id === 'CustomPrint') {
          this.editorPrint()
        } else if (args.item.id === 'CustomExport') {
          this.editorExport('file.pdf')
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
    },
    searchReplace(payload) {
      Object.entries(payload).forEach(async ([key, value]) => {
        this.editor.search.findAll(key, 'WholeWord')
        // this.editor.search.searchResults.replaceAll(value as string)
        if (this.editor.search.searchResults.length > 0)
          this.editor.editor.insertText(String(value || ' '))
      })
      this.editor.search.searchResults.clear()
      this.editor.selection.moveToParagraphEnd()
      this.editor.focusIn()
    },
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
    editorPrint() {
      this.editor.print()
    },
    convertDataFormat(data) {
      const result = []
      for (const key in data)
        result.push({ fieldName: key, value: String(data[key]) })
      return result
    },
    hideShadingColor(payload: boolean = true) {
      this.container.documentEditorSettings.formFieldSettings.shadingColor = payload ? '#FFFFFF' : '#CCCCCC'
    },
    editorMerge(mergeData?: Array<{ fieldName: string, value: string }>) {
      this.hideShadingColor()
      this.container.documentEditor.importFormData(this.convertDataFormat(mergeData))
    },
    async editorExport(filename?: string) {
      return new Promise((resolve, reject) => {
        const pdfdocument = new PdfDocument()
        const count = this.editor.pageCount
        this.editor.documentEditorSettings.printDevicePixelRatio = 2
        let loadedPage = 0
        for (let i = 1; i <= count; i++) {
          setTimeout(() => {
            const format = 'image/jpeg'
            // Getting pages as image
            const image = this.editor.exportAsImage(i, format as any)
            image.onload = async function () {
              const imageHeight = parseInt(
                image.style.height.toString().replace('px', '')
              )
              const imageWidth = parseInt(
                image.style.width.toString().replace('px', '')
              )
              const section = pdfdocument.sections.add() as PdfSection
              const settings = new PdfPageSettings(0)
              if (imageWidth > imageHeight) {
                settings.orientation = PdfPageOrientation.Landscape
              }
              settings.size = new SizeF(imageWidth, imageHeight)
              section.setPageSettings(settings)
              const page = section.pages.add()
              const graphics = page.graphics
              const imageStr = image.src.replace('data:image/jpeg;base64,', '')
              const pdfImage = new PdfBitmap(imageStr)
              graphics.drawImage(pdfImage, 0, 0, imageWidth, imageHeight)
              loadedPage++
              if (loadedPage == count) {
                try {
                  if (filename) {
                    pdfdocument.save(filename)
                    resolve(null)
                  } else {
                    const document = await pdfdocument.save()
                    const data = await convertToBase64Image(document.blobData)
                    resolve(Decode64(data.replace('data:application/pdf;base64,', '')))
                  }
                } catch (e) {
                  reject(e)
                }
              }
            }
          }, 500)
        }
      })
    }
  }
}
</script>

<template>
  <ejs-documenteditor
    id="documentEditorContainer"
    ref="documentEditor"
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
