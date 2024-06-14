import { defineStore } from 'pinia'

export type Empresa = {
  cd_empresa: number
  ds_empresa: string
}

// export const useEmpresaStore = useBaseStore<Empresa>('empresa', '/gerencial/empresa')

export const useEmpresaStore = defineStore('empresa', () => {
  function sayOla() {
    console.log('Ola')
  }
  return {
    ...useBaseStore('/gerencial/empresa'),
    sayOla
  }
})
