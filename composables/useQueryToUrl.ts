export const useQueryToUrl = (query: any) => {
  const keyValuePairs = Object.keys(query).map(key => `${key}=${query[key]}`)
  return keyValuePairs.join('&')
}
