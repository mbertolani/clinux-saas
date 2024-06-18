<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import type { _0 } from '#tailwind-config/theme/backdropBlur'

defineProps({
  title: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: false
  }
})

const emit = defineEmits(['submit', 'close'])

const value = ref({
  nr_peso: 50,
  nr_altura: 1.6,
  nr_imc: 0, // getNode('nr_peso') ? getNode('nr_peso').value : null,
  sn_fuma: false
})

const data = {
  // sync: name => (node) => {
  //   console.log('sync', name, node.name)
  //   node.at('nr_peso')?.on('commit', (payload) => {
  //     console.log('nr_peso', payload)
  //     node.input((Number(getNode('nr_peso').value) * Number(getNode('nr_altura').value)) / 2.0)
  //   })
  //   node.at('nr_altura')?.on('commit', (payload) => {
  //     console.log('nr_altura', payload)
  //     node.input((Number(getNode('nr_peso').value) * Number(getNode('nr_altura').value)) / 2.0)
  //   })
  // },
  imc: (node) => {
    function calculaImc(node) {
      const valor = (Number(getNode('nr_peso').value) * Number(getNode('nr_altura').value)) / 2.0
      node.input(valor.toFixed(2).toString())
    }
    getNode('nr_altura')?.on('commit', () => {
      calculaImc(node)
    })
    getNode('nr_peso')?.on('commit', () => {
      calculaImc(node)
    })
  },
  tempo: (node) => {
    function calcula(node) {
      // Obtenha os valores de data como strings
      const dataAte = getNode('dt_ate').value
      const dataDe = getNode('dt_de').value
      // Use o resultado conforme necessário
      node.input(`${dataAte} - ${dataDe}`)
    }
    getNode('dt_de')?.on('commit', () => {
      calcula(node)
    })
    getNode('dt_ate')?.on('commit', () => {
      calcula(node)
    })
  },
  format: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format,
  stringify: JSON.stringify
}

const schema: FormKitSchemaDefinition = [
  {
    $cmp: 'FormKit',
    props: {
      type: 'select',
      id: 'lista',
      name: 'ds_lista',
      label: 'lista',
      placeholder: 'selecione uma opção',
      options: {
        1: 'opção 1',
        2: 'opcão 2',
        3: 'opção 3'
      }
      // validation: 'required'
    }
  },
  {
    $formkit: 'number',
    bind: '$nr_peso',
    id: 'nr_peso',
    name: 'nr_peso',
    label: 'Peso (kg)',
    placeholder: 'Peso do paciente',
    number: 'float'
  },
  {
    $formkit: 'number',
    bind: '$nr_altura',
    id: 'nr_altura',
    name: 'nr_altura',
    label: 'Altura (m)',
    placeholder: 'Altura do paciente',
    number: 'float'
  },
  // {
  //   $el: 'h2',
  //   children: ['IMC: ', '$format($get(nr_peso).value * $get(nr_altura).value / 2)']
  // },
  {
    $formkit: 'number',
    name: 'nr_imc',
    id: 'nr_imc',
    label: 'IMC',
    onNode: '$imc',
    placeholder: '(kg/m²)',
    number: 'float',
    readonly: true
  },
  {
    $formkit: 'checkbox',
    name: 'sn_fuma',
    id: 'fuma',
    label: 'Fuma ?'
  },
  {
    $formkit: 'text',
    name: 'tempo',
    label: 'Quando tempo ?',
    if: '$get(fuma).value',
    validation: 'required'
  },
  {
    $formkit: 'date',
    name: 'dt_de',
    id: 'dt_de',
    label: 'De'
  },
  {
    $formkit: 'date',
    name: 'dt_ate',
    id: 'dt_ate',
    label: 'Até'
  },
  {
    $formkit: 'text',
    name: 'nr_periodo',
    label: 'Período',
    onNode: '$tempo'
  },
  {
    $formkit: 'textarea',
    name: 'observacao',
    label: 'Observação'
  },
  {
    $formkit: 'toggle',
    name: 'sn_ativo',
    label: 'Ativo ?'
  }

]
const onSubmit = async (_data: any) => {
  emit('submit', _data)
}
</script>

<template>
  <BaseForm
    title="Variável"
    @close="useModal().close"
  >
    <FormKit
      v-slot="{ state: { dirty } }"
      :value
      dirty-behavior="compare"
      type="form"
      :actions="false"
      @submit="onSubmit"
    >
      <div class="flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto">
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
    </FormKit>
  </BaseForm>
</template>
