<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'

const model = defineModel({ type: Object })
const emit = defineEmits(['submit'])

const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'datepicker',
    name: 'dt_de',
    placeholder: 'Data',
    format: 'DD/MM/YYYY',
    valueFormat: 'YYYY-MM-DD',
    outerClass: formClass(2)
  }
]
</script>

<template>
  <FormKit
    id="apiForm"
    v-model="model"
    type="form"
    :actions="false"
    @submit="emit('submit')"
  >
    <BaseLayout>
      <FormKitSchema
        :schema
      />
    </BaseLayout>
  </FormKit>
</template>
