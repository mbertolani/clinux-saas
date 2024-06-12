<script lang="ts" setup>
import { useReportLaudo } from '~/composables/report/useReportLaudo'

const apiPage = ref(null)
const { useReportLaudoSintetico: controller } = useReportLaudo()
</script>

<template>
  <BaseReport
    ref="apiPage"
    :header="{ title: 'Relatório Laudo Sintético', icon: 'i-heroicons-document-text' }"
    :controller
  />
</template>
