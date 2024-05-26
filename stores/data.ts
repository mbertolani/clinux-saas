// Export a function useWorkGroupStore to define a store named "workGroup"
// export const useBaseStore = <T>(id: string, route: string) => defineStore(id, () => {
export const useBaseStore = <T>(route: string) => {
  // Access the runtime config with useRuntimeConfig
  // const config = useRuntimeConfig()

  // Define the URL for the API using the runtime config
  const url = `${useRouterStore().apiUrl}${route}`

  // Define items as a ref to an empty array
  // The "items" variable stores the list of array items retrieved from the backend.
  // required state if using useAPI composable
  const items = ref<T[]>([])

  // Define meta as a ref to an instance of Data.Meta
  // The "meta" variable stores data related to item pagination.
  // required state if using useAPI composable
  const meta = ref(null)

  // Define item as a ref to an instance of Data.EmployeeWorkgroup
  // The "item" variable stores a single item.
  // required state if using useAPI composable
  const item = ref<T>()

  // Define httpStatus as a ref set initially to true
  // required state if using useAPI composable
  const httpStatus = ref(true)

  // Define errors as a ref initially set to null
  // required state if using useAPI composable
  const errors = ref(null)

  // Define http as the result of useAPI function
  const api = useHttpData(url, items, meta, item, httpStatus, errors)

  // Define processing as a ref to a boolean, initially set to false
  const processing = ref<boolean>(false)

  // Return an object containing these variables
  return {
    errors,
    processing,
    api,
    items,
    item
  }
}
