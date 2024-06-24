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
const { getEmpresa, getEmpresas } = useLaudo()
const data = reactive({
  cd_empresa: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await getEmpresa(id)
    },
    options: async () => {
      return await getEmpresas()
    }
  }
})
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'dropdown',
    id: 'empresa',
    name: 'cd_empresa',
    placeholder: 'Empresa',
    bind: '$cd_empresa',
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
