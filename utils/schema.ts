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

export function getFieldItem(item) {
  return item
    ? {
        value: Object.values(item)[0],
        label: Object.values(item)[1]
      }
    : {}
}
export function getFieldList(list) {
  return list
    ? list.map((result) => {
      return getFieldItem(result)
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
