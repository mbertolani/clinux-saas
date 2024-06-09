<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})
function getFieldList(list) {
  return list
    ? list.map((result) => {
      return getFieldItem(result)
    })
    : []
}
function getFieldItem(item) {
  return item
    ? {
        id: Object.values(item)[0],
        label: Object.values(item)[1]
      }
    : {}
}
const emit = defineEmits(['cancel', 'submit'])
const commands = getFieldList(props.data)
const selected = ref(null)
const onSubmit = () => {
  (selected.value)
    ? emit('submit', selected.value.id)
    : emit('cancel')
}
// const isSelected = computed(() => {
//   return selected.value !== 0
// })
// defineShortcuts({
//   enter: {
//     usingInput: true,
//     whenever: [isSelected],
//     handler: () => {
//       console.log('selected', selected.value)
//       if (selected.value) emit('submit', selected.value)
//     }
//   }
// })
const commandPaletteRef = ref()
</script>

<template>
  <UModal
    :ui="{
      width: 'sm:max-w-xl md:max-w-2xl'
    }"
  >
    <UCommandPalette
      ref="commandPaletteRef"
      v-model="selected"
      :nullable="false"
      :autoselect="false"
      :groups="[{ key: 'items', commands: commands }]"
      :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"
      placeholder="Pesquisar..."
      :empty-state="{ icon: 'i-heroicons-magnifying-glass-20-solid', label: 'Nenhum registro encontrado !', queryLabel: 'Resultado da pesquisa não encontrado !' }"
      :ui="{
        input:
          {
            base: 'text-transform: uppercase'
          }
      }"
      @cancel="emit('cancel')"
      @click="onSubmit()"
      @close="emit('cancel', 'close')"
    />
  </UModal>
</template>
