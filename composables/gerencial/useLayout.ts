export const useLayout = () => {
  const useBase = useBaseStore(`/gerencial/layout`)
  const getBlob = async (id: number, field: string) => {
    const response = await useBase.get(id, field)
    return Decode64(response[field])
  }
  const getTexto = async (id: number) => {
    return await getBlob(id, 'bb_layout')
  }
  const getFormula = async (id: number) => {
    const response = await useBase.get(id, 'bb_sql_ae')
    return Decode64(response?.bb_sql_ae)
  }
  const getFormulaData = async (id: number) => {
    const data = await getFormula(id)
    return data ? JSON.parse(data) : null
  }
  const setTexto = async (id: number, payload: string) => {
    return await useBase.update(id, { bb_layout: payload })
  }
  const setFormula = async (id: number, payload: string) => {
    return await useBase.update(id, { bb_sql_ae: Encode64(payload) })
  }
  // const getData = async (id: number) => {
  //   const response = await useBase.find('layout', { id })
  //   return response
  // }
  return {
    // getData,
    setFormula,
    setTexto,
    getTexto,
    getFormula,
    getFormulaData,
    ...useBase
  }
}
