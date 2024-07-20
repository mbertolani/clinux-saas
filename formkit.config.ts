import { genesisIcons } from '@formkit/icons'
import { defineFormKitConfig } from '@formkit/vue'
import { createProPlugin, autocomplete,
  colorpicker,
  datepicker,
  dropdown,
  mask,
  rating,
  repeater,
  slider,
  taglist,
  toggle,
  togglebuttons,
  transferlist,
  currency } from '@formkit/pro'
import { pt } from '@formkit/i18n'
import { createMultiStepPlugin } from '@formkit/addons'
import { rootClasses } from './formkit.theme'
import '@formkit/addons/css/multistep'

const proPlugin = createProPlugin('fk-5bd805bc8f', {
  autocomplete,
  colorpicker,
  datepicker,
  dropdown,
  mask,
  rating,
  repeater,
  slider,
  taglist,
  toggle,
  togglebuttons,
  transferlist,
  currency
  // any other Pro Inputs
})
/**
 * Set initial values to empty strings instead of undefined
 **/

function defaultToEmptyString(node) {
  node.hook.input((value, next) => {
    if (value === undefined) return next(null)
    return next(value)
  })
}
/**
 * A little plugin that automatically scrolls to the first error.
 **/
function scrollToErrors(node) {
  if (node.props.type === 'form') {
    function scrollTo(node) {
      const el = document.getElementById(node.props.id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
      }
    }

    function scrollToErrors() {
      node.walk((child) => {
        // Check if this child has errors
        if (child.ledger.value('blocking') || child.ledger.value('errors')) {
          // We found an input with validation errors
          scrollTo(child)
          // Stop searching
          return false
        }
      }, true)
    }

    const onSubmitInvalid = node.props.onSubmitInvalid
    node.props.onSubmitInvalid = () => {
      if (onSubmitInvalid) {
        onSubmitInvalid(node)
      }
      scrollToErrors()
    }
    node.on('unsettled:errors', scrollToErrors)
  }
  return false
}

export default defineFormKitConfig(() => ({
  plugins: [proPlugin, scrollToErrors, defaultToEmptyString, createMultiStepPlugin()],
  icons: { ...genesisIcons },
  locales: { pt },
  locale: 'pt',
  config: { rootClasses }
}))
