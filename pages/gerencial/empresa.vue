<script setup lang="ts">
// import { FormKitMessages } from '@formkit/vue'

const schema = [
  {
    $formkit: 'text',
    name: 'cd_empresa',
    label: 'Código',
    if: 'false'
  },
  {
    $formkit: 'text',
    name: 'ds_empresa',
    label: 'Descrição',
    validation: 'required',
    autofocus: true
  },
  {
    $formkit: 'text',
    name: 'ds_razao',
    label: 'Razão Social'
  },
  {
    $formkit: 'mask',
    name: 'ds_cnpj',
    mask: '##.###.###/####-##',
    label: 'CNPJ'
  }
]
</script>

<template>
  <BasePage
    :header="{ title: 'Empresas', description: 'Listagem de empresas' }"
    :schema="schema"
    endpoint="/gerencial/empresa"
  />
</template>
