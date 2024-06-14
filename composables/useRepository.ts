import type { NitroFetchRequest, $Fetch } from 'nitropack'

export type User = {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
}

export const userRepository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
  async get(): Promise<User[]> {
    return fetch('/users')
  }
})

// const { $apiServer } = useNuxtApp()
// const userReposity = userRepository($apiServer)
// const users: Ref<User[]> = ref([])

// const fetchUsers = async () => {
//   try {
//     users.value = await userReposity.get()
//   } catch (error: any) {
//     throw new Error(error)
//   }
// }

// fetchUsers
