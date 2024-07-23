<script setup lang="ts">
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useSetup } from '~/composables/gerencial/useSetup'
import { Messages } from '~/types/system'

const geral = [{
  $formkit: 'hidden',
  name: 'cd_setup'
},
{
  $formkit: 'text',
  name: 'ds_versao',
  label: 'ID',
  validation: 'required',
  outerClass: formClass(8)
},
{
  $formkit: 'number',
  name: 'nr_versao',
  label: 'Versão',
  outerClass: formClass(2)
},
{
  $formkit: 'number',
  name: 'nr_login_tempo',
  label: 'Tempo Ocioso',
  outerClass: formClass(2)
}]
const imagem = []
const schema: FormKitSchemaDefinition = [
  {
    $formkit: 'multi-step',
    tabStyle: 'tab',
    name: 'setup',
    outerClass: formClass(12),
    wrapperClass: '!max-w-full',
    children: [
      {
        $formkit: 'step',
        name: 'geral',
        label: 'Geral',
        stepInnerClass: formClass(),
        children: geral
      },
      {
        $formkit: 'step',
        name: 'imagem',
        label: 'Imagem',
        stepInnerClass: formClass(),
        children: imagem
      }
    ]
  }
]
const onSubmit = async (...args) => {
  console.log('onSubmit', args)
  await useSetup().update(1, args)
  useMessage().showMessage(Messages.MSG_SYS_OK)
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <div class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          Setup
        </div>

        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="navigateTo('/')"
        />
      </div>
    </template>
    <BaseFormLayout
      :id="1"
      :schema
      :controller="useSetup()"
      :group="loadSchemaGroup(schema)"
      @submit="onSubmit"
    />
  </UCard>
</template>
