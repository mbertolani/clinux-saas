import { defineStore } from 'pinia'

export interface Funcionario {
  cd_funcionario: number
  ds_funcionario: string
}

export const useFuncionarioStore = defineStore('funcionario', () => {
  function sayHello() {
    console.log('Hello')
  }
  return {
    ...useBaseStore('/gerencial/funcionario'),
    sayHello
  }
})
