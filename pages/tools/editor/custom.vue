<template>
  <ejs-documenteditorcontainer
    ref="documenteditorcontainer"
    :service-url="serviceUrl"
    :enable-toolbar="true"
    :show-properties-pane="false"
    :auto-resize-on-visibility-change="true"
    style="width: 100%"
    height="80vh"
    :is-read-only="false"
    :enable-print="true"
    :enable-sfdt-export="true"
    :enable-selection="true"
    :enable-context-menu="true"
    :enable-search="true"
    :enable-options-pane="true"
    :enable-word-export="true"
    :enable-text-export="true"
    :enable-editor="true"
    :enable-image-resizer="true"
    :enable-editor-history="true"
    :enable-hyperlink-dialog="true"
    :enable-table-dialog="true"
    :enable-bookmark-dialog="true"
    :enable-table-of-contents-dialog="true"
    :enable-page-setup-dialog="true"
    :enable-style-dialog="true"
    :enable-list-dialog="true"
    :enable-paragraph-dialog="true"
    :enable-font-dialog="true"
    :enable-table-properties-dialog="true"
    :enable-borders-and-shading-dialog="true"
    :enable-table-options-dialog="true"
    :toolbar-items="[
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
    ]"
  />
</template>

<script>
import {
  DocumentEditorContainerComponent,
  Toolbar
} from '@syncfusion/ej2-vue-documenteditor'
import { registerLicense } from '@syncfusion/ej2-base'

registerLicense(
  useRuntimeConfig().public.syncfusionKey
)
// https://ej2.syncfusion.com/vue/documentation/document-editor/how-to/enable-ruler-in-document-editor-component
export default {
  components: {
    'ejs-documenteditorcontainer': DocumentEditorContainerComponent
  },
  provide: {
    DocumentEditorContainer: [Toolbar]
  },
  data() {
    return {
      settings: { optimizeSfdt: false },
      serviceUrl: 'https://localhost:7190/DocumentEditor/'
    }
  },
  methods: {
    saveAsSfdt: function () {
      // console.log(this.$refs.documenteditorcontainer.ej2Instances.documentEditor);
      // this.$refs.documenteditorcontainer.ej2Instances.documentEditor.save('output', 'Sfdt');
    },
    loadDocument() {
      // this.$refs.documenteditorcontainer.ej2Instances.documentEditor.open(response.data);
    }
  }
}
</script>

<style>
@import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-documenteditor/styles/material.css";
</style>
