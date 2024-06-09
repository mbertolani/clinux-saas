const serviceUrl = 'https://editor.telelaudo.com.br/api/documenteditor/'

export const useUseEditor = () => {
  const Import = async (body: string): Promise<string> => {
    return await post('Import', body)
  }
  const SfdtToHtml = async (body: string) => {
    return await post('SfdtToHtml', body)
  }
  const SfdToRtf = async (body: string) => {
    return await post('ExportToRtf', body)
  }
  const SystemClipboard = async (body: string) => {
    return await post('SystemClipboard', body)
  }
  const post = async (payload: string, body: string): Promise<string> => {
    const formData = new FormData()
    formData.append('name', 'laudo.rtf')
    formData.append('contents', new Blob([body], { type: 'application/rtf' }))
    const response = await $fetch(payload, {
      baseURL: serviceUrl,
      method: 'POST',
      body: formData
    }).catch((e) => {
      console.error(e)
    })
    return response as string
  }
  return {
    Import,
    SfdtToHtml,
    SfdToRtf,
    SystemClipboard
  }
}
