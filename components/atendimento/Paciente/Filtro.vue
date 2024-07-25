<script setup lang="ts">
const options = getFieldListOrder([
  { cd_tipo: 'cd_paciente', ds_tipo: 'Código' },
  { cd_tipo: 'ds_paciente', ds_tipo: 'Nome' },
  { cd_tipo: 'ds_cpf', ds_tipo: 'CPF' },
  { cd_tipo: 'ds_email', ds_tipo: 'E-mail' },
  { cd_tipo: 'ds_telefone', ds_tipo: 'Telefone' },
  { cd_tipo: 'dt_nascimento', ds_tipo: 'Data Nascimento' },
  { cd_tipo: 'dt_aniversario', ds_tipo: 'Aniversário' },
  { cd_tipo: 'sn_vip', ds_tipo: 'Vip' },
  { cd_tipo: 'sn_duplicado_cpf', ds_tipo: 'Duplicado por Cpf' },
  { cd_tipo: 'sn_duplicado_nome', ds_tipo: 'Duplicado por Nome' },
  { cd_tipo: 'sn_duplicado_mail', ds_tipo: 'Duplicado por Email' },
  { cd_tipo: 'sn_agrupado', ds_tipo: 'Agrupados' }
])
const filtro = ref({ cd_tipo: 'ds_paciente', ds_filtro: '' })
const model = defineModel({ type: Object })
watch(filtro, () => {
  model.value = filtro.value.cd_tipo.includes('sn_') ? { [filtro.value.cd_tipo]: true } : { [filtro.value.cd_tipo]: filtro.value.ds_filtro }
})
const onSubmit = (_data) => {
  console.log(_data)
}
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
    @submit="onSubmit"
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
