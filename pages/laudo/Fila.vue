<script lang="ts" setup>
import { LaudoFila, ModalCheckbox } from '#components'
import { useFila } from '~/composables/laudo/useFila'
import { useEmpresa } from '~/composables/gerencial/useEmpresa'
import { useSala } from '~/composables/gerencial/useSala'
import { useModalidade } from '~/composables/gerencial/useModalidade'
import { useProcedimentoGrupo } from '~/composables/gerencial/useProcedimentoGrupo'
import { useProcedimento } from '~/composables/gerencial/useProcedimento'
import { useConvenio } from '~/composables/faturamento/useConvenio'
import { usePlano } from '~/composables/faturamento/usePlano'

import { Icones } from '~/types/system'

const title = 'Fila de Trabalho'
const apiPage = ref(null)
const controller = useFila()
const showModal = ref(false)
const id = ref(0)
const modal = useModal()
const showMedico = ref(false)
const actionMenu = [
  {
    name: 'acMedico',
    title: 'Associar Médico',
    icon: Icones.medico,
    action: () => associarMedico(apiPage.value.selectedId())
  },
  {
    name: 'acEmpresa',
    title: 'Associar Empresa',
    icon: Icones.empresa,
    action: () => {
      associarEmpresa(apiPage.value.selectedId())
    }
  },
  {
    name: 'acSala',
    title: 'Associar Sala',
    icon: Icones.sala,
    action: () => {
      associarSala(apiPage.value.selectedId())
    }
  },
  {
    name: 'acModalidade',
    title: 'Associar Modalidade',
    icon: Icones.modalidade,
    action: () => {
      associarModalidade(apiPage.value.selectedId())
    }
  },
  {
    name: 'acGrupo',
    title: 'Associar Grupo',
    icon: Icones.grupo,
    action: () => {
      associarGrupo(apiPage.value.selectedId())
    }
  },
  {
    name: 'acProcedimento',
    title: 'Associar Procedimento',
    icon: Icones.procedimento,
    action: () => {
      associarProcedimento(apiPage.value.selectedId())
    }
  },
  {
    name: 'acConvenio',
    title: 'Associar Convênio',
    icon: Icones.convenio,
    action: () => {
      associarConvenio(apiPage.value.selectedId())
    }
  },
  {
    name: 'acPlano',
    title: 'Associar Plano',
    icon: Icones.plano,
    action: () => {
      associarPlano(apiPage.value.selectedId())
    }
  }
]
const openForm = (codigo?: number) => {
  showModal.value = true
  id.value = Number(codigo)
}

const onSubmit = (data: any) => {
  showModal.value = false
  apiPage.value.applyTransaction(id.value ? { update: [data] } : { add: [data] })
}

const associarMedico = (fila: number) => {
  showMedico.value = true
  id.value = fila
}
const associarEmpresa = async (codigo?: number) => {
  const [options, master, value] = await Promise.all([
    useEmpresa().getItemList(),
    useFila().getName(codigo),
    useFila().getAssociacao(codigo, 'ds_empresa')
  ])
  modal.open(ModalCheckbox, {
    title: 'Associar Empresa',
    options,
    master,
    value,
    async onSubmit(data) {
      await useFila().setAssociacao(codigo, 'ds_empresa', data.field.join(','))
      modal.close()
    },
    onClose() {
      modal.close()
    }
  })
}
const associarSala = async (codigo?: number) => {
  const [options, master, value] = await Promise.all([
    useSala().getItemList(),
    useFila().getName(codigo),
    useFila().getAssociacao(codigo, 'ds_sala')
  ])
  modal.open(ModalCheckbox, {
    title: 'Associar Sala',
    options,
    master,
    value,
    async onSubmit(data) {
      await useFila().setAssociacao(codigo, 'ds_sala', data.field.join(','))
      modal.close()
    },
    onClose() {
      modal.close()
    }
  })
}

const associarModalidade = async (codigo?: number) => {
  const [options, master, value] = await Promise.all([
    useModalidade().getItemList(),
    useFila().getName(codigo),
    useFila().getAssociacao(codigo, 'ds_modalidade')
  ])
  modal.open(ModalCheckbox, {
    title: 'Associar Modalidade',
    options,
    master,
    value,
    async onSubmit(data) {
      await useFila().setAssociacao(codigo, 'ds_modalidade', data.field.join(','))
      modal.close()
    },
    onClose() {
      modal.close()
    }
  })
}

const associarGrupo = async (codigo?: number) => {
  const [options, master, value] = await Promise.all([
    useProcedimentoGrupo().getItemList(),
    useFila().getName(codigo),
    useFila().getAssociacao(codigo, 'ds_grupo')
  ])
  modal.open(ModalCheckbox, {
    title: 'Associar Grupo',
    options,
    master,
    value,
    async onSubmit(data) {
      await useFila().setAssociacao(codigo, 'ds_grupo', data.field.join(','))
      modal.close()
    },
    onClose() {
      modal.close()
    }
  })
}

const associarProcedimento = async (codigo?: number) => {
  const [options, master, value] = await Promise.all([
    useProcedimento().getItemList(),
    useFila().getName(codigo),
    useFila().getAssociacao(codigo, 'ds_procedimento')
  ])
  modal.open(ModalCheckbox, {
    title: 'Associar Procedimento',
    options,
    master,
    value,
    async onSubmit(data) {
      await useFila().setAssociacao(codigo, 'ds_procedimento', data.field.join(','))
      modal.close()
    },
    onClose() {
      modal.close()
    }
  })
}

const associarConvenio = async (codigo?: number) => {
  const [options, master, value] = await Promise.all([
    useConvenio().getItemList(),
    useFila().getName(codigo),
    useFila().getAssociacao(codigo, 'ds_fornecedor')
  ])
  modal.open(ModalCheckbox, {
    title: 'Associar Convênio',
    options,
    master,
    value,
    async onSubmit(data) {
      await useFila().setAssociacao(codigo, 'ds_fornecedor', data.field.join(','))
      modal.close()
    },
    onClose() {
      modal.close()
    }
  })
}

const associarPlano = async (codigo?: number) => {
  const [options, master, value] = await Promise.all([
    usePlano().getItemList(),
    useFila().getName(codigo),
    useFila().getAssociacao(codigo, 'ds_plano')
  ])
  modal.open(ModalCheckbox, {
    title: 'Associar Plano',
    options,
    master,
    value,
    async onSubmit(data) {
      await useFila().setAssociacao(codigo, 'ds_plano', data.field.join(','))
      modal.close()
    },
    onClose() {
      modal.close()
    }
  })
}
</script>

<template>
  <div>
    <BasePage
      ref="apiPage"
      :header="{ title, icon: Icones.fila }"
      :controller
      :action-menu
      @open-form="openForm"
    >
      <template #form>
        <LaudoFila
          :id
          v-model="showModal"
          :title
          @submit="onSubmit"
          @close="showModal = false"
        />
      </template>
    </BasePage>
    <LaudoFilaMedico
      v-if="showMedico"
      :id
      v-model="showMedico"
      @close="showMedico=false"
    />
  </div>
</template>
