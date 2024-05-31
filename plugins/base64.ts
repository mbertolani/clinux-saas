function encodeBase64(value: string): string {
  if (import.meta.client) {
    return window.btoa(unescape(encodeURIComponent(value)))
  } else {
    return Buffer.from(value, 'ascii').toString('base64')
  }
}

function decodeBase64(value: string): string {
  if (import.meta.client) {
    return decodeURIComponent(escape(window.atob(value)))
  } else {
    return Buffer.from(value, 'base64').toString('ascii')
  }
}

function base64ToJson(value: string): any {
  return JSON.parse(decodeBase64(value))
}

function jsonToBase64(value: any): string {
  return encodeBase64(JSON.stringify(value))
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      encodeBase64,
      decodeBase64,
      base64ToJson,
      jsonToBase64
    }
  }
})
