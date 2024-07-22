<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  master: {
    type: String,
    required: true
  },
  value: {
    type: Object,
    required: false
  }
})
const emit = defineEmits(['submit', 'close'])
const onSubmit = async data => emit('submit', data)
</script>

<template>
  <ModalFullScreen
    :title
    @close="emit('close')"
  >
    <div class="bg-emerald-600 text-white px-3 py-2 rounded mb-2 text-center">
      {{ master }}
    </div>
    <FormKit
      id="form-kit"
      dirty-behavior="compare"
      :value
      type="form"
      @submit="onSubmit"
    >
      <FormKit
        id="dt_de"
        type="date"
        label="De"
        name="dt_de"
      />
      <FormKit
        id="dt_ate"
        type="date"
        label="Até"
        name="dt_ate"
      />
    </FormKit>
  </ModalFullScreen>
</template>
