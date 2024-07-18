<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useUsuario } from '~/composables/gerencial/useUsuario'
import { useUsuarioGrupo } from '~/composables/gerencial/useUsuarioGrupo'

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
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'hidden',
    name: 'cd_usuario'
  },
  {
    $formkit: 'text',
    name: 'ds_usuario',
    label: 'Nome',
    validation: 'required',
    outerClass: formClass(6)
  },
  {
    $formkit: 'dropdown',
    name: 'cd_grupo',
    id: 'cd_grupo',
    bind: '$cd_grupo',
    label: 'Grupo',
    validation: 'required',
    outerClass: formClass(4)
  },
  {
    $formkit: 'number',
    name: 'nr_senha',
    label: 'Validade Senha',
    outerClass: formClass(2)
  },
  {
    $formkit: 'toggle',
    name: 'sn_login',
    label: 'Bloquear acesso concorrente ?',
    outerClass: formClass(12)
  },
  {
    $formkit: 'toggle',
    name: 'sn_autenticacao',
    label: 'Autenticação dois fatores ?',
    outerClass: formClass(12)
  }
]
const { getItemList, getItem } = useUsuarioGrupo()
const data = reactive({
  cd_grupo: {
    optionLoader: async (id, cachedOption) => {
      if (cachedOption) return cachedOption
      if (!id) return []
      return await getItem(id)
    },
    options: async () => {
      return await getItemList()
    }
  }
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
      :controller="useUsuario()"
      @submit="onSubmit"
    />
  </BaseForm>
</template>
