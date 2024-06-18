export function formClass(cols: number) {
  switch (cols) {
    case 1:
      return 'md:col-span-1 md:mb-2'
      break
    case 2:
      return 'md:col-span-2 md:mb-2'
      break
    case 3:
      return 'md:col-span-3 md:mb-2'
      break
    case 4:
      return 'md:col-span-4 md:mb-2'
      break
    case 5:
      return 'md:col-span-5 md:mb-2'
      break
    case 6:
      return 'md:col-span-6 md:mb-2'
      break
    case 7:
      return 'md:col-span-7 md:mb-2'
      break
    case 8:
      return 'md:col-span-8 md:mb-2'
      break
    case 9:
      return 'md:col-span-9 md:mb-2'
      break
    case 10:
      return 'md:col-span-10 md:mb-2'
      break
    case 11:
      return 'md:col-span-11 md:mb-2'
      break
    case 12:
      return 'md:col-span-12 md:mb-2'
      break
    default:
      return ''
  }
}
export function getFieldName(schema) {
  return schema.reduce((acc, item) => {
    if (item.name) {
      acc.push(item.name)
    }
    if (item.children) {
      acc.push(...getFieldName(item.children))
    }
    return acc
  }, [])
}

export function getFieldItem(item: object, value?: string, label?: string) {
  return item
    ? {
        value: value ? item[value] : Object.values(item)[0],
        label: label ? item[label] : Object.values(item)[1]
      }
    : {}
}
export function getFieldList(list, value?: string, label?: string) {
  return list
    ? list.map((result) => {
      return getFieldItem(result, value, label)
    })
    : []
}

export function StrToNull(obj) {
  for (const key in obj) {
    if (obj[key] === '') {
      obj[key] = null
    }
  }
  return obj
}

export function Encode64(obj) {
  return obj ? btoa(obj) : null
}
export function Decode64(obj) {
  return obj ? atob(obj) : null
}
