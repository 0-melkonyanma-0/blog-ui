<script>
import Form from "vform";
import {API_PATH} from "../../plugins/consts.js";

export default {
  data: function () {
    return {
      user: new Form({
        email: '',
        name: '',
        username: '',
        password: '',
        password_confirmation: ''
      })
    }
  },
  methods: {
    register() {
      this.user.post(`${API_PATH}/auth/register`)
    }
  }
}
</script>

<template>
  <div>
    <v-form @submit.prevent="register">
      <v-card width="500">
        <v-card-title>
          <span class="d-flex justify-center pa-4">
              {{ $t('auth.register') }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-text-field
              class="mb-2"
              :label="$t('auth.fields.name')"
              v-model="user.name" variant="outlined"
              density="compact"
              :error-messages="user.errors.get('name')"
          >
          </v-text-field>
          <v-text-field
              class="mb-2"
              :label="$t('auth.fields.username')"
              v-model="user.username" variant="outlined"
              density="compact"
              :error-messages="user.errors.get('username')"
          >
          </v-text-field>
          <v-text-field
              class="mb-2"
              :label="$t('auth.fields.email')"
              type="email"
              v-model="user.email" variant="outlined"
              density="compact"
              :error-messages="user.errors.get('email')"
          >
          </v-text-field>
          <v-text-field
              class="mb-2"
              :label="$t('auth.fields.password')"
              type="password"
              v-model="user.password" variant="outlined"
              density="compact"
              :error-messages="user.errors.get('password')"
          >
          </v-text-field>
          <v-text-field
              class="mb-2"
              :label="$t('auth.fields.password_confirmation')"
              type="password"
              v-model="user.password_confirmation"
              variant="outlined"
              density="compact"
              :error-messages="user.errors.get('password_confirmation')"
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions class="mx-3">
          <v-btn type="submit" color="primary" variant="outlined">
            {{ $t('auth.register') }}
          </v-btn>
          <v-btn :to="{name: 'auth.login'}" variant="outlined">
            {{ $t('auth.login') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<style scoped>

</style>
