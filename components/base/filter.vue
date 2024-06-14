<script setup lang="ts">
import { FormKitSchema } from '@formkit/vue'
import type { FormKitSchemaDefinition } from '@formkit/core'

defineProps({
  schema: {
    type: Array as () => FormKitSchemaDefinition[],
    required: true
  },
  filter: {
    type: Object,
    required: false
  },
  data: {
    type: Object,
    required: false
  }
})
const emit = defineEmits(['submit', 'close'])
</script>

<template>
  <FormKit
    :value="filter"
    dirty-behavior="compare"
    type="form"
    :data="data"
    :actions="false"
    @submit="emit('submit')"
  >
    <FormKitSchema
      :schema="schema as FormKitSchemaDefinition"
    />
  </FormKit>
</template>
