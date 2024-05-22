<script setup lang="ts">
import { ref, computed } from 'vue'
</script>

<script lang="ts">
import {
  DocumentEditorContainerComponent,
  Toolbar
} from '@syncfusion/ej2-vue-documenteditor'
// import { showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { registerLicense } from '@syncfusion/ej2-base'

const serviceUrl = computed(() => {
  return 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/'
})
const documentEditor = ref(null)
const sfdt: string = `{
                    "sections": [
                        {
                            "blocks": [
                                {
                                    "inlines": [
                                        {
                                            "characterFormat": {
                                                "bold": true,
                                                "italic": true
                                            },
                                            "text": "Hello World"
                                        }
                                    ]
                                }
                            ],
                            "headersFooters": {
                            }
                        }
                    ]
                }`
const myEditor = computed(() => {
  return documentEditor.value?.ej2Instances.documentEditor
})

const colorMode = useColorMode()

watch(
  () => colorMode.value,
  () => {
    console.log('colorMode changed', myEditor)
    // if (colorMode.value === "dark") {
    //   myEditor.element.querySelector(".e-de-background").style.backgroundColor =
    //     "rgb(127, 127, 127)";
    // } else {
    //   myEditor.element.querySelector(".e-de-background").style.backgroundColor =
    //     "rgb(255, 255, 255)";
    // }
  }
)
const click = () => {
  myEditor.value.open(sfdt)
}
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXpfeXRdRGhZWUxxWEM='
)

export default {
  provide: {
    DocumentEditorContainer: [Toolbar]
  },
  data() {
    return {
      serviceUrl: 'https://localhost:7190/DocumentEditor/'
    }
  }
}
</script>

<template>
  <div>
    <button @click="click">
      Click me
    </button>
    <DocumentEditorContainerComponent
      ref="documentEditor"
      height="600"
      :service-url="serviceUrl"
      :enable-toolbar="true"
    />
  </div>
</template>

<style>
@import "../../../node_modules/@syncfusion/ej2-base/styles/tailwind-dark.css";
@import "../../../node_modules/@syncfusion/ej2-buttons/styles/tailwind-dark.css";
@import "../../../node_modules/@syncfusion/ej2-inputs/styles/tailwind-dark.css";
@import "../../../node_modules/@syncfusion/ej2-popups/styles/tailwind-dark.css";
@import "../../../node_modules/@syncfusion/ej2-lists/styles/tailwind-dark.css";
@import "../../../node_modules/@syncfusion/ej2-navigations/styles/tailwind-dark.css";
@import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/tailwind-dark.css";
@import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/tailwind-dark.css";
@import "../../../node_modules/@syncfusion/ej2-vue-documenteditor/styles/tailwind-dark.css";
</style>
