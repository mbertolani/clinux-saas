export const useFila = () => {
  const getHorario = async () => {
    return getFieldListOrder(await useBaseStore('/laudo/fila').find('horario'), 'ds_horario', 'ds_lista')
  }
  const getStatus = async () => {
    return getFieldListOrder(await useBaseStore('/laudo/fila').find('status'))
  }
  const getData = async () => {
    return getFieldListOrder(await useBaseStore('/laudo/fila').find('data'))
  }
  const getFluxo = async () => {
    return getFieldListOrder(await useBaseStore('/laudo/fila').find('fluxo'))
  }
  const getStatusTele = async () => {
    return getFieldListOrder(await useBaseStore('/laudo/fila').find('tele'))
  }
  const getName = async (id: number) => {
    return (await useFila().get(id, 'ds_fila')).ds_fila
  }
  const getAssociacao = async (cd_fila: number, field: string) => {
    const response = Object.values(await useBaseStore('/laudo/fila').get(cd_fila, field))[0] as any
    return response ? response.split(',').map((item: string) => parseInt(item)) : []
  }
  const setAssociacao = async (cd_fila: number, field: string, value: any) => {
    return await useBaseStore('/laudo/fila').update(cd_fila, { [field]: value })
  }
  return {
    getName,
    setAssociacao,
    getAssociacao,
    getHorario,
    getStatus,
    getData,
    getFluxo,
    getStatusTele,
    ...useBaseStore('/laudo/fila')
  }
}
