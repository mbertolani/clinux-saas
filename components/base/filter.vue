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
</script>

<template>
  <FormKit
    :value="filter"
    type="form"
    :data="data"
    :actions="false"
  >
    <BaseLayout>
      <FormKitSchema
        :schema="schema as FormKitSchemaDefinition"
      />
    </BaseLayout>
  </FormKit>
</template>
