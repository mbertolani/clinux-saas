import type { ItemDataType, ItemAlignment, AgGridColumn, DbGridColumn } from '@/types/grid'

export const useGrid = () => {
  const headerColumns: Ref<DbGridColumn[]> = ref([])
  const gridFontSize = 13

  // const translateDataType = (type: string): TableColumnType | undefined => {
  //   const types: Record<string, TableColumnType | undefined> = {
  //     ftInteger: undefined,
  //     ftFloat: 'CURRENCY',
  //     ftCurrency: 'CURRENCY',
  //     ftDate: 'DATE',
  //     ftTime: undefined,
  //     ftDateTime: 'DATETIME',
  //     ftBoolean: 'BOOLEAN',
  //     ftString: undefined
  //   }
  //   return types[type]
  // }

  const dataTypeWidthMapping: Record<ItemDataType, number> = {
    ftBoolean: 8 * gridFontSize,
    ftDate: 9 * gridFontSize,
    ftDateTime: 12 * gridFontSize,
    ftInteger: 8 * gridFontSize,
    ftString: 0
  }
  const dataTypeMapping: Record<ItemDataType, string> = {
    ftString: 'text',
    ftInteger: 'number',
    ftDate: 'dateString',
    ftDateTime: 'dateString',
    ftBoolean: 'boolean'
  }
  const alignmentMapping: Record<ItemAlignment, string> = {
    taLeftJustify: 'ag-left-aligned-cell',
    taRightJustify: 'ag-right-aligned-cell',
    taCenter: 'ag-center-aligned-cell'
  }
  const formatWidth = (item: DbGridColumn): number => {
    return dataTypeWidthMapping[item.dataType] || item.size * 5
  }
  const formatCellClass = (item: DbGridColumn): string => {
    return alignmentMapping[item.alignment] || 'ag-default-cell'
  }
  const formatDataType = (item: DbGridColumn): string => {
    return dataTypeMapping[item.dataType] || 'text'
  }
  const formatDisplayLabel = (item: DbGridColumn): string => {
    return item.displayLabel
  }
  const formatField = (item: DbGridColumn): string => {
    return item.fieldName
  }
  const formatFilter = (item: DbGridColumn): string => {
    switch (item.dataType) {
      case 'ftString': return 'agTextColumnFilter'
        break
      case 'ftInteger': return 'agNumberColumnFilter'
        break
      case 'ftDate': return 'agDateColumnFilter'
        break
      case 'ftDateTime': return 'agDateColumnFilter'
        break
      case 'ftBoolean': return 'agSetColumnFilter'
        break
      default: return ''
    }
  }

  const columnDefs = computed((): AgGridColumn[] => {
    const spaceOne: Array<DbGridColumn> = headerColumns.value.filter(item => item.visible)
    const spaceTwo: AgGridColumn[] = spaceOne.map(item => ({
      field: formatField(item),
      headerName: formatDisplayLabel(item),
      cellDataType: formatDataType(item),
      width: formatWidth(item),
      filter: formatFilter(item),
      cellClass: formatCellClass(item)
    }))

    return spaceTwo
  })

  const getColumns = async () => {
    const response = await useNuxtApp().$api('/grid')
    headerColumns.value = response as DbGridColumn[]
  }
  return {
    columnDefs,
    getColumns
  }
}
