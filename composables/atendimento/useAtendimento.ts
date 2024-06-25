export const useAtendimento = () => {
  async function post(url: string, body?: object) {
    return await useHttp(`se1/${url}`, { method: 'post', body, fileUpload: true })
  }
  async function doListaMedico(payload: {
    cd_paciente?: number
    cd_empresa?: number
    cd_medico?: number
    cd_modalidade?: number
    cd_procedimento?: number
    cd_plano?: number
    cd_laudo?: number
  }) {
    return await post('doListaMedico', payload)
  }
  return {
    doListaMedico,
    ...useBaseStore('/atendimento/atendimento')
  }
}
