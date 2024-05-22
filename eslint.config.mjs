// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  files: ['**/*.ts', '**/*.tsx', '**/*.vue', '**/*.js'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'off' // allow console.log in TypeScript files
  }
})
