<script lang="ts" setup>
import { useReportAtendimento } from '~/composables/report/useReportAtendimento'

const apiPage = ref(null)
const controller = useReportAtendimento()
</script>

<template>
  <BaseReport
    ref="apiPage"
    :header="{ title: 'Relatório de Atendimentos', icon: 'i-heroicons-document-text' }"
    :controller
  />
</template>
