export const usePaciente = () => {
  return {
    ...useBaseStore('/atendimento/paciente')
  }
}
