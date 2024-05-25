export const getFormattedCurrency = (value: string) => {
  if (!value) return 'R$ 0,00'

  const val = ((value as unknown as number) / 1).toFixed(2).replace('.', ',')

  return 'R$ ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const getFormattedPercent = (value: string) => {
  if (!value) return '0,00%'

  const val = ((value as unknown as number) / 1).toFixed(2).replace('.', ',')

  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '%'
}

export const formatToNumber = (value: string) => {
  // Remove os pontos de separação de milhares
  const semPontos = value.replace(/\./g, '')

  // Substitui a vírgula por ponto para transformar em número decimal
  const numero = semPontos.replace(',', '.')

  return numero
}

export const formatToCurrency = (value: string) => {
  const val = ((value as unknown as number) / 1).toFixed(2)

  // Divide o número em partes separando a parte inteira da parte decimal
  const [parteInteira, parteDecimal] = val.split('.')

  // Adiciona separadores de milhares na parte inteira
  const parteInteiraFormatada = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  // Concatena a parte inteira formatada com a parte decimal
  const numeroFormatado = `${parteInteiraFormatada},${parteDecimal}`

  return numeroFormatado
}
