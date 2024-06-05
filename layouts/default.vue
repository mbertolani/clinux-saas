<script setup lang="ts">
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.min.css'
</script>

<template>
  <div>
    <AppHeader />

    <UMain>
      <slot />
    </UMain>

    <AppFooter />
  </div>
</template>
