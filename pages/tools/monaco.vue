<script setup lang="ts">
import type { MonacoDiffEditor } from '#components'

// const editorRef = ref(null) // ref<InstanceType<typeof MonacoDiffEditor>>()

// const options: monaco.editor.IEditorConstructionOptions = {
const options = {
  automaticLayout: true,
  theme: useColorMode().value === 'dark' ? 'vs-dark' : 'vs',
  scrollBeyondLastLine: false,
  minimap: {
    enabled: true
  },
  wordWrap: 'on',
  wordWrapColumn: 80,
  wrappingIndent: 'same',
  wrappingStrategy: 'advanced',
  renderWhitespace: 'all',
  renderLineHighlight: 'all'
}

const originalVal = 'Hello nuxt-monaco-editor.'
const modifiedVal = ref('Hello nuxt-monaco-editor!!!')

const editorRef = ref(null)
const colorMode = useColorMode()

const setEditorTheme = () => {
  const theme = colorMode.value === 'dark' ? 'vs-dark' : 'vs' // 'vs' para tema claro
  if (editorRef.value?.$editor) {
    editorRef.value.$editor.updateOptions({ theme })
  }
}

watch(colorMode, () => setEditorTheme())
</script>

<template>
  <MonacoDiffEditor
    ref="editorRef"
    v-model="modifiedVal"
    :original="originalVal"
    :options="options"
    style="width: 100%; height: calc(100vh - 120px);"
  >
    Carregando...
  </MonacoDiffEditor>
</template>
