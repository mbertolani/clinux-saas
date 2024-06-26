<template>
  <FormKit
    type="form"
    :actions="false"
  >
    <BaseLayout>
      <FiltroSala :cols="6" />
      <FiltroMedico :cols="6" />
    </BaseLayout>
  </FormKit>
</template>
