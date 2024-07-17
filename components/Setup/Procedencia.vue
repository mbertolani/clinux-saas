<script lang="ts" setup>
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useProcedencia } from '~/composables/atendimento/useProcedencia'
import { Icones } from '~/types/system'

const title = 'Cadastro de Procedência'
const controller = useProcedencia()
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_procedencia'
  },
  {
    $formkit: 'text',
    name: 'ds_procedencia',
    label: 'Descrição',
    validation: 'required',
    outerClass: formClass(10)
  },
  {
    $formkit: 'number',
    name: 'nr_tempo',
    label: 'Tempo',
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
    :icon="Icones.procedencia"
    :controller
  />
</template>
