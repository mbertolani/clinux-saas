<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { useAtendimento } from '~/composables/atendimento/useAtendimento'
import { useExame } from '~/composables/atendimento/useExame'
import { useLaudo } from '~/composables/laudo/useLaudo'
import { getFieldName } from '~/utils/schema'

const emit = defineEmits(['submit', 'close'])

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

// const data = reactive({
//   cd_modalidade: {
//     disabled: props.id > 0,
//     optionLoader: async (id, cachedOption) => {
//       if (cachedOption) return cachedOption
//       if (!id) return []
//       return await getModalidade(id)
//     },
//     options: async () => {
//       // if (!search) return []
//       // if (options.some(option => option.label.toLowerCase().includes(search.toLowerCase()))) return options
//       // if (!model.value.cd_modalidade) return []
//       return await getModalidades()
//     }
//   },
//   cd_empresa: {
//     optionLoader: async (id, cachedOption) => {
//       if (cachedOption) return cachedOption
//       if (!id) return []
//       return await getEmpresa(id)
//     },
//     options: async () => {
//       // if (!search) return []
//       // if (options.some(option => option.label.toLowerCase().includes(search.toLowerCase()))) return options
//       // if (!model.value.cd_modalidade) return []
//       return await getEmpresas()
//     }
//   },
//   cd_medico: {
//     optionLoader: async (id, cachedOption) => {
//       if (cachedOption) return cachedOption
//       if (!id) return []
//       return await getMedico(id)
//     },
//     options: async () => {
//       // if (!search) return []
//       // if (options.some(option => option.label.toLowerCase().includes(search.toLowerCase()))) return options
//       if (!model.value.cd_modalidade) return []
//       return await getMedicos(model.value.cd_modalidade)
//     }
//   }
// })

// useFormKitNodeById('cd_modalidade', (node) => {
//   node.on('commit', async (context) => {
//     const items = context.payload ? await getMedicos(context.payload) : []
//     getNode('cd_medico').input(null)
//     getNode('cd_medico').props.options = items
//   })
// })

const schemaAtendimento: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_atendimento'
  },
  {
    $formkit: 'date',
    name: 'dt_data',
    label: 'Data',
    validation: 'required',
    outerClass: formClass(4)
  },
  {
    $formkit: 'textarea',
    name: 'bb_dados',
    label: 'Dados Clínicos',
    outerClass: formClass(12)
  },
  {
    $formkit: 'textarea',
    name: 'ds_observacao',
    label: 'Observação',
    outerClass: formClass(12)
  }
]

const schemaExame: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_exame'
  },
  {
    $formkit: 'hidden',
    name: 'cd_atendimento'
  },
  {
    $formkit: 'text',
    name: 'ds_exame_realizado',
    label: 'Exame Realizado',
    validation: 'required',
    outerClass: formClass(12)
  }
]

const onSubmit = async (_data: any) => {
  _data.atendimento.bb_dados = Encode64(_data.atendimento.bb_dados)
  await useAtendimento().update(exame.cd_atendimento, _data.atendimento)
  await useExame().update(exame.cd_exame, _data.exame)
  const response = await useLaudo().getView({ cd_atendimento: exame.cd_atendimento })
  emit('submit', response)
}

// const { get, getMedico, getEmpresa, getModalidade, getMedicos, getEmpresas, getModalidades } = useLaudo()
// model.value = props.id ? await get(props.id, getFieldName(schema)) : {}
const exame = await useExame().get(props.id, getFieldName(schemaExame))
const atendimento = await useAtendimento().get(exame.cd_atendimento, getFieldName(schemaAtendimento))
atendimento.bb_dados = Decode64(atendimento.bb_dados)
const model = ref({
  atendimento,
  exame
})
</script>

<template>
  <BaseForm
    title="Exame"
    @close="emit('close')"
  >
    <FormKit
      type="form"
      :value="model"
      @submit="onSubmit"
    >
      <FormKit
        type="group"
        name="atendimento"
      >
        <FormKitSchema
          :schema="schemaAtendimento"
        />
      </FormKit>
      <FormKit
        type="group"
        name="exame"
      >
        <FormKitSchema
          :schema="schemaExame"
        />
      </FormKit>
    </FormKit>
  </BaseForm>
</template>
