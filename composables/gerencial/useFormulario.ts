export const useFormulario = () => {
  const findOperacao = async (cd_form: number) => {
    return getFieldList(await useBaseStore('/gerencial/formulario').find('auxiliar', { cd_form }), 'cd_form', 'ds_caption')
  }
  // const findCrud = async (cd_form: number) => {
  //   const response = await useBaseStore('/gerencial/formulario').find('cadastro', { cd_form })
  //   return response.map(item => item.cd_operacao)
  // }
  const getCadastro = async (cd_form: number, cd_grupo: number) => {
    const response = await useBaseStore('/gerencial/formulario').find('cadastro', { cd_form, cd_grupo })
    return response.map(item => item.cd_operacao)
  }
  const setCadastro = async (cd_form: number, cd_grupo: number, cd_operacao: string) => {
    const response = await useBaseStore('/gerencial/formulario').exec('cadastro', { cd_form, cd_grupo, cd_operacao })
    return response.map(item => item.cd_operacao)
  }
  const getOperacao = async (cd_form: number, cd_grupo: number) => {
    console.log('getOperacao', cd_form, cd_grupo)
    const response = await useBaseStore('/gerencial/formulario').find('operacao', { cd_form, cd_grupo })
    return response.map(item => item.cd_form)
  }
  const setOperacao = async (cd_form: number, cd_grupo: number, cd_operacao: string) => {
    const response = await useBaseStore('/gerencial/formulario').exec('operacao', { cd_form, cd_grupo, cd_operacao })
    return response.map(item => item.cd_form)
  }
  return {
    findOperacao,
    getCadastro,
    setCadastro,
    getOperacao,
    setOperacao,
    ...useBaseStore('/gerencial/formulario')
  }
}
