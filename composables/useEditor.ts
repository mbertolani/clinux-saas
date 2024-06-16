const serviceUrl = 'https://editor.telelaudo.com.br/api/documenteditor/'

export const useEditor = () => {
  const Export = async (body: string): Promise<string> => {
    return await post('Export', body)
  }
  const Import = async (body: string): Promise<string> => {
    return await post('Import', body)
  }
  const SfdtToHtml = async (body: string): Promise<any> => {
    return await post('SfdtToHtml', body)
  }
  const SfdToRtf = async (body: string): Promise<any> => {
    return await post('ExportToRtf', body)
  }
  const SystemClipboard = async (body: string): Promise<any> => {
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
  const RtfToHtml = async (body: any): Promise<any> => {
    const formData = new FormData()
    Object.keys(body).forEach(key => formData.append(key, body[key]))
    const response = await $fetch('www/doRtf2Htm', {
      baseURL: 'https://editor.telelaudo.com.br',
      method: 'POST',
      body: formData
    }).catch((e) => {
      console.error(e)
    })
    return response
  }
  const RtfToTxt = async (body: any): Promise<any> => {
    const formData = new FormData()
    Object.keys(body).forEach(key => formData.append(key, body[key]))
    const response = await $fetch('www/doRtf2Txt', {
      baseURL: 'https://editor.telelaudo.com.br',
      method: 'POST',
      body: formData
    }).catch((e) => {
      console.error(e)
    })
    return response
  }
  return {
    Import,
    Export,
    SfdtToHtml,
    SfdToRtf,
    SystemClipboard,
    RtfToHtml,
    RtfToTxt
  }
}
