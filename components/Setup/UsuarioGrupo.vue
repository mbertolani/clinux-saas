<script lang="ts" setup>
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useUsuarioGrupo } from '~/composables/gerencial/useUsuarioGrupo'
import { Icones } from '~/types/system'

const title = 'Cadastro de Grupos de Usuários'
const controller = useUsuarioGrupo()
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_grupo'
  },
  {
    $formkit: 'text',
    name: 'ds_grupo',
    label: 'Descrição',
    validation: 'required',
    outerClass: formClass(12)
  },
  {
    $formkit: 'toggle',
    name: 'sn_informatica',
    label: 'Administrador',
    outerClass: formClass(12)
  }
]
</script>

<template>
  <ModalPage
    :title
    :schema
    :icon="Icones.password"
    :controller
  />
</template>
