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
    required: false
  },
  schema: {
    type: Array as () => FormKitSchemaDefinition,
    required: true
  },
  data: {
    type: Object,
    required: false
  },
  value: {
    type: Object,
    required: false
  },
  group: {
    type: Object,
    required: false
  }
})

const model = ref(null)

if (props.controller)
  model.value = props.id ? await props.controller.get(props.id, getFieldName(props.schema)) : props.value
else
  model.value = props.value

if (props.group)
  model.value = setSchemaGroup(model.value, props.group)

const onSubmit = async (_data: any) => {
  if (props.group)
    _data = getSchemaGroup(_data)
  if (props.controller) {
    const item = (props.id) ? await props.controller.update(props.id, _data) : await props.controller.create(_data)
    if (item)
      emit('submit', item)
  } else {
    emit('submit', _data)
  }
}
// @node="onNode"
// const onNode = (node: any) => {
//   node.on('mounted', async (payload) => {
//     let model = null
//     if (props.value)
//       model = props.value
//     if (props.controller)
//       model = props.id ? await props.controller.get(props.id, getFieldName(props.schema)) : props.value
//     if (props.group)
//       model = setSchemaGroup(model, payload.origin.value)
//     node.input(model)
//   })
// }
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
    <div :class="formClass()">
      <slot />
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
  </FormKit>
</template>

<style>
.formkit-input {
  text-transform: uppercase;
}
</style>
