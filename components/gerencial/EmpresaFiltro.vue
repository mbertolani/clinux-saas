<script setup lang="ts">
import { useEmpresa } from '~/composables/gerencial/useEmpresa'

const schema = [
  {
    $formkit: 'select',
    name: 'sn_ativo',
    placeholder: 'Ativo',
    options: [
      { value: 'true', label: 'Ativo' },
      { value: 'false', label: 'Inativo' }
    ]
  }
]
const controller = useEmpresa()
</script>

<template>
  <BaseFilter
    :schema
    :controller
  />
</template>
