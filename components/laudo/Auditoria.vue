<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { useAtendimento } from '~/composables/atendimento/useAtendimento'
import { useLaudo } from '~/composables/laudo/useLaudo'

const emit = defineEmits(['submit', 'close'])

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
const response = await useLaudo().execAuditar({ cd_atendimento: props.id })
const options = getFieldList(response.data)
const onSubmit = async (_data: any) => {
  // _data.bb_auditado = _data.bb_auditado ? atob(_data.bb_auditado) : null
  const response = await useLaudo().execAuditar(_data)
  if (!response.error)
    emit('submit', response.data)
}

const data = reactive({
  // cd_auditoria: {
  //   disabled: '$cd_auditoria > 0'
  // }
})

const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_atendimento'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_auditoria',
    label: 'Classificação',
    options: options,
    validation: 'required',
    outerClass: 'md:col-span-4'
  },
  {
    $formkit: 'textarea',
    name: 'bb_auditado',
    label: 'Observação',
    outerClass: 'md:col-span-12'
  }

]
const { api, item } = useAtendimento()
const model = ref(null)
await api.get(props.id, getFieldName(schema))
model.value = item.value
model.value.bb_auditado = model.value.bb_auditado ? atob(model.value.bb_auditado) : null
</script>

<template>
  <BaseForm
    title="Pendência"
    @close="emit('close')"
  >
    <FormKit
      v-slot="{ state: { dirty } }"
      :value="model"
      dirty-behavior="compare"
      type="form"
      :actions="false"
      @submit="onSubmit"
    >
      <div class="flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto">
          <div class="grid gap-x-4 grid-cols-1 md:grid-cols-12">
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
        </div>
      </div>
    </FormKit>
  </BaseForm>
</template>

<style>
.formkit-input {
  text-transform: uppercase;
}
</style>
