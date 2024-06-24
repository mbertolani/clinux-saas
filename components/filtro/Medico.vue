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
const { getMedico, getMedicos } = useLaudo()
const data = reactive({
  cd_medico: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await getMedico(id)
    },
    options: async () => {
      return await getMedicos(getNode('modalidade').value as number)
    }
  }
})
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'dropdown',
    id: 'medico',
    name: 'cd_medico',
    placeholder: 'Medico',
    bind: '$cd_medico',
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
