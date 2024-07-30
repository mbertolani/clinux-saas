export function formClass(cols?: number) {
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
      return 'grid gap-x-2 grid-cols-1 md:grid-cols-12'
  }
}
export function getFieldName(schema) {
  return schema.reduce((acc, item) => {
    if (item.name) {
      if (!('group,step,multi-step').includes(item.$formkit))
        acc.push(item.name)
    }
    if (item.children) {
      acc.push(...getFieldName(item.children))
    }
    return acc
  }, [])
}
export function loadSchemaGroup(schema) {
  const resultado = {}
  schema.forEach((root) => {
    if (root.$formkit === 'multi-step') {
      resultado[root.name] = {}
      root.children.forEach((step) => {
        if (step.$formkit === 'step') {
          const stepName = step.name
          resultado[root.name][stepName] = resultado[root.name][stepName] || {}
          step.children.forEach((child) => {
            resultado[root.name][stepName][child.name] = null
          })
        }
      })
    }
  })
  return resultado
}
export function setSchemaGroup(origem, destino) {
  const firstKey = Object.keys(destino)[0]
  Object.keys(destino[firstKey]).forEach((section) => {
    Object.keys(destino[firstKey][section]).forEach((key) => {
      destino[firstKey][section][key] = origem[key]
    })
  })
  return destino
}
export function getSchemaGroup(obj) {
  const leafNodes = {}
  function findLeafNodes(node, path = '') {
    if (typeof node === 'object' && node !== null) {
      Object.entries(node).forEach(([key, value]) => {
        const newPath = key
        findLeafNodes(value, newPath)
      })
    } else {
      leafNodes[path] = node
    }
  }
  findLeafNodes(obj)
  return leafNodes
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
    ? getFieldOrder(list.map((result) => {
      return getFieldItem(result, value, label)
    }), 'label')
    : []
}
export function getFieldListOrder(list, value?: string, label?: string) {
  return list
    ? list.map((result) => {
      return getFieldItem(result, value, label)
    })
    : []
}

export function getFieldOrder(lista: any[], propriedade: string): any[] {
  return lista.sort((a, b) => {
    if (a[propriedade] < b[propriedade]) {
      return -1
    }
    if (a[propriedade] > b[propriedade]) {
      return 1
    }
    return 0
  })
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
export const onlyNumbers = (str: string): string => {
  return str.replace(/\D/g, '')
}
export const isNumeric = (str: string): boolean => {
  return /^[0-9]+$/.test(str)
}
export function isValidDate(str: string): boolean {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/
  const match = str.match(regex)
  return match ? true : false
}
