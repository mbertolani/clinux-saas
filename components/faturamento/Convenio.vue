<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useConvenio } from '~/composables/faturamento/useConvenio'

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

const schema1: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_fornecedor'
  },
  {
    $formkit: 'text',
    name: 'ds_fornecedor',
    label: 'Descrição',
    validation: 'required',
    outerClass: formClass(12)
  },
  {
    $formkit: 'text',
    name: 'ds_razao',
    label: 'Razão Social',
    outerClass: formClass(9)
  },
  {
    $formkit: 'mask',
    name: 'ds_cnpj',
    label: 'Cnpj',
    mask: '##.###.###/####-##',
    unmaskValue: true,
    outerClass: formClass(3)
  },
  {
    $formkit: 'text',
    name: 'ds_operadora',
    label: 'Registro ANS',
    outerClass: formClass(3)
  },
  {
    $formkit: 'toggle',
    name: 'sn_ativo',
    label: 'Ativo',
    outerClass: formClass(12)
  }
]
// const schema = [{
//   '$formkit': 'multi-step',
//   'tab-style': 'tab',
//   'name': 'applicationForms',
//   'children': [
//     {
//       $formkit: 'step',
//       // key: 'individualCustomerDetails',
//       // name: 'individualCustomerDetails',
//       if: '$applicationForms.customerType === individual',
//       children: schema1
//     }
//   ]
// }]
const schema = [
  {
    $formkit: 'multi-step',
    tabStyle: 'tab',
    name: 'convenio',
    outerClass: formClass(12),
    children: [
      {
        $formkit: 'step',
        name: 'cadastro',
        label: 'Cadastro',
        // outerClass: formClass(12),
        children: schema1
      },
      {
        $formkit: 'step',
        name: 'endereco',
        label: 'Endereço',
        // outerClass: formClass(12),
        children: [
          {
            $formkit: 'text',
            name: 'ds_logradouro',
            label: 'Endereço',
            outerClass: formClass(12)
          },
          {
            $formkit: 'text',
            name: 'ds_bairro',
            label: 'Bairro',
            outerClass: formClass(6)
          },
          {
            $formkit: 'text',
            name: 'ds_cidade',
            label: 'Cidade',
            outerClass: formClass(6)
          },
          {
            $formkit: 'text',
            name: 'ds_estado',
            label: 'UF',
            outerClass: formClass(3)
          },
          {
            $formkit: 'text',
            name: 'ds_cep',
            label: 'CEP',
            outerClass: formClass(3)
          }
        ]
      }
    ]
  }
]
// console.log(getFieldObjects(schema))
// const data1 = { cd_fornecedor: 498, ds_fornecedor: 'CDT DIAGNOSTICOS', ds_razao: null, ds_cnpj: null, ds_operadora: null, sn_ativo: true, ds_logradouro: 'RUA 1', ds_numero: '1', ds_complemento: null, ds_bairro: 'CENTRO', ds_cep: '12345-678', ds_cidade: 'CIDADE', ds_uf: 'UF', ds_pais: 'BRASIL' }
// const data2 = {
//   convenio: {
//     cadastro: { cd_fornecedor: null, ds_fornecedor: null, ds_razao: null, ds_cnpj: null, ds_operadora: null, sn_ativo: null },
//     endereco: { ds_logradouro: null, ds_bairro: null, ds_cidade: null, ds_estado: null, ds_cep: null }
//   }
// }
function gerarData2(schema) {
  const resultado = {}

  schema.forEach((root) => {
    if (root.$formkit === 'multi-step') {
      resultado[root.name] = {}
      root.children.forEach((step) => {
        if (step.$formkit === 'step') {
          const stepName = step.name
          resultado[root.name][stepName] = resultado[root.name][stepName] || {}
          step.children.forEach((child) => {
            resultado[root.name][stepName][child.name] = null
          })
        }
      })
    }
  })

  return resultado
}

console.log(gerarData2(schema))
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
      :controller="useConvenio()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
