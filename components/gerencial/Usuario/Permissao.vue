<script lang="ts" setup>
import { useFormulario } from '~/composables/gerencial/useFormulario'
import { useUsuarioGrupo } from '~/composables/gerencial/useUsuarioGrupo'
import { useUsuario } from '~/composables/gerencial/useUsuario'

const emit = defineEmits(['close'])
const props = defineProps({
  id: {
    type: Number,
    default: null
  }
})
// const grupo = await useUsuario().getGrupo()
// const janelas = await useFormulario().findJanela() // formGroupList(await useFormulario().find('janela'))
// const grupos = await useUsuarioGrupo().getItemList()
const [grupo, janelas, grupos] = await Promise.all([
  useUsuario().getGrupo(),
  useFormulario().findJanela(),
  useUsuarioGrupo().getItemList()
])
const operacao = ref([])
const cadastro = ref([])
const value = {
  cd_form: props.id,
  cd_grupo: grupo,
  cd_operacao: [],
  cd_cadastro: []
}
const getLista = async (cd_form, cd_grupo) => {
  if (!cd_form || !cd_grupo) return

  const operacaoOptions = await useFormulario().findOperacao(cd_form)
  const cadastroOptions = [
    { label: 'Inserir', value: 0 },
    { label: 'Editar', value: 1 },
    { label: 'Apagar', value: 2 },
    { label: 'Visualizar', value: 3 },
    { label: 'Imprimir', value: 4 }
  ]
  operacao.value = await useFormulario().getOperacao(cd_form, cd_grupo)
  cadastro.value = await useFormulario().getCadastro(cd_form, cd_grupo)

  // console.log(cadastroValues, operacaoValues)

  getNode('cd_operacao').props.options = operacaoOptions
  getNode('cd_operacao').input(operacao.value)

  getNode('cd_cadastro').props.options = cadastroOptions
  getNode('cd_cadastro').input(cadastro.value)
}
// useFormKitNodeById('cd_form', (node) => {
//   node.on('commit', () => {
//     getLista(getNode('cd_form').value, getNode('cd_grupo').value)
//   })
// })
// useFormKitNodeById('cd_grupo', (node) => {
//   node.on('commit', () => {
//     getLista(getNode('cd_form').value, getNode('cd_grupo').value)
//   })
// })
const setLista = (node) => {
  node.on('commit', () => {
    getLista(getNode('cd_form').value, getNode('cd_grupo').value)
  })
}
const setNode = (node) => {
  node.on('mounted', () => {
    getLista(getNode('cd_form').value, getNode('cd_grupo').value)
  })
}
const onSubmit = async (data) => {
  await Promise.all([
    useFormulario().setOperacao(data.cd_form, data.cd_grupo, data.cd_operacao.join(',')),
    useFormulario().setCadastro(data.cd_form, data.cd_grupo, data.cd_cadastro.join(','))
  ])
  if (operacao.value.join(',') != data.cd_operacao.join(','))
    useFormulario().setOperacao(data.cd_form, data.cd_grupo, data.cd_operacao.join(','))
  if (cadastro.value.join(',') != data.cd_cadastro.join(','))
    useFormulario().setCadastro(data.cd_form, data.cd_grupo, data.cd_cadastro.join(','))
  useMessage().showMessage('Permissão atualizada com sucesso !')
}
</script>

<template>
  <ModalFullScreen
    title="Controle de Permissão"
    @close="emit('close')"
  >
    <FormKit
      id="form-kit"
      type="form"
      :value
      @submit="onSubmit"
      @node="setNode"
    >
      <BaseLayout>
        <FormKit
          id="cd_form"
          type="dropdown"
          name="cd_form"
          label="Formulário"
          :options="janelas"
          validation="required"
          :outer-class="formClass(6)"
          @node="setLista"
        />
        <FormKit
          id="cd_grupo"
          type="dropdown"
          name="cd_grupo"
          label="Grupo"
          :options="grupos"
          validation="required"
          :outer-class="formClass(6)"
          @node="setLista"
        />
        <FormKit
          id="cd_cadastro"
          name="cd_cadastro"
          type="checkbox"
          label="Operações Básicas"
          :outer-class="formClass(6)"
        />
        <FormKit
          id="cd_operacao"
          name="cd_operacao"
          type="checkbox"
          label="Operações Auxiliares"
          :outer-class="formClass(6)"
        />
        <!-- <FormKit
          id="formulario"
          name="formulario"
          type="group"
          :class="formClass(6)"
        >
          <FormKit
            type="toggle"
            name="sn_insert"
            label="Inserir"
          />
          <FormKit
            type="toggle"
            name="sn_edit"
            label="Editar"
          />
          <FormKit
            type="toggle"
            name="sn_delete"
            label="Apagar"
          />
          <FormKit
            type="toggle"
            name="sn_view"
            label="Visualizar"
          />
          <FormKit
            type="toggle"
            name="sn_print"
            label="Imprimir"
          />
        </FormKit> -->
      </BaseLayout>
    </FormKit>
  </ModalFullScreen>
</template>
