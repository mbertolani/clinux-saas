// export type TableColumnType = 'DATE' | 'DATETIME' | 'DATETIME_PRETTY' | 'CURRENCY' | 'PERCENT' | 'BOOLEAN'

export type ItemDataType = 'ftString' | 'ftInteger' | 'ftDate' | 'ftDateTime' | 'ftBoolean'

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

export interface AgGridColumn {
  field: string
  headerName: string
  cellDataType: string
  width: number
  valueFormatter?: string
  filter: string
  filterParams?: Record<string, unknown>
  cellClass: string
}
