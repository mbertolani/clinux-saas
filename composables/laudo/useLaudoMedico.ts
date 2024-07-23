export const useLaudoMedico = () => {
  return {
    ...useBaseStore(`/laudo/medico`)
  }
}
