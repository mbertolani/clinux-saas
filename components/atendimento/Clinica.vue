<script setup lang="ts">
import { useAtendimento } from '~/composables/atendimento/useAtendimento'
import { usePaciente } from '~/composables/atendimento/usePaciente'
import { useSala } from '~/composables/gerencial/useSala'
import { useSla } from '~/composables/gerencial/useSla'
import { useProcedencia } from '~/composables/atendimento/useProcedencia'

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
  cd_sala: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await useSala().getItem(id)
    },
    options: async () => {
      return await sala.getItemList()
    }
  },
  cd_sla: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await useSla().getItem(id)
    },
    options: async () => {
      const sala = Number(getNode('cd_sala').value)
      return sala ? await useAtendimento().findSla(sala) : []
    }
  },
  editar: {
    onClick: () => {
      console.log('editar')
    }
  }
})

useFormKitNodeById('cd_sala', (node) => {
  node.on('commit', async (context) => {
    getNode('cd_sla').props.options = context.payload ? await useAtendimento().findSla(context.payload) : []
  })
})

useFormKitNodeById('cd_paciente', (node) => {
  node.on('commit', async (context) => {
    const response = context.payload ? await usePaciente().get(context.payload, 'dt_nascimento') : {}
    getNode('dt_nascimento').input(formatDate(response.dt_nascimento))
  })
})
const schema = [
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
    $formkit: 'mask',
    name: 'dt_hora',
    id: 'dt_hora',
    mask: '##:##',
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
    bind: '$cd_sla',
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
    // name: 'dt_nascimento',
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
const value = ref({
  cd_medico: 1,
  dt_data: useDateFormat(new Date(), 'YYYY-MM-DD').value,
  dt_hora: useDateFormat(new Date(), 'HH:mm').value
})
const onSubmit = async (...args) => {
  emit('submit', ...args)
}
</script>

<template>
  <BaseForm
    :title
    @close="emit('close')"
  >
    <BaseFormLayout
      :id
      :schema
      :data
      :value
      :controller="useAtendimento()"
      @submit="onSubmit"
    >
      <FormKit
        type="button"
        input-class="w-full justify-center"
        :outer-class="formClass(3)"
        label="Exames"
      />
      <FormKit
        type="button"
        input-class="w-full justify-center"
        :outer-class="formClass(3)"
        label="Arquivos"
      />
      <FormKit
        type="button"
        input-class="w-full justify-center"
        :outer-class="formClass(3)"
        label="Solicitar"
      />
      <FormKit
        type="button"
        input-class="w-full justify-center"
        :outer-class="formClass(3)"
        label="Cancelar"
      />
    </BaseFormLayout>
  </BaseForm>
</template>
