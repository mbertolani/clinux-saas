export const useReportLaudo = () => {
  const useReportLaudoFila = useBaseStore('/report/laudo/fila')
  const useReportLaudoAtrasado = useBaseStore('/report/laudo/fila')
  const useReportLaudoRecebido = useBaseStore('/report/laudo/analitico')
  const useReportLaudoAnalitico = useBaseStore('/report/laudo/exame')
  const useReportLaudoSintetico = useBaseStore('/report/laudo/sintetico')
  return {
    ...{ useReportLaudoFila },
    ...{ useReportLaudoAtrasado },
    ...{ useReportLaudoRecebido },
    ...{ useReportLaudoAnalitico },
    ...{ useReportLaudoSintetico }
  }
}
