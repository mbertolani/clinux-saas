<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useEmpresa } from '~/composables/gerencial/useEmpresa'

const { get, getBancos, getEstoques, getEstoque } = useEmpresa()

const listaBancos = await getBancos()

async function searchEstoque() {
  // if (!search) return []
  // console.log('search', search)
  return await getEstoques()
}

// The function assigned to the `option-loader` prop will be called with the
// value of the option as the first argument (in this case, the movie ID), and
// the cached option as the second argument (if it exists).
async function searchEstoqueId(id, cachedOption) {
  if (cachedOption) return cachedOption
  return await getEstoque(id)
}

// const customLine = 'flex flex-col sm:gap-4 sm:flex-row'
// const customCol = (width: string) => {
//   // return `w-${width} sm:w-1/1 max-w-none`
//   return `w-${width} sm:w-auto w-full`
// }

const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_empresa',
    label: 'Código'
  },
  {
    $formkit: 'text',
    name: 'ds_empresa',
    label: 'Descrição',
    validation: 'required',
    autofocus: true,
    inputClass: 'uppercase',
    // bind: '$someAttributes',
    outerClass: formClass(12)
  },
  {
    $formkit: 'text',
    name: 'ds_razao',
    id: 'ds_razao',
    label: 'Razão Social',
    validation: 'required',
    outerClass: formClass(6)
  },
  {
    $formkit: 'mask',
    name: 'ds_cnpj',
    id: 'ds_cnpj',
    mask: '##.###.###/####-##',
    label: 'Cnpj',
    outerClass: formClass(3),
    // attrs: {
    //   '@keydown.enter': 'keydownHandler'
    // },
    unmaskValue: true
    // outerClass: customCol('1/5')
  },
  {
    $formkit: 'mask',
    name: 'ds_cpf_responsavel',
    id: 'ds_cpf_responsavel',
    mask: '###.###.###-##',
    label: 'Cpf',
    unmaskValue: true,
    outerClass: formClass(3)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_banco',
    label: 'Banco',
    options: listaBancos,
    // selectionAppearance: 'option',
    selectionRemovable: true,
    openOnRemove: false,
    popover: true,
    outerClass: formClass(6)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_estoque',
    label: 'Estoque',
    // selectionAppearance: 'option',
    selectionRemovable: true,
    options: searchEstoque,
    optionLoader: searchEstoqueId,
    outerClass: formClass(6)
  },
  {
    $formkit: 'email',
    name: 'ds_email',
    label: 'Email',
    validation: 'email',
    outerClass: formClass(8)
  },
  {
    $formkit: 'mask',
    name: 'ds_telefone',
    id: 'ds_telefone',
    mask: '+55 (##) #####-####',
    label: 'Telefone',
    unmaskValue: true,
    outerClass: formClass(4)
  },
  // {
  //   $formkit: 'colorpicker',
  //   name: 'ds_cor',
  //   label: 'Cor',
  //   outerClass: 'md:col-span-1'
  // },
  {
    $formkit: 'url',
    name: 'ds_site',
    label: 'Site',
    placeholder: 'https://www.example.com...',
    validation: 'url',
    // help: 'website',
    outerClass: formClass(12),
    inputClass: '!lowercase'
  },
  {
    $formkit: 'textarea',
    name: 'bb_portal_anexo',
    label: 'Texto',
    outerClass: formClass(12)
  },
  // {
  //   $formkit: 'currency',
  //   name: 'nr_nfe_iss',
  //   label: 'Iss (%)',
  //   currency: 'BRL',
  //   decimals: 2,
  //   // minDecimals: '2', // nao aceita null, nao aceita digitacao de numero com 2 digitos
  //   displayLocale: 'pt-BR',
  //   valueFormat: 'number', // string
  //   outerClass: formClass(2)
  // },
  // {
  //   $formkit: 'number',
  //   name: 'nr_nfe_pis',
  //   label: 'Pis (%)',
  //   min: 0,
  //   number: 'float', // number: integer
  //   step: 'any',
  //   outerClass: formClass(2)
  // },
  // {
  //   $formkit: 'date',
  //   name: 'dt_empresa',
  //   id: 'dt_empresa',
  //   // popover: true,
  //   // value: new Date(),
  //   format: 'DD/MM/YYYY',
  //   // minDate: new Date(),
  //   // validation: '(1000)date_format:DD/MM/YYYY',
  //   valueFormat: 'YYYY-MM-DD',
  //   label: 'Data',
  //   outerClass: formClass(4)
  // },
  {
    $formkit: 'toggle',
    name: 'sn_empresa',
    label: 'Ativo ?',
    outerClass: formClass(3)
  },
  {
    $formkit: 'toggle',
    name: 'sn_matriz',
    label: 'Matriz ?',
    onValue: true,
    offValue: false,
    outerClass: formClass(9)
  }
]

const emit = defineEmits(['submit', 'close'])
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
// const data = reactive({
//   someAttributes: {
//     'onClick': () => {
//       console.log('clicked')
//     },
//     'onKeyDown.Enter': (event: Event) => {
//       console.log('key up', event)
//     }
//   }
// })

// const { getId, incId } = useEmpresa()
// const clique = () => {
//   incId()
// }

// function setNode(node) {
//   // Wait until the form is mounted
//   node.on('mounted', async () => {
//     // Now we can listen to form commit values and reasonably
//     // expect they come from user inputs.
//     node.on('commit', ({ payload }) => {
//       console.log('form commit', payload)
//     })
//     node.on('reset', ({ payload }) => {
//       console.log('form reset', payload)
//     })
//     node.on('input', ({ payload }) => {
//       console.log('form input', payload)
//     })
//   })
// }
// const nodeForm = useFormKitNodeById('form-empresa', (node) => {
//   console.log('node', node)
//   // debugger
//   // node.on('mounted', async (context) => {
//   //   console.log('schema mounted', context)
//   // })
// })
// const cnpj = useFormKitNodeById('ds_cnpj', (node) => {
//   node.on('cnpj commit', ({ payload }) => {
//     console.log('commit', payload)
//   })
//   node.on('cnpj input', ({ payload }) => {
//     console.log('input', payload)
//   })
//   node.on('cnpj mounted', () => {
//     console.log('mounted')
//   })
//   node.on('cnpj created', () => {
//     console.log('created')
//   })
// })
// console.log('cnpj node', cnpj.value)
// useFormKitNodeById('dt_empresa', (node) => {
//   node.on('commit', ({ payload }) => {
//     console.log('commit', payload)
//   })
// })
// @keydown.enter="keydownHandler"
// const apiForm: typeof FormKitSchema = ref(null)

const model = ref({})

watch(() => props.id, async () => {
  const response = props.id ? await get(props.id, getFieldName(schema)) : {}
  response.bb_portal_anexo = Decode64(response.bb_portal_anexo)
  model.value = response
})
//
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
      :controller="useEmpresa()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
