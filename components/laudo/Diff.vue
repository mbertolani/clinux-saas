<script setup lang="ts">
import { ModalFullScreen } from '#components'
import { useLaudo } from '~/composables/laudo/useLaudo'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['close'])
const rowData = ref<any[]>([])
const originalVal = ref<string>('')
const modifiedVal = ref<string>('')

const atualizaMerge = async (id: number) => {
  console.log('atualizaMerge', id)
  const response = await useLaudo().find('merge', { cd_laudo: props.id, cd_codigo: id })
  if (response.length) {
    originalVal.value = await useEditor().RtfToTxt({ bb_rtf: response[0].bb_old, format: 'ansi' })
    originalVal.value = await useEditor().RtfToTxt({ bb_rtf: response[0].bb_new, format: 'ansi' })
  }
}
function formatDateTime(payload: string) {
  return payload?.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*/, '$3/$2/$1 $4:$5')
}
const columnDefs = [
  { field: 'dt_laudo', headerName: 'Data', width: useGrid().dataTypeWidth('ftDateTime'), valueFormatter: p => formatDateTime(p.value) },
  { field: 'ds_funcionario', headerName: 'Usuário', width: 500 }
]
rowData.value = await useLaudo().find('merge', { cd_laudo: props.id })
if (rowData.value.length)
  atualizaMerge(rowData.value[0].cd_codigo)
</script>

<template>
  <ModalFullScreen
    title="Alterações do Laudo"
    :fullscreen="true"
    @close="emit('close')"
  >
    <UPage>
      <template #left>
        <BaseGridCore
          style="height: 100%; width: 100%;"
          :column-defs
          :row-data
          :pagination="false"
        />
      </template>
      <BaseMonaco
        :original-val
        :modified-val
      />
    </UPage>
  </ModalFullScreen>
</template>
