<script lang="ts" setup>
import { useReportLaudo } from '~/composables/report/useReportLaudo'

const apiPage = ref(null)
const { useReportLaudoAnalitico: controller } = useReportLaudo()
</script>

<template>
  <BaseReport
    ref="apiPage"
    :header="{ title: 'Relatório Laudo Analítico', icon: 'i-heroicons-document-text' }"
    :controller
  />
</template>
