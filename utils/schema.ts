export function formClass(cols: number) {
  switch (cols) {
    case 1:
      return 'md:col-span-1'
      break
    case 2:
      return 'md:col-span-2'
      break
    case 3:
      return 'md:col-span-3'
      break
    case 4:
      return 'md:col-span-4'
      break
    case 5:
      return 'md:col-span-5'
      break
    case 6:
      return 'md:col-span-6'
      break
    case 7:
      return 'md:col-span-7'
      break
    case 8:
      return 'md:col-span-8'
      break
    case 9:
      return 'md:col-span-9'
      break
    case 10:
      return 'md:col-span-10'
      break
    case 11:
      return 'md:col-span-11'
      break
    case 12:
      return 'md:col-span-12'
      break
    default:
      return ''
  }
}
export function getFieldName(schema) {
  return schema.reduce((acc, item) => {
    if (item.name) {
      if (item.$formkit !== 'group')
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
  return obj ? btoa(obj) : ''
}
export function Decode64(obj) {
  return obj ? atob(obj) : ''
}
