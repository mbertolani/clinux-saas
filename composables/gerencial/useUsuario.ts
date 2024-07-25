import { useEmpresa } from './useEmpresa'

export const useUsuario = (id?: number) => {
  const useUsuarioEmpresa = useBaseStore(`/gerencial/usuario/${id}/empresa`)
  async function getUsuarioEmpresa() {
    const response = await useUsuarioEmpresa.getAll()
    return {
      primary: response,
      foreign: response.map((item: any) => item.cd_empresa)
    }
  }
  async function getEmpresas() {
    return getFieldList(await useEmpresa().getAll(), 'cd_empresa', 'ds_empresa')
  }
  async function getGrupo() {
    return (await useBaseStore('/gerencial/usuario').get(useAuthStore().user.id, 'cd_grupo')).cd_grupo
  }
  return {
    getGrupo,
    useUsuarioEmpresa,
    getUsuarioEmpresa,
    getEmpresas,
    ...useBaseStore('/gerencial/usuario')
  }
}
