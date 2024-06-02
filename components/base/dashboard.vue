<script lang="ts" setup>
import { useMemory, useNetwork, useGeolocation } from '@vueuse/core'

function size(v: number) {
  const kb = v / 1024 / 1024
  return `${kb.toFixed(2)} MB`
}
const { locatedAt } = useGeolocation()
const { isSupported, memory } = useMemory()
const network = reactive(useNetwork())
const { isOnline } = network
</script>

<template>
  <div
    v-if="isSupported && memory"
    class="inline-grid grid-cols-2 gap-x-4 gap-y-2"
  >
    <template v-if="memory">
      <div>Memory</div>
      <div />
      <div opacity="50">
        Used
      </div><div>{{ size(memory.usedJSHeapSize) }}</div>
      <div opacity="50">
        Allocated
      </div><div>{{ size(memory.totalJSHeapSize) }}</div>
      <div opacity="50">
        Limit
      </div><div>{{ size(memory.jsHeapSizeLimit) }}</div>
      <div opacity="50">
        Network
      </div><div>{{ isOnline }}</div>
      <div opacity="50">
        Geolocation
      </div><div>
        {{ locatedAt }}
      </div>
    </template>
  </div>
  <div v-else>
    Your browser does not support performance memory API
  </div>
</template>
