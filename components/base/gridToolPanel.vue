<template>
  <UVerticalNavigation :links="convertMenuToLinks(params.menu)" />
</template>

<script>
// import { iconMapping } from '~/types/icons'

export default {
  methods: {
    convertMenuToLinks(menu) {
      return menu.filter(item => item.action).reduce((acc, item) => {
        if (item.title === '-') {
          acc.push([]) // Inicia um novo array
        } else {
          if (!acc.length) acc.push([]) // Garante que sempre haja um array para adicionar itens
          acc[acc.length - 1].push({
            label: item.title,
            // icon: `i-heroicons-${iconMapping[item.icon]}`,
            icon: item.icon,
            click: () => {
              if (typeof item.action === 'function') {
                item.action()
              } else {
                console.log(item.action)
              }
              this.params.api.closeToolPanel()
            }
          })
        }
        return acc
      }, [])
    }
  }
}
</script>
