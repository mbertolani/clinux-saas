<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema } from '@formkit/vue'
import { useEmpresa } from '~/composables/gerencial/useEmpresa'

// function getFieldName(schema) {
//   return schema.map(item => item.name).join(',')
// }
function getFieldName(schema) {
  return schema.reduce((acc, item) => {
    if (item.name) {
      acc.push(item.name)
    }
    if (item.children) {
      acc.push(...getFieldName(item.children))
    }
    return acc
  }, [])
}

const listaBancos = await useEmpresa().getBancos()

async function searchEstoque() {
  // if (!search) return []
  // console.log('search', search)
  const response = await useEmpresa().getEstoques()
  return response
}

// The function assigned to the `option-loader` prop will be called with the
// value of the option as the first argument (in this case, the movie ID), and
// the cached option as the second argument (if it exists).
async function searchEstoqueId(id, cachedOption) {
  if (cachedOption) return cachedOption
  const response = useEmpresa().getEstoque(id)
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
    outerClass: 'md:col-span-12'
  },
  {
    $formkit: 'textarea',
    name: 'bb_portal_anexo',
    label: 'Texto',
    outerClass: 'md:col-span-12'
  },
  {
    $formkit: 'currency',
    name: 'nr_nfe_iss',
    label: 'Iss (%)',
    currency: 'BRL',
    displayLocale: 'pt-BR',
    valueFormat: 'number',
    outerClass: 'md:col-span-2'
  },
  {
    $formkit: 'number',
    name: 'nr_nfe_pis',
    label: 'Pis (%)',
    number: 'float', // integer
    outerClass: 'md:col-span-2'
  },
  {
    $formkit: 'date',
    name: 'dt_empresa',
    id: 'dt_empresa',
    // popover: true,
    // value: new Date(),
    format: 'DD/MM/YYYY',
    // minDate: new Date(),
    // validation: '(1000)date_format:DD/MM/YYYY',
    valueFormat: 'YYYY-MM-DD',
    label: 'Data',
    outerClass: 'md:col-span-4'
  },
  {
    $formkit: 'toggle',
    name: 'sn_empresa',
    label: 'Ativo ?',
    outerClass: 'md:col-span-2 md:items-end inline-flex items-center'
  },
  {
    $formkit: 'toggle',
    name: 'sn_matriz',
    label: 'Matriz ?',
    onValue: true,
    offValue: false,
    outerClass: 'md:col-span-2 md:items-end inline-flex items-center'
  }
]

const onSubmit = async (_data: any) => {
  if (props.id === 0) {
    await api.create(_data)
  } else {
    await api.update(props.id, _data)
  }
  if (api.status.value) {
    emit('submit', props.id, item.value)
  } else {
    useToast().add({
      title: 'Error !',
      color: 'red',
      description: JSON.stringify(api.errors.value.error)
    })
  }
}
const onClose = () => {
  // todo: verificar se dados foram modificados
  emit('close')
}
const emit = defineEmits(['submit', 'close'])
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
const { api, item } = useEmpresa()
const model = ref({})
// const data = ref(null)
const data = reactive({
  someAttributes: {
    'onClick': () => {
      console.log('clicked')
    },
    'onKeyDown.Enter': (event: Event) => {
      console.log('key up', event)
    }
  }
})

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
//   })
// }
// useFormKitNodeById('form-empresa', (node) => {
//   // debugger
//   node.on('mounted', async (context) => {
//     console.log('schema mounted', context)
//     // const fields = context.origin.children.map(child => child.name).join(',')
//     // console.log('form fields', fields)
//     // if (props.id === 0) {
//     //   model.value = {}
//     // } else {
//     //   await api.get(props.id, fields)
//     //   model.value = item.value
//     // }
//   })
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
if (props.id === 0) {
  model.value = {}
} else {
  await api.get(props.id, getFieldName(schema))
  model.value = item.value
}
</script>

<template>
  <BaseForm
    title="Cadastro de Empresas"
    @close="onClose"
  >
    <FormKit
      id="form-empresa"
      v-slot="{ state: { dirty } }"
      v-model="model"
      dirty-behavior="compare"
      type="form"
      :actions="false"
      @submit="onSubmit"
      @close="onClose"
    >
      <div class="flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto">
          <div class="grid gap-x-4 grid-cols-1 md:grid-cols-12">
            <FormKitSchema
              :schema="schema"
              :data="data"
            />
          </div>
        </div>
      </div>

      <FormKit
        type="submit"
        label="Salvar"
        :disabled="!dirty"
      />
    </FormKit>
    <pre
      v-if="true"
      wrap
    >{{ model }}</pre>
  </BaseForm>
</template>

<style>
.formkit-input {
  text-transform: uppercase;
}
</style>
