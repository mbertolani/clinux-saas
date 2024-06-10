<template>
  <div :style="proportions">
    <iframe
      :src="url"
      frameborder="0"
      width="100%"
      height="100%"
      allow="clipboard-write; microphone; fullscreen; encrypted-media"
      allowfullscreen="true"
      mozallowfullscreen="true"
      webkitallowfullscreen="true"
    />
  </div>
</template>

<script>
const baseUrl = 'https://app.leorad.com.br'

export default {
  name: 'LaudoEstruturado',
  props: {
    token: {
      type: String,
      required: true
    },
    // largura deve ser no minimo 1024px para que funcione
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: 'calc(100vh - 120px)'
    }
  },
  emits: ['laudoCapturado'],
  computed: {
    url() {
      return baseUrl + '/' + this.token
    },
    proportions() {
      return {
        height: this.height,
        width: this.width
      }
    }
  },
  mounted() {
    window.addEventListener('message', this.captureMessage, false)
  },
  unmounted() {
    window.removeEventListener('message', this.captureMessage, false)
  },
  methods: {
    captureMessage(event) {
      if (event.origin !== baseUrl)
        return

      if (typeof event.data === 'string') {
        const noLineBreak = event.data.replaceAll('\n', '')
        this.$emit('laudoCapturado', noLineBreak)
      }
    }
  }
}
</script>

<style scoped>
iframe {
  border: 0;
}
</style>
