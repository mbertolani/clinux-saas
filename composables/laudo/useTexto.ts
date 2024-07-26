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
    return await getBlob(id, 'bb_formula')
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
    ...useBase
  }
}
