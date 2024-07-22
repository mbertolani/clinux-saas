<script lang="ts" setup>
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useComplemento } from '~/composables/atendimento/useComplemento'
import { Icones } from '~/types/system'

const title = 'Cadastro de Complementos'
const controller = useComplemento()
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_complemento'
  },
  {
    $formkit: 'text',
    name: 'ds_complemento',
    label: 'Descrição',
    validation: 'required',
    outerClass: formClass(12)
  },
  {
    $formkit: 'toggle',
    name: 'sn_admin',
    label: 'Admin',
    outerClass: formClass(12)
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
    :icon="Icones.complemento"
    :controller
  />
</template>
