<script setup lang="ts">
const options = getFieldList([
  { cd_tipo: 'cd_paciente', ds_tipo: 'Código' },
  { cd_tipo: 'ds_paciente', ds_tipo: 'Nome' },
  { cd_tipo: 'ds_cpf', ds_tipo: 'CPF' },
  { cd_tipo: 'ds_email', ds_tipo: 'E-mail' },
  { cd_tipo: 'ds_telefone', ds_tipo: 'Telefone' },
  { cd_tipo: 'dt_nascimento', ds_tipo: 'Data Nascimento' }
])
const filtro = ref({ cd_tipo: 'ds_paciente', ds_filtro: '' })
const model = defineModel({ type: Object })
watch(filtro, () => {
  model.value = { [filtro.value.cd_tipo]: filtro.value.ds_filtro }
})

// const setMask = computed(() => {
//   switch (filtro.value.cd_tipo) {
//     case 'ds_cpf':
//       return '##.###.###/####-##'
//     case 'ds_telefone':
//       return '(##) #####-####'
//     case 'dt_nascimento':
//       return '##/##/####'
//     default:
//       return 'aaaaaaaaaaaaaaaaaaa'
//   }
// })
</script>

<template>
  <FormKit
    v-model="filtro"
    type="form"
    :actions="false"
  >
    <BaseLayout>
      <FormKit
        type="dropdown"
        placeholder="Tipo"
        name="cd_tipo"
        :options
        :outer-class="formClass(3)"
      />
      <FormKit
        type="text"
        placeholder="Filtro"
        name="ds_filtro"
        :outer-class="formClass(6)"
      />
    </BaseLayout>
  </FormKit>
</template>
