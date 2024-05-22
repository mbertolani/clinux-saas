import { genesisIcons } from '@formkit/icons'
import { defineFormKitConfig } from '@formkit/vue'
import { createProPlugin, rating, toggle } from '@formkit/pro'
import { rootClasses } from './formkit.theme'

const proPlugin = createProPlugin('fk-5bd805bc8f', {
  rating,
  toggle
  // any other Pro Inputs
})

export default defineFormKitConfig(() => ({
  plugins: [proPlugin],
  icons: { ...genesisIcons },
  config: { rootClasses }
}))
