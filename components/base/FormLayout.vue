<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'

const emit = defineEmits(['submit', 'close'])

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  controller: {
    type: Object,
    required: true
  },
  schema: {
    type: Array as () => FormKitSchemaDefinition,
    required: true
  },
  data: {
    type: Object,
    required: false
  }
})

const model = ref(null)
model.value = props.id ? await props.controller.get(props.id, getFieldName(props.schema)) : {}

const onSubmit = async (_data: any) => {
  const item = (props.id) ? await props.controller.update(props.id, _data) : await props.controller.create(_data)
  if (item)
    emit('submit', item)
}
</script>

<template>
  <FormKit
    id="form-kit"
    v-slot="{ state: { dirty } }"
    :value="model"
    dirty-behavior="compare"
    type="form"
    :actions="false"
    @submit="onSubmit"
  >
    <div class="flex items-center justify-center">
      <div class="container max-w-screen-lg mx-auto">
        <div class="grid gap-x-4 grid-cols-1 md:grid-cols-12">
          <FormKitSchema
            :schema
            :data
          />
          <FormKit
            type="submit"
            label="Salvar"
            :disabled="!dirty"
          />
        </div>
      </div>
    </div>
  </FormKit>
</template>

<style>
.formkit-input {
  text-transform: uppercase;
}
</style>
