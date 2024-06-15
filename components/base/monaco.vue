<script setup lang="ts">
import type { MonacoDiffEditor } from '#components'

defineProps({
  originalVal: {
    type: String,
    required: true
  },
  modifiedVal: {
    type: String,
    required: true
  }
})

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

const editorRef = ref(null)
const colorMode = useColorMode()

const setEditorTheme = () => {
  const theme = colorMode.value === 'dark' ? 'vs-dark' : 'vs'
  if (editorRef.value?.$editor) {
    editorRef.value.$editor.updateOptions({ theme })
  }
}

watch(colorMode, () => setEditorTheme())
</script>

<template>
  <MonacoDiffEditor
    ref="editorRef"
    :original="originalVal"
    :options="options"
    style="width: 100%; height: calc(100vh - 120px);"
  >
    Carregando...
  </MonacoDiffEditor>
</template>
