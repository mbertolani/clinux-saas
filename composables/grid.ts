export interface Grid {
  alignment: string
  fieldName: string
  displayLabel: string
  dataType: string
  size: number
  origin: string
  key: boolean
  required: boolean
  visible: boolean
  readOnly: boolean
}
export const useGrid = () => {
  return ref()
}
