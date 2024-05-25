export interface Setup {
  nr_clinux: string
  nr_banco: number
  cd_convenio_particular: Nullable<number>
  cd_empresa: number
  cd_empresa_matriz: Nullable<number>
  sn_dicomvix_filme: boolean
  sn_dicomvix_dicom: boolean
  sn_dicomvix_wado: boolean
  sn_dicomvix_laudo: boolean
  sn_dicomvix_edit: boolean
  sn_dicomvix_scan: boolean
  ds_dicomvix_filme: string
  ds_dicomvix_dicom: string
  ds_dicomvix_windir: Nullable<string>
  ds_dicomvix_weasis: string
  ds_dicomvix_osirix: string
  ds_dicomvix_fluxo: Nullable<string>
  ds_dicomvix_fonte: string
  ds_dicomvix_tema: string
  ds_dicomvix_title: string
  sn_dicomvix_consultorio: boolean
  sn_dicomvix_repasse: boolean
  sn_laudo_grupo: boolean
  sn_laudo_revisao: boolean
  ds_zenvia_user: Nullable<string>
  ds_rcx_user: string
  nr_agenda_scanner: number
  sn_agenda_documento: boolean
  sn_agenda_agendamento: boolean
  sn_agenda_resultado: boolean
  sn_agenda_empresa: boolean
  sn_agenda_particular: boolean
  sn_agenda_imagem: boolean
  sn_agenda_dicom: boolean
  sn_agenda_laudo: boolean
  sn_agenda_fiscal: boolean
  sn_agenda_passo: boolean
  ds_dicomvix_alert: Nullable<string>
  sn_agenda_consultorio: boolean
  ds_dicomvix_ohif: Nullable<string>
  ds_dicomvix_dwserver: string
  sn_portal_anamnese: boolean
  sn_dicomvix_laudite: boolean
  ds_dicomvix_viewer: string
  ds_dicomvix_whatsapp: string
  ds_dicomvix_gtm: Nullable<string>
  sn_dicomvix_ohif: boolean
  sn_dicomvix_video: boolean
  sn_dicomvix_mobile: boolean
}
export enum ModuleType {
  DICOMVIX = 'dicomvix',
  CLINUX = 'clinux',
  OTRS = 'otrs'
}
export interface Client {
  cd_empresa: number
  ds_empresa: string
  ds_portal_id: string
  ds_portal_url: string
}
export interface MainMenu {
  cd_form: number
  ds_form: string
  ds_caption: string
  sn_modal: boolean
  sn_free: boolean
  nr_menu: number
  ds_rota: string | null
  cd_modulo: number
  ds_modulo: string
  sn_ativo: boolean
}
export type Nullable<T> = T | null
export type ID<T = string> = {
  id: T
}
export interface Alert extends ID<number> {
  description: string
  icon: string
  type: 'danger' | 'warning' | 'success' | 'info'
  seem: boolean
  urls?: string
  timeout?: number
}
export const useSystem = () => {
  const name = <ModuleType>ModuleType.DICOMVIX
  const client = ref<Client>()
  const setup = ref<Setup>()
  const menu = ref<MainMenu[]>([])
  const route = useRoute()
  const icon = ref(null)
  const logo = ref(null)

  const getAll = async () => {
    await useAsyncData('system', async () => {
      const [_setup, _logo, _icon] = await Promise.all([
        useNuxtApp().$api('/setup/data'),
        useNuxtApp().$api('/setup/logo'),
        useNuxtApp().$api('/setup/icon')
      ])
      setup.value = _setup[0]
      logo.value = _logo
      icon.value = _icon
      return { _setup, _logo, _icon }
    })
  }

  const loadLogo = async () => {
    try {
      // const { data: response } = await useAPI('/setup/logo')
      const response = await useNuxtApp().$api('/setup/logo')
      logo.value = response
    } catch (error) {
      console.log('error', error)
    }
  }
  const loadSetup = async () => {
    const { data } = await useAPI('/setup/data', { method: 'GET', default: () => null })
    setup.value = data.value[0]
  }

  const loadMenu = async () => {
    const { data } = await useAPI('/setup/menu', { method: 'GET', default: () => null })
    menu.value = data.value
  }

  const loadClient = async () => {
    if (!route.query.id || route.query.id === 'localhost') {
      client.value = {
        cd_empresa: 1,
        ds_empresa: 'Genesis',
        ds_portal_url: 'http://localhost:8082',
        ds_portal_id: 'localhost'
      }
    } else {
      try {
        const { data } = await useFetch('https://lumen.clinux.com.br/chamados/cgi-bin/dwserver.cgi/se1/dotListaCgi?id=' + route.query.id)
        client.value = data.value[0]
      } catch (error) {
        console.log(error)
      }
    }
  }

  return {
    name,
    client,
    menu,
    setup,
    logo,
    icon,
    loadSetup,
    loadMenu,
    loadClient,
    loadLogo,
    getAll
  }
}
