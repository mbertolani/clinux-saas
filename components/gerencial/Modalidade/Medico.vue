<script lang="ts" setup>
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useModalidadeMedico } from '~/composables/gerencial/useModalidadeMedico'
import { useMedico } from '~/composables/gerencial/useMedico'
import { useModalidade } from '~/composables/gerencial/useModalidade'
import { Icones } from '~/types/system'
import { ModalDate } from '#components'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const title = 'Associação Modalidade x Médico'
const controller = useModalidadeMedico(props.id)
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_codigo'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_medico',
    label: 'Médico',
    options: await useMedico().getItemList(),
    validation: 'required',
    outerClass: formClass(10)
  },
  {
    $formkit: 'number',
    name: 'nr_valor',
    label: 'Valor',
    number: 'float',
    validation: 'required',
    outerClass: formClass(2)
  }
]
const showRateio = ref(false)
const clickRateio = async (data) => {
  const response = await useModalidade().exec('rateio', data)
  const total = response ? response[0].nr_total : 0
  useMessage().showMessage(`${total} atendimento(s) atualizado(s) !`)
  showRateio.value = false
}
const dataInicio = new Date()
dataInicio.setDate(dataInicio.getDate() - 90)
const valueRateio = {
  cd_modalidade: props.id,
  dt_de: useDateFormat(dataInicio, 'YYYY-MM-DD').value,
  dt_ate: useDateFormat(useNow(), 'YYYY-MM-DD').value
}
const master = (await controller.getTitle()).ds_modalidade
</script>

<template>
  <ModalPage
    :id
    :title
    :schema
    :icon="Icones.medico"
    :controller
  >
    <template #buttons>
      <UButton
        color="primary"
        variant="solid"
        class="mb-2"
        :ui="{ strategy: 'override', inline: 'items-center', rounded: 'rounded-lg' }"
        @click="showRateio = true"
      >
        Rateio
      </UButton>
    </template>
    <ModalDate
      v-model="showRateio"
      :value="valueRateio"
      title="Rateio"
      :master
      @submit="clickRateio"
      @close="showRateio = false"
    />
  </ModalPage>
</template>
