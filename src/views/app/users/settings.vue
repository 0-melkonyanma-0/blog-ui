<script>
import Cookies from "js-cookie";
import {API_PATH} from "../../../plugins/consts.js";
import axios from "axios";
import {useToast} from "vue-toastification";
import {useAuthStore} from "../../../stores/AuthStore.js";

const toast = useToast()

export default {
  data: () => ({
    user: null,
    loading: false
  }),
  created() {
    this.user = JSON.parse(Cookies.get('current_user'))
  },
  methods: {
    async updateUser() {
      this.loading = true
      await axios.patch(`${API_PATH}/users/${this.user.username}`, this.user)
          .then(() => {
            this.loading = false
            toast.success(this.$t('updated'))
            this.user.password = ''
            this.user.password_confirmation = ''
          })
          .catch((err) => {
            this.loading = false
            toast.error(err.response.data.message)
          })
      await useAuthStore().getCurrentUser()
    }
  }
}
</script>

<template>
  <v-container class="d-flex justify-center align-center">
    <v-form @submit.prevent="updateUser">
      <v-col xs="12" md="10" lg="6" xl="3 " xxl="3">
        <v-card width="500">
          <v-card-title>
          <span class="d-flex justify-center pa-4">
              {{ $t('user.update') }}
          </span>
          </v-card-title>
          <v-card-text>
            <v-text-field
                class="mb-2"
                :label="$t('auth.fields.name')"
                v-model="user.name" variant="outlined"
                density="compact"
            >
            </v-text-field>
            <v-text-field
                class="mb-2"
                :label="$t('auth.fields.email')"
                type="email"
                v-model="user.email" variant="outlined"
                density="compact"
            >
            </v-text-field>
            <v-text-field
                class="mb-2"
                :label="$t('auth.fields.password')"
                type="password"
                v-model="user.password" variant="outlined"
                density="compact"
            >
            </v-text-field>
            <v-text-field
                class="mb-2"
                :label="$t('auth.fields.password_confirmation')"
                type="password"
                v-model="user.password_confirmation"
                variant="outlined"
                density="compact"
            >
            </v-text-field>
          </v-card-text>
          <v-card-actions class="mx-3">
            <v-btn :loading="loading" type="submit" color="primary" variant="outlined">
              {{ $t('update') }}
            </v-btn>
            <v-btn :to="{name: 'users.show', params: {username: user.username}}" variant="outlined">
              {{ $t('close') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-form>
  </v-container>
</template>

<style scoped>

</style>
