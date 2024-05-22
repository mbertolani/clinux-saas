<script setup>
const url = '/se1/doPortalSetup'
const { data: modules, pending, status, error } = await useCustomFetch(url, { method: 'POST' })
</script>

<template>
  <div>
    <h1 class="text-xl">
      - Status: {{ status }}
    </h1>
    <h2 class="text-xl">
      - Error: {{ error }}
    </h2>
    {{ pending ? 'Loading...' : 'Loaded' }}
    <div class="border border-gray-200 dark:border-gray-800 max-h-96 mt-4 overflow-auto p-4 rounded-lg">
      <pre class="text-left text-xs">{{ modules }}</pre>
    </div>
  </div>
</template>
