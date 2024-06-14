<script setup lang="ts">
import { FormKitSchema } from '@formkit/vue'
import type { FormKitSchemaDefinition } from '@formkit/core'

const props = defineProps({
  schema: {
    type: Array as () => FormKitSchemaDefinition[],
    required: true
  },
  controller: {
    type: Object,
    required: true
  }
})
const { api, items: rowData } = props.controller

const onSubmit = async (_data: any) => {
  await api.getAll(_data)
  emit('submit', rowData.value)
}
const onClose = () => {
  emit('close')
}
const emit = defineEmits(['submit', 'close'])

const model = ref(null)
const data = ref(null)
</script>

<template>
  <FormKit
    v-model="model"
    dirty-behavior="compare"
    type="form"
    :data="data"
    :actions="false"
    @submit="onSubmit"
    @close="onClose"
  >
    <FormKitSchema
      :schema="schema as FormKitSchemaDefinition"
    />
  </FormKit>
  <pre
    v-if="false"
    wrap
  >{{ model }}</pre>
</template>
