<script setup lang="ts">
// import { FormKitSchema } from '@formkit/vue'
import { useEmpresa } from '~/composables/gerencial/useEmpresa'
import { BaseForm } from '#components'

const props = defineProps({
  header: {
    type: Object,
    required: true
  },
  endpoint: {
    type: String,
    required: true
  },
  schema: {
    type: Array,
    required: true
  }
})
defineEmits(['update:title', 'update:description'])
defineExpose({
})
const toast = useToast()
const modal = useModal()

async function openModal() {
  modal.open(BaseForm, {
    title: props.header.title,
    schema: props.schema,
    data: item.value,
    async onSuccess(data) {
      if (item.value) {
        await api.update(Object.values(item.value)[0], data)
      } else {
        await api.create(data)
      }
      if (api.status) {
        modal.close()
        toast.add({
          title: 'Success !',
          id: 'modal-success'
        })
      } else {
        toast.add({
          title: 'Error !',
          id: 'modal-error',
          description: JSON.stringify(api.errors)
        })
      }
    },
    onClose() {
      console.log('Close')
      modal.close()
    }
  })
}
const columnDefs = ref(null)
const rowData = ref(null)
const { api, item, items, grid } = useEmpresa()
await api.getAll()
await api.getGrid()
rowData.value = items.value
columnDefs.value = grid.value

const onSelectionChanged = (event) => {
  console.log(event.api.getSelectedRows())
}

function getFieldName(schema) {
  return schema.map(item => item.name).join(',')
}
const onRowDoubleClicked = async (params) => {
  console.log('onRowDoubleClicked', params.node.id)
  await api.get(params.node.id, getFieldName(props.schema))
  if (item.value)
    openModal()
}
</script>

<template>
  <UPage class="mx-4">
    <UPageHeader
      :title="props.header.title"
      :description="props.header.description"
    >
      <BaseFilter v-if="false" />
      <UButton
        v-if="false"
        label="Abrir"
        @click="openModal"
      />
    </UPageHeader>

    <UPageBody class="mt-0">
      <BaseGrid
        :endpoint="props.endpoint"
        :row-data="rowData"
        :column-defs="columnDefs"
        :on-selection-changed="onSelectionChanged"
        :on-row-double-clicked="onRowDoubleClicked"
      />
    </UPageBody>

    <!-- <template
      #right
    >
      Right
    </template>
    <template
      #left
    >
      Left
    </template> -->
  </UPage>
</template>
