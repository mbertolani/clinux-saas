import { useProcedimento } from './useProcedimento'

export const useMedico = (id?: number) => {
  const useMedicoProcedimento = useBaseStore(`/gerencial/medico/${id}/procedimento`)
  async function getProcedimento() {
    const response = await useMedicoProcedimento.getAll()
    return {
      primary: response,
      foreign: response.map((item: any) => item.cd_procedimento)
    }
  }
  async function getProcedimentos(id: number) {
    return getFieldList(await useProcedimento().getAll({ cd_modalidade: id }), 'cd_procedimento', 'ds_procedimento')
  }
  return {
    getProcedimento,
    getProcedimentos,
    useMedicoProcedimento,
    ...useBaseStore('/gerencial/medico')
  }
}
