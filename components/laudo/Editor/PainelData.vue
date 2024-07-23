<script lang="ts" setup>
import { useLaudo } from '~/composables/laudo/useLaudo'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
const { teleLaudo } = useRouterStore()
// const data = await useLaudo().doLaudoDados(props.id) as any
const rowData = ref()
useLaudo().doLaudoDados(props.id).then((data) => {
  data.bb_dados = Decode64(data.bb_dados)
  rowData.value = [
    {
      label: 'Data',
      value: formatDate(data.dt_data)
    },
    {
      label: 'Entrega',
      value: formatDate(data.dt_entrega)
    },
    {
      label: 'Protocolo',
      value: data.nr_controle
    },
    {
      label: 'ID',
      value: `PID: ${data.ds_patientuid} AN: ${data.ds_accession}`,
      hide: !data.ds_patientuid || !data.ds_accession
    },
    {
      label: 'Imagem',
      value: formatDate(data.dt_imagem),
      hide: !data.dt_imagem
    },
    {
      label: 'Paciente',
      value: `${data.ds_paciente} (${formatDate(data.dt_nascimento)})`
    },
    {
      label: 'Procedimento',
      value: data.ds_procedimento
    },
    {
      label: 'Contraste',
      value: `${data.ds_contraste || 'NAO'} (Imagens: ${data.nr_filme || '0'})`,
      hide: !teleLaudo
    },
    {
      label: 'Empresa',
      value: data.ds_empresa
    },
    {
      label: 'Dados Clínicos',
      value: data.bb_dados || 'NAO INFORMADO'
    },
    {
      label: 'Observação',
      value: data.ds_observacao,
      hide: !teleLaudo || !data.ds_observacao
    }
  ].filter(p => !p.hide)
})
const columnDefs = [
  {
    field: 'label',
    headerName: 'Campo',
    width: 68
  },
  {
    field: 'value',
    headerName: 'Descrição',
    tooltipValueGetter: p => p.value
  }
]

const onFirstDataRendered = async ({ api }) => {
  api.sizeColumnsToFit()
}
</script>

<template>
  <!-- <UCard
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
  </UCard> -->
  <BaseGridCore
    style="height: 100%; width: 100%;"
    :column-defs
    :row-data
    :pagination="false"
    :tooltip-show-delay="500"
    @first-data-rendered="onFirstDataRendered"
  />
</template>
