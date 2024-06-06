import type { ItemDataType, ItemAlignment, DbGridColumn } from '@/types/grid'

export const useGrid = (url?: string) => {
  const gridFontSize = 12
  const DbGridColumns = ref<DbGridColumn[]>([])
  const AgGridColumns = ref([])

  const currencyFormatter = p =>
    parseFloat(p.value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

  const fieldCurrency = {
    filter: 'agNumberColumnFilter',
    type: 'numericColumn',
    aggFunc: 'sum',
    valueFormatter: currencyFormatter
  }

  const fieldNumber = {
    filter: 'agNumberColumnFilter',
    type: 'numericColumn',
    cellRenderer: 'agAnimateShowChangeCellRenderer',
    aggFunc: 'sum'
  }

  const fieldDate = {
    filter: 'agDateColumnFilter',
    valueFormatter: p => formatDate(p.value)
    // valueFormatter: d => d ? new Date(d.value).toLocaleDateString('pt-BR') : ''
  }

  const fieldTime = {
    valueFormatter: p => formatTime(p.value)
    // valueFormatter: d => d ? new Date(d.value).toLocaleDateString('pt-BR') : ''
  }
  const fieldCnpj = {
    valueFormatter: p => formatCNPJ(p.value)
  }
  const fieldFone = {
    valueFormatter: p => formatFone(p.value)
  }
  const fieldCel = {
    valueFormatter: p => formatCel(p.value)
  }
  const fieldCpf = {
    valueFormatter: p => formatCpf(p.value)
  }
  // const columnTypes = {
  //   currency: {
  //     width: 150,
  //     valueFormatter: currencyFormatter
  //   },
  //   ftFloat: fieldCurrency,
  //   ftInteger: fieldNumber,
  //   ftDate: fieldDate,
  //   ftCnpj: fieldCnpj,
  //   shaded: {
  //     cellClass: 'shaded-class'
  //   }
  // }
  const dataTypeWidthMapping: Record<ItemDataType, number> = {
    ftBoolean: 8 * gridFontSize,
    ftDate: 8 * gridFontSize,
    ftTime: 6 * gridFontSize,
    ftDateTime: 14 * gridFontSize,
    ftInteger: 8 * gridFontSize,
    ftString: 0,
    ftFloat: 10 * gridFontSize,
    ftCurrency: 10 * gridFontSize
  }
  const cellDataTypeMapping: Record<ItemDataType, string> = {
    ftString: 'text',
    ftInteger: 'number',
    ftDate: 'date',
    ftTime: 'text',
    ftDateTime: 'dateString',
    ftBoolean: 'boolean',
    ftFloat: 'number',
    ftCurrency: 'number'
  }
  const alignmentMapping: Record<ItemAlignment, string> = {
    taLeftJustify: 'ag-left-aligned-cell',
    taRightJustify: 'ag-right-aligned-cell',
    taCenter: 'ag-center-aligned-cell'
  }
  const dataTypeWidth = (dataType: string, size?: number): number => {
    return dataTypeWidthMapping[dataType] || size * 6
  }
  const formatWidth = (item: DbGridColumn): number => {
    const width = dataTypeWidth(item.dataType, item.size)
    return width < dataTypeWidthMapping['ftBoolean'] ? dataTypeWidthMapping['ftBoolean'] : width
  }
  const formatCellClass = (item: DbGridColumn): string => {
    return alignmentMapping[item.alignment] || 'ag-default-cell'
  }
  const formatCellDataType = (item: DbGridColumn): string => {
    return cellDataTypeMapping[item.dataType] || 'text'
  }
  const formatDisplayLabel = (item: DbGridColumn): string => {
    return item.displayLabel
  }
  const formatField = (item: DbGridColumn): string => {
    return item.fieldName
  }
  const formatFilter = (item: DbGridColumn): string => {
    switch (item.dataType) {
      case 'ftString':
        return 'agTextColumnFilter'
        break
      case 'ftInteger':
      case 'ftFloat':
        return 'agNumberColumnFilter'
        break
      case 'ftDate':
        return 'agDateColumnFilter'
        break
      case 'ftDateTime':
        return 'agDateColumnFilter'
        break
      case 'ftBoolean':
        return 'agSetColumnFilter'
        break
      default:
        return 'agTextColumnFilter'
    }
  }

  // const convertToNativeDate = (inputDate) => {
  //   const parts = inputDate.split('/')
  //   return new Date(parts[2], parts[1] - 1, parts[0])
  // }
  function formatTime(payload: string) {
    return payload?.replace(/(\d{2}):(\d{2}):(\d{2})/, '$1:$2')
  }
  function formatDate(payload: string) {
    return payload?.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')
  }
  function formatCNPJ(payload: string) {
    return payload?.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }
  function formatFone(payload: string) {
    return payload?.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  function formatCel(payload: string) {
    return payload?.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')
  }
  function formatCpf(payload: string) {
    return payload?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  // const getRows = async (data: any[]) => {
  //   const columns = await getCols()
  //   const response = data.map((item) => {
  //     columns.forEach((column) => {
  //       if (column.dataType === 'ftDate' && item[column.fieldName]) {
  //         item[column.fieldName] = convertToNativeDate(item[column.fieldName])
  //       }
  //       if (column.dataType === 'ftFloat' && item[column.fieldName]) {
  //         item[column.fieldName] = parseFloat(item[column.fieldName])
  //       }
  //       if (column.fieldName === 'ds_cnpj' && item[column.fieldName]) {
  //         item[column.fieldName] = formatCNPJ(item[column.fieldName])
  //       }
  //     })
  //     return item
  //   })
  //   return response
  // }
  const getCols = async () => {
    DbGridColumns.value = await apiGrid()
    AgGridColumns.value = DbGridColumns.value.filter(item => item.visible).map(item => ({
      field: formatField(item),
      headerName: formatDisplayLabel(item),
      cellDataType: formatCellDataType(item),
      width: formatWidth(item),
      filter: formatFilter(item),
      cellClass: formatCellClass(item),
      ...(item.fieldName.includes('ds_cnpj') ? fieldCnpj : {}),
      ...(item.fieldName.includes('ds_cpf') ? fieldCpf : {}),
      ...(item.fieldName.includes('ds_celular') ? fieldCel : {}),
      ...(item.fieldName.includes('ds_telefone') ? fieldFone : {}),
      ...(item.dataType === 'ftFloat' ? fieldCurrency : {}),
      ...(item.dataType === 'ftInteger' ? fieldNumber : {}),
      ...(item.dataType === 'ftDate' ? fieldDate : {}),
      ...(item.dataType === 'ftTime' ? fieldTime : {})
    }))
    return AgGridColumns.value
  }

  const apiGrid = async (): Promise<DbGridColumn[]> => {
    const response = await useApiData(`${url}/grid`)
    return response as DbGridColumn[]
  }

  const columns = computed(() => {
    return AgGridColumns.value
  })

  return {
    columns,
    dataTypeWidth,
    getCols
  }
}
