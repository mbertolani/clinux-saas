export function formClass(cols: number) {
  return `md:col-span-${cols} md:mb-2`
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
