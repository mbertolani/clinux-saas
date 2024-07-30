<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useAtendimento } from '~/composables/atendimento/useAtendimento'
import { useExame } from '~/composables/atendimento/useExame'
import { usePaciente } from '~/composables/atendimento/usePaciente'
import { useSolicitante } from '~/composables/atendimento/useSolicitante'
import { useSala } from '~/composables/gerencial/useSala'
import { useProcedimento } from '~/composables/gerencial/useProcedimento'
import { useProcedencia } from '~/composables/atendimento/useProcedencia'
// import { Icones } from '~/types/system'

const emit = defineEmits(['submit', 'close'])

defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const sala = useSala()
const data = reactive({
  cd_paciente: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await usePaciente().getPaciente(id)
    },
    options: async ({ search }) => {
      if (!search) return []
      if (search.length < 3) return []
      if (onlyNumbers(search).length)
        if (search.length < 11 && !isValidDate(search))
          return []
      return await usePaciente().getPacientes(search)
    }
  },
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
  cd_sala: {
    disabled: false,
    options: async () => {
      return await sala.getItemList()
    }
  },
  editar: {
    onClick: () => {
      console.log('editar')
    }
  },
  cd_procedimento: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await useProcedimento().getItem(id)
    }
  }
})

useFormKitNodeById('cd_sala', (node) => {
  node.on('commit', async (context) => {
    getNode('cd_plano').input(sala.getPlano(context.payload))
    const sla = context.payload ? await useAtendimento().findSla(context.payload) : []
    const procedimento = context.payload
      ? await useExame().findProcedimento({
        cd_sala: getNode('cd_sala').value,
        cd_plano: getNode('cd_plano').value,
        cd_medico: getNode('cd_clinico').value,
        dt_data: getNode('dt_data').value,
        cd_exame: getNode('cd_exame').value || 0
      })
      : []
    getNode('cd_sla').props.options = sla
    getNode('cd_procedimento').props.options = procedimento
  })
})

useFormKitNodeById('cd_paciente', (node) => {
  node.on('commit', async (context) => {
    const response = context.payload ? await usePaciente().get(context.payload, 'dt_nascimento') : {}
    getNode('dt_nascimento').input(formatDate(response.dt_nascimento))
  })
})
const schemaAtendimento = [
  {
    $formkit: 'hidden',
    name: 'cd_atendimento'
  },
  {
    $formkit: 'hidden',
    id: 'cd_clinico',
    name: 'cd_medico'
  },
  {
    $formkit: 'datepicker',
    id: 'dt_data',
    name: 'dt_data',
    label: 'Data',
    validation: 'required',
    format: 'DD/MM/YYYY',
    valueFormat: 'YYYY-MM-DD',
    outerClass: formClass(2)
  },
  {
    $formkit: 'text',
    name: 'dt_hora',
    id: 'dt_hora',
    label: 'Hora',
    outerClass: formClass(1)
  },
  {
    $formkit: 'number',
    name: 'nr_controle',
    disabled: true,
    label: 'Protocolo',
    outerClass: formClass(3)
  },
  {
    $formkit: 'dropdown',
    id: 'cd_sala',
    name: 'cd_sala',
    bind: '$cd_sala',
    label: 'Modalidade',
    outerClass: formClass(6)
  },
  {
    $formkit: 'dropdown',
    id: 'cd_sla',
    name: 'cd_sla',
    label: 'Sla',
    options: [],
    selectionRemovable: true,
    outerClass: formClass(4)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_procedencia',
    label: 'Procedência',
    options: await useProcedencia().getItemList(),
    selectionRemovable: true,
    outerClass: formClass(4)
  },
  {
    $formkit: 'dropdown',
    name: 'ds_contraste',
    label: 'Constraste',
    options: ['NAO', 'EV', 'ORAL', 'EV + ORAL', 'RETAL'],
    selectionRemovable: true,
    outerClass: formClass(4)
  },
  {
    $formkit: 'autocomplete',
    name: 'cd_paciente',
    id: 'cd_paciente',
    label: 'Paciente',
    bind: '$cd_paciente',
    validation: 'required',
    placeholder: 'Nome, D. Nascimento e Cpf ',
    debounce: 500,
    outerClass: formClass(8)
  },
  {
    $formkit: 'text',
    name: 'dt_nascimento',
    id: 'dt_nascimento',
    label: 'D. Nascimento',
    disabled: true,
    outerClass: formClass(3)
  },
  // {
  //   $formkit: 'button',
  //   prefixIcon: 'submit',
  //   bind: '$editar',
  //   outerClass: formClass(3) + ' !mb-0 flex items-center',
  //   children: ['']
  // },
  {
    $formkit: 'text',
    name: 'ds_observacao',
    placeholder: 'Observação',
    outerClass: formClass(12)
  },
  {
    $formkit: 'textarea',
    name: 'bb_dados',
    placeholder: 'Dados Clínicos',
    outerClass: formClass(12)
  }
]

const schemaExame: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    id: 'cd_exame',
    name: 'cd_exame'
  },
  {
    $formkit: 'hidden',
    id: 'cd_plano',
    name: 'cd_plano'
  },
  {
    $formkit: 'dropdown',
    id: 'cd_procedimento',
    name: 'cd_procedimento',
    label: 'Procedimento',
    bind: '$cd_procedimento',
    options: [],
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
const schema = [
  {
    $formkit: 'group',
    id: 'atendimento',
    name: 'atendimento',
    children: schemaAtendimento
  },
  {
    $formkit: 'group',
    name: 'exame',
    children: schemaExame
  }
]
// const schema = [...schemaAtendimento, ...schemaExame]
const apiPage = ref()
const onSubmit = async (args) => {
  // remover campo dt_nascimento de args
  const atendimento = (args.atendimento.cd_atendimento)
    ? await useAtendimento().update(args.atendimento.cd_atendimento, args.atendimento)
    : await useAtendimento().create(args.atendimento)
  console.log(atendimento)
  const exame = (args.exame.cd_exame)
    ? await useExame(atendimento.cd_atendimento).update(args.exame.cd_exame, args.exame)
    : await useExame(atendimento.cd_atendimento).create(args.exame)
  console.log(exame, apiPage.value)
  // apiPage.value.gridRef.coreApi.api.applyTransaction(args.exame.cd_exame ? { update: [exame] } : { add: [exame] })
  emit('submit', atendimento)
}
const value = ref({
  atendimento: {
    cd_medico: 1,
    dt_data: useDateFormat(new Date(), 'YYYY-MM-DD').value,
    dt_hora: useDateFormat(new Date(), 'HH:MM').value
  }
})
// console.log((schema))
</script>

<template>
  <ModalPage
    :id
    ref="apiPage"
    :title
    :schema
    :data
    :value
    grid="height: 180px; width: 100%;"
    :controller="useExame(id)"
    :mastercontroller="useAtendimento()"
    @submit="onSubmit"
    @close="emit('close')"
  />
</template>
