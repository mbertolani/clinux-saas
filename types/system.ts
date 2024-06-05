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

export const mainMenu = [
  {
    label: 'Gerencial',
    children: [
      { label: 'Empresa', to: '/gerencial/empresa', icon: 'i-heroicons-building-office' },
      { label: 'Funcionário', to: '/gerencial/funcionario', icon: 'i-heroicons-identification' },
      { label: 'Médico', to: '/gerencial/medico', icon: 'i-heroicons-user-group' },
      { label: 'Procedimento', to: '/gerencial/procedimento', icon: 'i-heroicons-hashtag' },
      { label: 'Modelo', to: '/gerencial/modelo', icon: 'i-heroicons-inbox-newspaper' }
    ]
  },
  {
    label: 'Atendimento',
    children: [
      { label: 'Agendamento', to: '/login' },
      { label: 'Atendimento', to: '/login' },
      { label: 'Paciente', to: '/login' },
      { label: 'Médico', to: '/login' }
    ]
  },
  {
    label: 'Estoque',
    children: [
      { label: 'Estoque', to: '/login' },
      { label: 'Material', to: '/login' },
      { label: 'Unidade', to: '/login' },
      { label: 'Compras', to: '/login' }
    ]
  },
  {
    label: 'Faturamento',
    children: [
      { label: 'Faturamento', to: '/login' },
      { label: 'Plano', to: '/login' },
      { label: 'Guia', to: '/login' },
      { label: 'Tabela', to: '/login' }
    ]
  },
  {
    label: 'Financeiro',
    children: [
      { label: 'Lançamentos', to: '/login' },
      { label: 'Fornecedores', to: '/login' },
      { label: 'Bancos', to: '/login' },
      { label: 'Planos de Conta', to: '/login' }
    ]
  },
  {
    label: 'Relatórios',
    children: [
    ]
  },
  {
    label: 'Setup',
    to: '/tools',
    children: [
      { label: 'Editor', to: '/tools/editor' },
      { label: 'Grid', to: '/tools/grid' },
      { label: 'Data', to: '/tools/data' },
      { label: 'Form', to: '/tools/form' }
    ]
  }
]
