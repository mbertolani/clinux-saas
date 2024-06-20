<script setup lang="ts">
import DashboardModal from '@nuxt/ui-pro/components/dashboard/DashboardModal.vue'
import { useModelo } from '~/composables/gerencial/useModelo'

const emit = defineEmits(['submit', 'close'])

// const modelValue = defineModel({ type: String, required: true })
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const salvar = async () => {
  // const payload = {
  //   schema: schema.value,
  //   data: data.value
  // }
  const response = await useModelo().setFormula(props.id, schema.value)
  if (response)
    emit('close')
}

const response = await useModelo().getFormula(props.id)
const schema = ref(response)
const data = ref('')
// const schema = ref(response?.schema ? response.schema : response || '')
// const data = ref(response?.data ? response.data : '')
</script>

<template>
  <DashboardModal
    title="Formulário"
    :fullscreen="true"
  >
    <template #footer>
      <UButton
        color="primary"
        label="Salvar"
        @click="salvar"
      />
      <UButton
        color="gray"
        label="Cancelar"
        @click="emit('close')"
      />
    </template>
    <template #default>
      <div style="display: flex; flex-direction: row; height: calc(100vh - 180px);">
        <BaseMonacoEditor
          v-model="schema"
        />
        <BaseMonacoEditor
          v-model="data"
        />
      </div>
    </template>
  </DashboardModal>
</template>
