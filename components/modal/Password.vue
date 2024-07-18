<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['submit', 'close'])
const onSubmit = async (data) => {
  emit('submit', data)
}
</script>

<template>
  <ModalFullScreen
    :title
    template
    @close="emit('close')"
  >
    <!-- <UInput
      v-model="payload"
      icon="i-mdi-lock"
      autocomplete="off"
      input-class="uppercase"
      class="py-2 px-2"
      :ui="{ icon: { trailing: { pointer: '' } } }"
      @keydown.enter="emit('submit', payload)"
    /> -->
    <FormKit
      id="form-kit"
      dirty-behavior="compare"
      type="form"
      @submit="onSubmit"
    >
      <FormKit
        type="password"
        name="password"
        label="Nova Senha"
        validation="required"
        validation-visibility="live"
      />
      <FormKit
        type="password"
        name="password_confirm"
        label="Confirmar Senha"
        validation="required|confirm"
        validation-visibility="live"
        validation-label="Confirmação de Senha"
      />
    </FormKit>
  </ModalFullScreen>
</template>
