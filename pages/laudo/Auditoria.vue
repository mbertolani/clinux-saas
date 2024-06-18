<script lang="ts" setup>
import { useLaudo } from '~/composables/laudo/useLaudo'

const title = 'Auditoria'
const apiPage = ref(null)
const apiEditor = ref(null)
const idEditor = ref<number>(0)
const controller = useLaudo()
const loadEditor = (editor) => {
  apiEditor.value = editor
}
</script>

<template>
  <BaseReport
    ref="apiPage"
    :header="{ title, icon: 'i-heroicons-document-text' }"
    :controller
  >
    <BaseEditor
      v-show="idEditor"
      @load="loadEditor($event)"
    />
  </BaseReport>
</template>
