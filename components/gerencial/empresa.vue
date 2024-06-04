<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { FormKitSchema, useFormKitNodeById } from '@formkit/vue'
import { useEmpresa } from '~/composables/gerencial/useEmpresa'

// function getFieldName(schema) {
//   return schema.map(item => item.name).join(',')
// }
// useFormKitNodeById('schema-empresa', (node) => {
//   // debugger
//   console.log('schema', node)
//   node.on('mounted', (context) => {
//     console.log('schema mounted', context)
//   })
// })
const listaBancos = ref()
listaBancos.value = await useEmpresa().getBancos()
console.log('banco', listaBancos.value)
async function searchEstoque({ search }) {
  if (!search) return []
  console.log('search', search)
  const response = await useEmpresa().getEstoques()
  console.log('estoque', response)
  return response
}
// The function assigned to the `option-loader` prop will be called with the
// value of the option as the first argument (in this case, the movie ID), and
// the cached option as the second argument (if it exists).
async function loadEstoque(id, cachedOption) {
  if (cachedOption) return cachedOption
  const response = useEmpresa().getEstoque(id)
  return response ? response : { label: 'Error loading' }
}
const customLine = 'flex flex-col sm:gap-4 sm:flex-row'
const customCol = (width: string) => {
  // return `w-${width} sm:w-1/1 max-w-none`
  return `w-${width} sm:w-auto w-full`
}
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
    outerClass: customCol('1/1')
  },
  {
    $el: 'div',
    attrs: {
      class: customLine
    },
    children: [
      {
        $formkit: 'text',
        name: 'ds_razao',
        id: 'ds_razao',
        label: 'Razão Social',
        validation: 'required',
        outerClass: customCol('4/5')
      },
      {
        $formkit: 'mask',
        name: 'ds_cnpj',
        id: 'ds_cnpj',
        mask: '##.###.###/####-##',
        label: 'Cnpj',
        attrs: {
          '@keydown.enter': 'keydownHandler'
        },
        unmaskValue: true,
        outerClass: customCol('1/5')
      }
    ]
  },
  {
    $el: 'div',
    attrs: {
      class: customLine
    },
    children: [{
      $formkit: 'mask',
      name: 'ds_cpf_responsavel',
      id: 'ds_cpf_responsavel',
      mask: '###.###.###-##',
      label: 'Cpf',
      unmaskValue: true,
      outerClass: customCol('1/2')
    },
    {
      $formkit: 'mask',
      name: 'ds_telefone',
      id: 'ds_telefone',
      mask: '+55 (##) #####-####',
      label: 'Telefone',
      unmaskValue: true,
      outerClass: customCol('1/2')
    }]
  },
  {
    $formkit: 'autocomplete',
    name: 'cd_banco',
    label: 'Banco',
    options: listaBancos,
    selectionAppearance: 'option',
    outerClass: 'max-w-none'
  },
  {
    $formkit: 'autocomplete',
    name: 'cd_estoque',
    label: 'Estoque',
    selectionAppearance: 'option',
    options: searchEstoque,
    optionLoader: loadEstoque
  },
  {
    $formkit: 'email',
    name: 'ds_email',
    label: 'Email',
    validation: 'email'
  },
  {
    $formkit: 'colorpicker',
    name: 'ds_cor',
    label: 'Cor'
  },
  {
    $formkit: 'currency',
    name: 'nr_nfe_iss',
    label: 'Iss (%)',
    currency: 'BRL',
    displayLocale: 'pt-BR',
    valueFormat: 'number' // string
  },
  {
    $formkit: 'number',
    name: 'nr_nfe_pis',
    label: 'Pis (%)',
    number: 'float' // integer
  },
  {
    $formkit: 'url',
    name: 'ds_site',
    label: 'Site',
    placeholder: 'https://www.example.com...',
    validation: 'url',
    help: 'website'
  },
  {
    $formkit: 'checkbox',
    name: 'sn_empresa',
    label: 'Ativo ?'
  },
  {
    $formkit: 'toggle',
    name: 'sn_matriz',
    label: 'Matriz ?',
    onValue: true,
    offValue: false
  },
  {
    $formkit: 'textarea',
    name: 'bb_portal_anexo',
    label: 'Texto'
  },
  {
    $formkit: 'datepicker',
    name: 'dt_empresa',
    id: 'dt_empresa',
    popover: true,
    // value: new Date(),
    format: 'DD/MM/YYYY',
    minDate: new Date(),
    // validation: '(1000)date_format:DD/MM/YYYY',
    // valueFormat: 'YYYY-MM-DD',
    label: 'Data'
  }
  // {
  //   $formkit: 'tel',
  //   name: 'ds_telefone',
  //   label: 'Telefone',
  //   placeholder: '(xx)-xxxx-xxxx',
  //   validation: 'matches:/^[0-9]{2}-[0-9]{4}-[0-9]{4}$/',
  //   validationMessages: { matches: 'Phone number must be in the format xx-xxxx-xxxx' },
  //   validationVisibility: 'dirty'
  // }
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
    onClick: () => {
      console.log('clicked')
    },
    onKeyDown: (event: Event) => {
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
//   node.on('mounted', async (context) => {
//     console.log('form mounted', context)
//     const fields = context.origin.children.map((child) => {
//       console.log('child', child)
//       return child.name
//     }).join(',')
//     console.log('fields', fields)
//     if (props.id === 0) {
//       model.value = {}
//     } else {
//       await api.get(props.id, fields)
//       model.value = item.value
//     }

//     // debugger
//     // Now we can listen to form commit values and reasonably
//     // expect they come from user inputs.
//     node.on('commit', ({ payload }) => {
//       console.log('form values', payload)
//     })
//     node.on('change', ({ payload }) => {
//       console.log('form change', payload)
//     })
//   })
// }
const cnpj = useFormKitNodeById('ds_cnpj', (node) => {
  node.on('commit', ({ payload }) => {
    console.log('commit', payload)
  })
  node.on('input', ({ payload }) => {
    console.log('input', payload)
  })
  node.on('mounted', () => {
    console.log('mounted')
  })
  node.on('created', () => {
    console.log('created')
  })
})
console.log('cnpj', cnpj)
useFormKitNodeById('dt_empresa', (node) => {
  node.on('commit', ({ payload }) => {
    console.log('commit', payload)
  })
})
// @keydown.enter="keydownHandler"
// const apiForm: typeof FormKitSchema = ref(null)
</script>

<template>
  <BaseForm
    title="Cadastro de Empresas"
    @close="onClose"
  >
    <FormKit
      v-slot="{ state: { dirty } }"
      v-model="model"
      dirty-behavior="compare"
      type="form"
      :data="data"
      :actions="false"
      @submit="onSubmit"
      @close="onClose"
    >
      <FormKitSchema
        :schema="schema"
      />
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
