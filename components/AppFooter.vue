<script setup lang="ts">
const { setup } = useSystemStore()
</script>

<template>
  <UFooter>
    <!-- <template #top>
      <UFooterColumns>
        <template #right>
          <form @submit.prevent="onSubmit">
            <UFormGroup
              label="Subscribe to our newsletter"
              :ui="{ container: 'mt-3' }"
            >
              <UInput
                v-model="email"
                type="email"
                placeholder="Enter your email"
                :ui="{ icon: { trailing: { pointer: '' } } }"
                required
                size="xl"
                autocomplete="off"
                class="max-w-sm"
                input-class="rounded-full"
              >
                <template #trailing>
                  <UButton
                    type="submit"
                    size="xs"
                    color="primary"
                    :label="loading ? 'Subscribing' : 'Subscribe'"
                    :loading="loading"
                  />
                </template>
              </UInput>
            </UFormGroup>
          </form>
        </template>
      </UFooterColumns>
    </template> -->

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </template>

    <template #right>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Versão: Api {{ setup.nr_clinux }} Banco {{ setup.nr_banco }}
      </p>
      <UButton
        v-if="false"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="gray"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
