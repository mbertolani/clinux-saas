<script lang="ts" setup>
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useExame } from '~/composables/atendimento/useExame'
import { Icones } from '~/types/system'
import { useProcedimento } from '~/composables/gerencial/useProcedimento'
import { useSolicitante } from '~/composables/atendimento/useSolicitante'
import { useAtendimento } from '~/composables/atendimento/useAtendimento'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const title = 'Associar Exames'
const controller = useExame(props.id)
const data = reactive({
  cd_medico: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await useSolicitante().getMedico(id)
    },
    options: async ({ search }) => {
      if (!search) return []
      if (search.length < 3) return []
      // if (onlyNumbers(search).length)
      //   if (search.length < 11 && !isValidDate(search))
      //     return []
      return await useSolicitante().getMedicos(search)
    }
  },
  cd_procedimento: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await useProcedimento().getItem(id)
    },
    options: async () => {
      const atendimento = await useAtendimento().get(props.id, 'cd_sala,cd_medico,dt_data')
      return await controller.findProcedimento({
        cd_sala: atendimento.cd_sala,
        cd_plano: getNode('cd_plano').value,
        cd_medico: atendimento.cd_medico,
        dt_data: atendimento.dt_data,
        cd_exame: getNode('cd_exame').value || 0
      })
    }
  },
  cd_plano: (node) => {
    console.log('cd_plano', node)
  }
})
// useFormKitNodeById('form-kit', (node) => {
//   node.on('reset', async () => {
//     console.log('reset form-kit', node.value)
//     getNode('cd_plano').input(await controller.findParticular(props.id))
//   })
// })
// const onReset = async () => {
//   console.log('reset form-kit', getNode('cd_plano').value)
//   if (!getNode('cd_plano').value)
//     getNode('cd_plano').input(await controller.findParticular(props.id))
// }
const value = {
  cd_exame: null,
  cd_plano: await controller.findParticular(props.id),
  cd_procedimento: null,
  cd_medico: null,
  nr_filme: null,
  ds_exame_realizado: null
}
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    id: 'cd_exame',
    name: 'cd_exame'
  },
  {
    $formkit: 'hidden',
    id: 'cd_plano',
    name: 'cd_plano',
    onNode: '$cd_plano'
  },
  {
    $formkit: 'dropdown',
    id: 'cd_procedimento',
    name: 'cd_procedimento',
    label: 'Procedimento',
    bind: '$cd_procedimento',
    validation: 'required',
    outerClass: formClass(9)
  },
  {
    $formkit: 'number',
    name: 'nr_filme',
    label: 'Imagem',
    outerClass: formClass(3)
  },
  {
    $formkit: 'text',
    name: 'ds_exame_realizado',
    label: 'Exame Realizado',
    outerClass: formClass(6)
  },
  {
    $formkit: 'autocomplete',
    name: 'cd_medico',
    id: 'cd_medico',
    label: 'Médico',
    bind: '$cd_medico',
    placeholder: 'Nome, Crm',
    debounce: 500,
    selectionRemovable: true,
    outerClass: formClass(6)
  }
]
</script>

<template>
  <ModalPage
    :id
    :title
    :schema
    :data
    :icon="Icones.medico"
    :controller
    :value
  />
</template>
