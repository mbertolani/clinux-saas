<script lang="ts" setup>
import { useReportLaudo } from '~/composables/report/useReportLaudo'

const apiPage = ref(null)
const { useReportLaudoAtrasado: controller } = useReportLaudo()
</script>

<template>
  <BaseReport
    ref="apiPage"
    :header="{ title: 'Relatório Laudo Atrasado', icon: 'i-heroicons-document-text' }"
    :controller
  />
</template>
