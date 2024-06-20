<script setup lang="ts">
import type { MonacoEditor } from '#components'

const modelValue = defineModel({ type: String, required: true })

const options = {
  automaticLayout: true,
  readOnly: false,
  quickSuggestions: false, // Desativa sugestões rápidas
  hover: false, // Desativa a exibição de informações ao passar o mouse
  parameterHints: false, // Desativa dicas de parâmetros de funções
  quickInfo: false, // Desativa informações rápidas sobre símbolos
  suggestOnTriggerCharacters: false, // Desativa sugestões ao digitar caracteres de gatilho
  spellcheck: false // Desativa a verificação ortográfica, se aplicável
}
const colorMode = useColorMode()

const loadEditor = (payload) => {
  const theme = colorMode.value === 'dark' ? 'vs-dark' : 'vs'
  payload.updateOptions({ theme })
}
</script>

<template>
  <MonacoEditor
    v-model="modelValue"
    :options
    lang="typescript"
    style="width: 100%; height: calc(100vh - 180px);"
    @load="loadEditor"
  >
    Carregando...
  </MonacoEditor>
</template>
