<script lang="ts" setup>
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { useLaudo } from '~/composables/laudo/useLaudo'

const props = defineProps({
  cols: {
    type: Number,
    default: 12
  }
})
const { getModalidade, getModalidades } = useLaudo()
const data = reactive({
  cd_modalidade: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await getModalidade(id)
    },
    options: async () => {
      return await getModalidades()
    }
  }
})
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'dropdown',
    id: 'modalidade',
    name: 'mo.cd_modalidade',
    placeholder: 'Modalidade',
    bind: '$cd_modalidade',
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
