<script setup lang="ts">
const schema = [
  {
    $formkit: 'dropdown',
    name: 'em.sn_ativo',
    placeholder: 'Ativo',
    options: [
      { value: true, label: 'Ativo' },
      { value: false, label: 'Inativo' }
    ]
  }
]
</script>

<template>
  <BaseFilter
    :schema
  />
</template>
