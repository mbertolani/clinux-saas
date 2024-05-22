import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  content: [
    './src/**/*.{js,ts,jsx,tsx}' // Adicione os caminhos para seus arquivos aqui
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans]
      }
    }
  }
}
