<script lang="ts" setup>
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { useMedico } from '~/composables/gerencial/useMedico'

const props = defineProps({
  cols: {
    type: Number,
    default: 12
  }
})
const { find, get, getAll } = useMedico()
const data = reactive({
  cd_medico: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return getFieldItem(await get(id))
    },
    options: async () => {
      if (getNode('modalidade'))
        return getFieldList(await find('modalidade', { cd_modalidade: getNode('modalidade').value }))
      else if (getNode('sala'))
        return getFieldList(await find('sala', { cd_sala: getNode('sala').value }))
      else
        return getFieldList(await getAll())
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
