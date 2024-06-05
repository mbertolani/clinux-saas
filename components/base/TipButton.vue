<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  click: {
    type: Function,
    required: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})
console.log(props)
</script>

<template>
  <UDivider
    v-if="!props.text"
    orientation="vertical"
  />
  <UTooltip
    v-else
    :text
  >
    <UButton
      :label
      :icon
      :disabled
      :click
      :square="true"
      class="px-2 py-2"
    />
  </UTooltip>
</template>
