<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { useExame } from '~/composables/atendimento/useExame'
import { useLaudo } from '~/composables/laudo/useLaudo'

const emit = defineEmits(['submit', 'close'])

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
const response = await useLaudo().execAchado({ cd_exame: props.id })
const options = getFieldList(response.data)
const onSubmit = async (_data: any) => {
  // _data.bb_achado = _data.bb_achado ? Decode64(_data.bb_achado) : null
  const response = await useLaudo().execAchado(_data)
  if (!response.error)
    emit('submit', response.data)
}

const data = reactive({
  // cd_achado: {
  //   disabled: '$cd_achado > 0'
  // }
})

const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_exame'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_achado',
    label: 'Classificação',
    options: options,
    validation: 'required',
    outerClass: formClass(4)
  },
  {
    $formkit: 'textarea',
    name: 'bb_achado',
    label: 'Observação',
    outerClass: formClass(12)
  }

]
const { get } = useExame()
const model = ref(null)
model.value = await get(props.id, getFieldName(schema))
model.value.bb_achado = Decode64(model.value.bb_achado)
</script>

<template>
  <BaseForm
    title="Achado Crítico"
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
