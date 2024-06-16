<script setup lang="ts">
import type { MonacoDiffEditor } from '#components'

const modifiedVal = defineModel({ type: String, required: true })
defineProps({
  id: {
    type: Number,
    required: true
  },
  originalVal: {
    type: String,
    required: true
  }
})

const editorOptions = {
  automaticLayout: true,
  theme: useColorMode().value === 'dark' ? 'vs-dark' : 'vs',
  scrollBeyondLastLine: false,
  minimap: {
    enabled: true
  },
  wrappingIndent: 'same',
  wrappingStrategy: 'advanced',
  renderLineHighlight: 'all'
}

// const modified = ref()
const editorRef = ref(null)
const colorMode = useColorMode()

const setEditorTheme = () => {
  const theme = colorMode.value === 'dark' ? 'vs-dark' : 'vs'
  if (editorRef.value?.$editor) {
    editorRef.value.$editor.updateOptions({ theme })
  }
}
// watch(colorMode, () => setEditorTheme())
// watch(() => props.id, () => {
//   modified.value = props.modifiedVal
// })
const loadEditor = () => {
  setEditorTheme()
  editorRef.value.$editor.updateOptions({ readOnly: true })
}
// modified.value = props.modifiedVal
</script>

<template>
  <MonacoDiffEditor
    ref="editorRef"
    v-model="modifiedVal"
    :original="originalVal"
    :options="editorOptions"
    style="width: 100%; height: calc(100vh - 120px);"
    @load="loadEditor"
  >
    Carregando...
  </MonacoDiffEditor>
</template>
