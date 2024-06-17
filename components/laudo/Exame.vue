<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { useLaudo } from '~/composables/laudo/useLaudo'
import { getFieldName } from '~/utils/schema'

const emit = defineEmits(['submit', 'close'])

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
const model = ref(null)
const { get, update, create, getMedico, getEmpresa, getModalidade, getMedicos, getEmpresas, getModalidades } = useLaudo()

const data = reactive({
  cd_modalidade: {
    disabled: props.id > 0,
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await getModalidade(id)
    },
    options: async () => {
      // if (!search) return []
      // if (options.some(option => option.label.toLowerCase().includes(search.toLowerCase()))) return options
      // if (!model.value.cd_modalidade) return []
      return await getModalidades()
    }
  },
  cd_empresa: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await getEmpresa(id)
    },
    options: async () => {
      // if (!search) return []
      // if (options.some(option => option.label.toLowerCase().includes(search.toLowerCase()))) return options
      // if (!model.value.cd_modalidade) return []
      return await getEmpresas()
    }
  },
  cd_medico: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await getMedico(id)
    },
    options: async () => {
      // if (!search) return []
      // if (options.some(option => option.label.toLowerCase().includes(search.toLowerCase()))) return options
      if (!model.value.cd_modalidade) return []
      return await getMedicos(model.value.cd_modalidade)
    }
  }
})

useFormKitNodeById('cd_modalidade', (node) => {
  node.on('commit', async (context) => {
    const items = context.payload ? await getMedicos(context.payload) : []
    getNode('cd_medico').input(null)
    getNode('cd_medico').props.options = items
  })
})

const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_exame'
  },
  {
    $formkit: 'textarea',
    name: 'ds_exame_realizado',
    label: 'Descrição',
    validation: 'required',
    outerClass: formClass(12)
  }

]

model.value = props.id ? await get(props.id, getFieldName(schema)) : {}

const onSubmit = async (_data: any) => {
  const item = (props.id) ? await update(props.id, _data) : await create(_data)
  if (item) {
    emit('submit', props.id, item.value)
  }
}
</script>

<template>
  <BaseForm
    title="Cadastro de Exames"
    @close="emit('close')"
  >
    <FormKit
      v-slot="{ state: { dirty } }"
      v-model="model"
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
