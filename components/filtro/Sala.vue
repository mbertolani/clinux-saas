<script lang="ts" setup>
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { useSala } from '~/composables/gerencial/useSala'

const props = defineProps({
  cols: {
    type: Number,
    default: 12
  }
})
const { get, getAll } = useSala()
const data = reactive({
  cd_sala: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return getFieldItem(await get(id))
    },
    options: async () => {
      return getFieldList(await getAll(), 'cd_sala', 'ds_sala')
    }
  }
})
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'dropdown',
    id: 'sala',
    name: 'cd_sala',
    placeholder: 'Sala',
    bind: '$cd_sala',
    selectionRemovable: true,
    outerClass: formClass(props.cols)
  }
]
</script>

<template>
  <FormKitSchema
    :schema
    :data
  />
</template>
