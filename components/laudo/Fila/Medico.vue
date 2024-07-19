<script lang="ts" setup>
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useFilaMedico } from '~/composables/laudo/useFilaMedico'
import { useMedico } from '~/composables/gerencial/useMedico'
import { Icones } from '~/types/system'
import { useFila } from '~/composables/laudo/useFila'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const title = 'Associação Fila x Médico'
const controller = useFilaMedico(props.id)
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_depara'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_medico',
    label: 'Médico',
    options: await useMedico().getItemList(),
    validation: 'required',
    outerClass: formClass(12)
  },
  {
    id: 'nr_semana',
    $formkit: 'dropdown',
    name: 'nr_semana',
    label: 'Semana',
    options: await useFila().getSemana(),
    outerClass: formClass(8)
  },
  {
    $formkit: 'time',
    name: 'dt_inicio',
    label: 'H. Início',
    outerClass: formClass(2)
  },
  {
    $formkit: 'time',
    name: 'dt_fim',
    label: 'H. Fim',
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
