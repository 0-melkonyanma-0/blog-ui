<script>
import {useAuthStore} from "../stores/AuthStore.js";

export default {
  props: {
    drawer: {
      required: true,
      default: false
    }
  },
  data: () => ({
    auth: useAuthStore(),
    menus: [
      {
        title: 'profile.title',
        icon: 'mdi-cog-outline',
      },
      {
        title: 'profile.profile',
        icon: 'mdi-account'
      },
      {
        title: 'profile.logout',
        icon: 'mdi-logout',
      },
    ]
  }),
  methods: {
    setDrawer(drawer) {
      this.$emit('set-drawer', drawer)
    }
  }
}
</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon variant="text" @click="setDrawer(!drawer)">
    </v-app-bar-nav-icon>
    <v-toolbar-title class="v-col-3">
      <span @click="$router.push({name: 'posts.index'})">
        {{ $t('app-title') }}
      </span>
    </v-toolbar-title>

    <v-container>
      <v-row>
        <v-col>
        </v-col>
        <v-col cols="2" align-self="center">
          <v-row justify="center" class="pa-0">
            <v-menu v-if="auth.access_token && auth.user">
              <template v-slot:activator="{ props }">
                <v-btn
                    color="primary"
                    v-bind="props"
                    variant="outlined"
                    icon
                >
                  <v-icon>
                    mdi-account-outline
                  </v-icon>
                </v-btn>
              </template>
              <v-list class="mt-4">
                <v-list-item
                    v-for="(item, index) in menus"
                    :key="index"
                    :value="index"
                    :prepend-icon="item.icon"
                    @click="item.func"
                >
                  <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn v-else :to="{name: 'auth.login'}" variant="outlined" color="primary">
              {{ $t('auth.enter') }}
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<style scoped>

</style>
