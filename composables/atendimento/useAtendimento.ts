export const useAtendimento = () => {
  const useBase = useBaseStore('/atendimento/atendimento')
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
  async function findSla(cd_sala: number) {
    return getFieldList(await useBase.find('sla', { cd_sala }))
  }
  // async function doFluxoFicha(cd_atendimento: number) {
  //   return await post('doFluxoFicha', { cd_atendimento })
  // }
  // async function doFluxoCancela(cd_atendimento: number, ds_motivo: string = '') {
  //   return await post('doFluxoCancela', { cd_atendimento, ds_motivo })
  // }
  async function doFluxoDeleta(cd_atendimento: number) {
    return await post('doFluxoDeleta', { cd_atendimento })
  }
  async function doFluxoPreparo(cd_atendimento: number) {
    return await post('doFluxoPreparo', { cd_atendimento })
  }
  async function doFluxoSala(cd_atendimento: number) {
    return await post('doFluxoSala', { cd_atendimento })
  }
  async function doFluxoExame(cd_exame: number) {
    return await post('doFluxoExame', { cd_exame })
  }
  async function execFicha(cd_atendimento: number) {
    return useBase.exec('ficha', { cd_atendimento })
  }
  async function execFichaCancela(cd_atendimento: number, cd_motivo: number = 0, ds_motivo: string = '') {
    return useBase.exec('cancela', { cd_atendimento, cd_motivo, ds_motivo })
  }
  return {
    execFicha,
    execFichaCancela,
    doFluxoDeleta,
    doFluxoExame,
    doFluxoPreparo,
    doFluxoSala,
    findSla,
    doListaMedico,
    ...useBase
  }
}
