export type TableColumnType = 'DATE' | 'DATETIME' | 'DATETIME_PRETTY' | 'CURRENCY' | 'PERCENT' | 'BOOLEAN'

export type ItemDataType = 'ftString' | 'ftInteger' | 'ftDate' | 'ftDateTime' | 'ftBoolean' | 'ftFloat' | 'ftCurrency'

export type ItemAlignment = 'taLeftJustify' | 'taRightJustify' | 'taCenter'

export interface DbGridColumn {
  alignment: ItemAlignment
  fieldName: string
  displayLabel: string
  dataType: ItemDataType
  size: number
  origin: string
  key: boolean
  required: boolean
  visible: boolean
  readOnly: boolean
}

export const translateDataType = (type: string): TableColumnType | undefined => {
  const types: Record<string, TableColumnType | undefined> = {
    ftInteger: undefined,
    ftFloat: 'CURRENCY',
    ftCurrency: 'CURRENCY',
    ftDate: 'DATE',
    ftTime: undefined,
    ftDateTime: 'DATETIME',
    ftBoolean: 'BOOLEAN',
    ftString: undefined
  }
  return types[type]
}
export type ActionMenuItem = {
  name: string
  action: any
}
