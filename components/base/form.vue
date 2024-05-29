<script lang="ts" setup>
import { FormKitSchema } from '@formkit/vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  schema: {
    type: Array<any>,
    required: true
  },
  data: {
    type: Object,
    default: () => ({}),
    required: false
  }
})
const model = ref(props.data)
const emit = defineEmits(['success', 'close'])

function onClose() {
  emit('close')
}
// function onSuccess() {
//   emit('success')
// }
async function submitHandler(_data: any) {
  emit('success', model.value)
  // await new Promise(resolve => setTimeout(resolve, 1000))
  // node.setErrors([
  //   'The server doesn’t like your name 😃. Sorry.'
  // ])
}

defineShortcuts({
  escape: {
    usingInput: true,
    // whenever: [isOpen],
    handler: () => { onClose() }
  }
})
</script>

<template>
  <UModal prevent-close>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ props.title }}
          </div>

          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="onClose()"
          />
        </div>
      </template>

      <FormKit
        v-slot="{ state: { dirty } }"
        v-model="model"
        dirty-behavior="compare"
        type="form"
        :actions="false"
        @submit="submitHandler"
      >
        <FormKitSchema
          :schema="props.schema"
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
    </UCard>
  </UModal>
</template>
