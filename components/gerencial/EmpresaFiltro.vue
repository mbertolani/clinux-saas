<script setup lang="ts">
const schema = [
  {
    $formkit: 'dropdown',
    name: 'em.sn_empresa',
    placeholder: 'Ativo',
    outerClass: formClass(2),
    selectionRemovable: true,
    options: [
      { value: true, label: 'ATIVO' },
      { value: false, label: 'INATIVO' }
    ]
  }
]
</script>

<template>
  <BaseFilter
    :schema
  />
</template>
