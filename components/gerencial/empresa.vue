<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { useEmpresa } from '~/composables/gerencial/useEmpresa'

const { get, create, update, getBancos, getEstoques, getEstoque } = useEmpresa()

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
  const response = await getEstoque(id)
  console.log('searchEstoqueId', response)
  return response ? response : { label: 'Error loading' }
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
    bind: '$someAttributes',
    outerClass: 'md:col-span-12'
  },
  {
    $formkit: 'text',
    name: 'ds_razao',
    id: 'ds_razao',
    label: 'Razão Social',
    validation: 'required',
    outerClass: 'md:col-span-6'
  },
  {
    $formkit: 'mask',
    name: 'ds_cnpj',
    id: 'ds_cnpj',
    mask: '##.###.###/####-##',
    label: 'Cnpj',
    outerClass: 'md:col-span-3',
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
    outerClass: 'md:col-span-3'
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
    outerClass: 'md:col-span-6'
  },
  {
    $formkit: 'dropdown',
    name: 'cd_estoque',
    label: 'Estoque',
    // selectionAppearance: 'option',
    options: searchEstoque,
    optionLoader: searchEstoqueId,
    outerClass: 'md:col-span-6'
  },
  {
    $formkit: 'email',
    name: 'ds_email',
    label: 'Email',
    validation: 'email',
    outerClass: 'md:col-span-8'
  },
  {
    $formkit: 'mask',
    name: 'ds_telefone',
    id: 'ds_telefone',
    mask: '+55 (##) #####-####',
    label: 'Telefone',
    unmaskValue: true,
    outerClass: 'md:col-span-4'
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
    outerClass: 'md:col-span-12',
    inputClass: '!lowercase'
  },
  {
    $formkit: 'textarea',
    name: 'bb_portal_anexo',
    label: 'Texto',
    outerClass: 'md:col-span-12'
  },
  // {
  //   $formkit: 'currency',
  //   name: 'nr_nfe_iss',
  //   label: 'Iss (%)',
  //   currency: 'BRL',
  //   decimals: 2,
  //   min: 0,
  //   // minDecimals: '2', // nao aceita null, nao aceita digitacao de numero com 2 digitos
  //   displayLocale: 'pt-BR',
  //   valueFormat: 'number', // string
  //   outerClass: 'md:col-span-2'
  // },
  // {
  //   $formkit: 'number',
  //   name: 'nr_nfe_pis',
  //   label: 'Pis (%)',
  //   min: 0,
  //   number: 'float', // number: integer
  //   step: 'any',
  //   outerClass: 'md:col-span-2'
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
  //   outerClass: 'md:col-span-4'
  // },
  {
    $formkit: 'toggle',
    name: 'sn_empresa',
    label: 'Ativo ?',
    outerClass: 'md:col-span-3 md:items-end inline-flex items-center'
  },
  {
    $formkit: 'toggle',
    name: 'sn_matriz',
    label: 'Matriz ?',
    onValue: true,
    offValue: false,
    outerClass: 'md:col-span-9 md:items-end inline-flex items-center'
  }
]

const emit = defineEmits(['submit', 'close'])
const props = defineProps({
  id: {
    type: Number,
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
const onSubmit = async (_data: any) => {
  _data.bb_portal_anexo = Encode64(_data.bb_portal_anexo)
  const response = props.id ? await update(props.id, _data) : await create(_data)
  console.log('onSubmit', response)
  if (response)
    emit('submit', props.id, response)
}
// const onClose = () => {
//   if (getNode('form-empresa').context.state.dirty) {
//     useMessage().openDialog({
//       description: 'Deseja sair sem salvar ?',
//       okClick: () => { useMessage().closeDialog(), emit('close') },
//       noClick: () => { useMessage().closeDialog() }
//     })
//   } else {
//     emit('close')
//   }
// }
</script>

<template>
  <BaseForm
    title="Cadastro de Empresas"
    @close="emit('close')"
  >
    <FormKit
      id="form-kit"
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
            <FormKitSchema :schema="schema" />
            <FormKit
              type="submit"
              label="Salvar"
              :disabled="!dirty"
            />
          </div>
        </div>
      </div>
    </FormKit>
    <pre
      v-if="false"
      wrap
    >{{ model }}</pre>
  </BaseForm>
</template>

<style>
.formkit-input {
  text-transform: uppercase;
}
</style>
