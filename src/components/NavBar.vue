<script setup>
import {useAuthStore} from "../stores/AuthStore.js";


const auth = useAuthStore()
auth.getCurrentUser()

const props = defineProps([
  'drawer'
])

const emit = defineEmits([
  'set-drawer'
])

function setDrawer(drawer) {
  emit('set-drawer', drawer)
}
</script>

<template>
  <v-app-bar>
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-app-bar-nav-icon variant="text" @click="setDrawer(!props.drawer)">
      </v-app-bar-nav-icon>
      <v-responsive max-width="1500">
        <v-toolbar-title class="v-col-3">
            <span @click="$router.push({name: 'posts.index'})">
              {{ $t('app-title') }}
            </span>
        </v-toolbar-title>
      </v-responsive>
      <v-menu v-if="auth.access_token && auth.user">
        <template v-slot:activator="{ props }">
          <v-btn
              color="primary"
              v-bind="props"
              variant="outlined"
              class="mr-4"
          >
            <v-icon>
              mdi-account-outline
            </v-icon>
          </v-btn>
        </template>
        <v-list class="mt-4">
          <v-list-item
              @click="$router.push({name: 'users.edit', params: {username: auth.user.username}})"
              prepend-icon="mdi-cog-outline"
          >
            <v-list-item-title>
              {{ $t('profile.title') }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item
              @click="$router.push({name: 'users.show', params: {username: auth.user.username}})"
              prepend-icon="mdi-account">
            <v-list-item-title>
              {{ $t('profile.profile') }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="auth.logout" prepend-icon="mdi-logout">
            <v-list-item-title>
              {{ $t('profile.logout') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
          v-else
          :to="{name: 'auth.login'}"
          variant="outlined"
          color="primary"
      >
        {{ $t('auth.enter') }}
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
</style>
