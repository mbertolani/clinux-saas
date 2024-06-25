<script lang="ts" setup>
import { useLaudo } from '~/composables/laudo/useLaudo'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
const { teleLaudo } = useRouterStore()
const data = await useLaudo().doLaudoDados(props.id) as any
data.bb_dados = Decode64(data.bb_dados)
</script>

<template>
  <UCard
    class="my-2 mx-2"
    :ui="{ body: { padding: 'px-0 py-0 sm:p-0' } }"
  >
    <div>
      DATA:
      {{ formatDate(data.dt_data) }} - {{ data.nr_controle }}
      {{ data.sn_urgente === 'SIM' ? ' - URGENTE' : '' }}
    </div>
    <div
      v-if="
        data.ds_patientuid
          || data.ds_accession"
    >
      PID: {{ data.ds_patientuid }} AN:
      {{ data.ds_accession }}
    </div>
    <div v-if="data.dt_imagem">
      D. IMAGEM: {{ formatDate(data.dt_imagem) }}
    </div>
    <div>
      {{ data.ds_paciente }} ({{ formatDate(data.dt_nascimento) }})
    </div>
    <div>
      {{ data.ds_procedimento }}
    </div>
    <div v-if="teleLaudo">
      CONTRASTE: {{ data.ds_contraste || 'NAO' }} IMAGENS:
      {{ data.nr_filme || '0' }}
    </div>
    <div>
      {{ data.ds_empresa }}
    </div>
    <div>
      D. CLINICOS:
      {{ data.bb_dados || 'NAO INFORMADO' }}
    </div>
    <div v-if="teleLaudo">
      OBS: {{ data.ds_observacao }}
    </div>
  </UCard>
</template>
