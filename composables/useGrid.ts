import type { ItemDataType, ItemAlignment, DbGridColumn } from '@/types/grid'

export const useGrid = (url: string) => {
  // const headerColumns: Ref<DbGridColumn[]> = ref([])
  const gridFontSize = 13
  const DbGridColumns = ref<DbGridColumn[]>([])
  const AgGridColumns = ref([])

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
    valueFormatter: p => new Date(p.value).toLocaleDateString('pt-BR')
  }

  const fieldCnpj = {
    valueFormatter: p => formatCNPJ(p.value)
  }

  const dataTypeWidthMapping: Record<ItemDataType, number> = {
    ftBoolean: 8 * gridFontSize,
    ftDate: 9 * gridFontSize,
    ftDateTime: 12 * gridFontSize,
    ftInteger: 8 * gridFontSize,
    ftString: 0,
    ftFloat: 10 * gridFontSize,
    ftCurrency: 10 * gridFontSize
  }
  const cellDataTypeMapping: Record<ItemDataType, string> = {
    ftString: 'text',
    ftInteger: 'number',
    ftDate: 'date',
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
  const formatWidth = (item: DbGridColumn): number => {
    return dataTypeWidthMapping[item.dataType] || item.size * 5
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

  // const data = [{
  //   cd_empresa: 175,
  //   nr_empresa: 175,
  //   cd_estoque: null,
  //   cd_banco: null,
  //   cd_centro: null,
  //   ds_empresa: 'TESTE 123 123',
  //   ds_razao: null,
  //   ds_cnpj: null,
  //   sn_ativo: true,
  //   ds_alerta: null,
  //   sn_web: true,
  //   ds_plano: null,
  //   ds_estoque: null,
  //   ds_centro: null,
  //   ds_banco: null,
  //   ds_cidade: null,
  //   ds_estado: null
  // }]

  // const columns = [
  //   {
  //     alignment: 'taRightJustify',
  //     fieldName: 'cd_empresa',
  //     displayLabel: 'Empresa',
  //     dataType: 'ftInteger',
  //     size: 0,
  //     origin: '',
  //     key: false,
  //     required: false,
  //     visible: true,
  //     readOnly: false
  //   }
  // ]

  // const convertToNativeDate = (inputDate) => {
  //   const parts = inputDate.split('/')
  //   return new Date(parts[2], parts[1] - 1, parts[0])
  // }
  function formatCNPJ(cnpj: string) {
    return cnpj?.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
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
      ...(item.dataType === 'ftFloat' ? fieldCurrency : {}),
      ...(item.dataType === 'ftInteger' ? fieldNumber : {}),
      ...(item.dataType === 'ftDate' ? fieldDate : {})
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
    getCols
  }
}
