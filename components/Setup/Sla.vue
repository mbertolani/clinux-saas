<script lang="ts" setup>
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useSla } from '~/composables/gerencial/useSla'
import { Icones } from '~/types/system'

const title = 'Cadastro de Sla'
const controller = useSla()
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_sla'
  },
  {
    $formkit: 'text',
    name: 'ds_sla',
    label: 'Descrição',
    validation: 'required',
    outerClass: formClass(8)
  },
  {
    $formkit: 'number',
    name: 'nr_tempo',
    label: 'Tempo',
    outerClass: formClass(2)
  },
  {
    $formkit: 'color',
    name: 'ds_color',
    label: 'Cor',
    outerClass: formClass(2)
  },
  {
    $formkit: 'toggle',
    name: 'sn_ativo',
    label: 'Ativo',
    outerClass: formClass(12)
  }
]
</script>

<template>
  <ModalPage
    :title
    :schema
    :icon="Icones.sla"
    :controller
  />
</template>
