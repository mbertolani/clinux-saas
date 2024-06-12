<script lang="ts" setup>
import { useReportExame } from '~/composables/report/useReportExame'

const apiPage = ref(null)
const controller = useReportExame()
</script>

<template>
  <BaseReport
    ref="apiPage"
    :header="{ title: 'Relatório de Exames', icon: 'i-heroicons-document-text' }"
    :controller
  />
</template>
