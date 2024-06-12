<script lang="ts" setup>
import { useReportLaudo } from '~/composables/report/useReportLaudo'

const apiPage = ref(null)
const { useReportLaudoFila: controller } = useReportLaudo()
</script>

<template>
  <BaseReport
    ref="apiPage"
    :header="{ title: 'Relatório Fila de Laudo', icon: 'i-heroicons-document-text' }"
    :controller
  />
</template>
