<script lang="ts" setup>
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useModalidadeMedico } from '~/composables/gerencial/useModalidadeMedico'
import { useMedico } from '~/composables/gerencial/useMedico'
import { Icones } from '~/types/system'

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
</script>

<template>
  <ModalPage
    :id
    :title
    :schema
    :icon="Icones.medico"
    :controller
  />
</template>
