<script lang="ts" setup>
const apiEditor = ref(null)
// const salvar = async () => {
//   const payload = await apiEditor.value.SfdToRtf()
//   console.log(atob(payload.split(',')[1]))
// }
const linkLeo = () => {
  console.log('LEO')
}
const links: any = [
  { text: 'Leo', icon: 'i-uil-github', click: linkLeo() },
  { text: 'Imagem', icon: 'i-heroicons-newspaper' },
  { text: 'Modelos', icon: 'i-heroicons-newspaper' },
  { text: 'Auto-Texto', icon: 'i-heroicons-newspaper' },
  'divider',
  { text: 'Pendências', icon: 'i-heroicons-newspaper' },
  { text: 'Achado Crítico', icon: 'i-heroicons-newspaper' },
  'divider',
  { text: 'Anexos', icon: 'i-heroicons-newspaper' },
  { text: 'Dicionário', icon: 'i-heroicons-newspaper' },
  'divider',
  { text: 'Salvar e Revisar', icon: 'i-heroicons-newspaper' },
  { text: 'Salvar', icon: 'i-heroicons-newspaper' },
  'divider',
  { text: 'Assinar', icon: 'i-heroicons-newspaper' },
  { text: 'Assinar e Próximo', icon: 'i-heroicons-newspaper' },
  { text: 'Assinar e Imprimir', icon: 'i-heroicons-newspaper' },
  'divider',
  { text: 'Sair', icon: 'i-heroicons-newspaper' }
]
</script>

<template>
  <!-- <UButton
    label="Novo"
    :square="true"
    class="py-2 px-2"
    @click="openForm"
  >
    <Icon
      name="i-uil-github"
      size="24px"
    />
    <Icon
      name="i-healthicons-doctor"
      size="24px"
    />
    <Icon
      name="i-mdi-doctor"
      size="24px"
    />
  </UButton> -->
  <div class="py-2">
    <UHorizontalNavigation
      :links="links"
    />
    <!-- <div class="flex items-center justify-center py-2 px-2">
      <TipButton
        v-for="link in links"
        :key="link.text || link.label"
        :label="link.label"
        :text="link.text"
        :icon="link.icon"
        :click="link.click"
      />
    </div> -->
    <BaseEditor
      ref="apiEditor"
    />
  </div>
</template>
