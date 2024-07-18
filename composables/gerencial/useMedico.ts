import { useProcedimento } from './useProcedimento'
import { useSala } from './useSala'

export const useMedico = (id?: number) => {
  const useMedicoProcedimento = useBaseStore(`/gerencial/medico/${id}/procedimento`)
  const useMedicoSala = useBaseStore(`/gerencial/medico/${id}/sala`)

  async function getProcedimento() {
    const response = await useMedicoProcedimento.getAll()
    return {
      primary: response,
      foreign: response.map((item: any) => item.cd_procedimento)
    }
  }
  async function getMedicoSala() {
    const response = await useMedicoSala.getAll()
    return {
      primary: response,
      foreign: response.map((item: any) => item.cd_sala)
    }
  }
  async function getProcedimentos() {
    return getFieldList(await useProcedimento().find('sigla'), 'cd_procedimento', 'ds_procedimento')
  }
  async function getSalas() {
    return getFieldList(await useSala().getAll(), 'cd_sala', 'ds_sala')
  }
  // async function getModalidade() {
  //   return getFieldList(await useModalidade().getAll())
  // }
  return {
    getMedicoSala,
    getSalas,
    getProcedimento,
    getProcedimentos,
    useMedicoProcedimento,
    useMedicoSala,
    ...useBaseStore('/gerencial/medico')
  }
}
