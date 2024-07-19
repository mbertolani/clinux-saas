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
  options: {
    type: Object,
    required: true
  },
  value: {
    type: Array,
    default: () => []
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
      :value="{ field: value }"
      type="form"
      @submit="onSubmit"
    >
      <FormKit
        id="field"
        type="checkbox"
        name="field"
        :options
      />
    </FormKit>
  </ModalFullScreen>
</template>
