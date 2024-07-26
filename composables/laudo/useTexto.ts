export const useTexto = () => {
  const useBase = useBaseStore(`/laudo/chave`)
  const getBlob = async (id: number, field: string) => {
    const response = await useBase.get(id, field)
    return Decode64(response[field])
  }
  const getTexto = async (id: number) => {
    return await getBlob(id, 'bb_chave')
  }
  const getFormula = async (id: number) => {
    const response = await useBase.get(id, 'bb_formula')
    return Decode64(response?.bb_formula)
  }
  const getFormulaData = async (id: number) => {
    const data = await getFormula(id)
    return data ? JSON.parse(data) : null
  }
  const setTexto = async (id: number, payload: string) => {
    return await useBase.update(id, { bb_chave: payload })
  }
  const setFormula = async (id: number, payload: string) => {
    return await useBase.update(id, { bb_formula: Encode64(payload) })
  }
  return {
    setFormula,
    setTexto,
    getTexto,
    getFormula,
    getFormulaData,
    ...useBase
  }
}
