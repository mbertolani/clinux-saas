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
  return {
    value: Object.values(item)[0],
    label: Object.values(item)[1]
  }
}
export function getFieldList(list) {
  return list.map((result) => {
    return getFieldItem(result)
  })
}
