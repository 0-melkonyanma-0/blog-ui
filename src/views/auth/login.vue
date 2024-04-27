<script>
import Form from "vform";
import {useAuthStore} from "../../stores/AuthStore.js";

export default {
  data: function () {
    return {
      auth: useAuthStore(),
      user: new Form({
        email: '',
        password: '',
      })
    }
  },
  methods: {
    login() {
      this.auth.login(this.user)
    }
  }
}
</script>

<template>
  <div>
    <v-form @submit.prevent="login">
      <v-card width="500">
        <v-card-title>
          <span class="d-flex justify-center pa-4">
              {{ $t('auth.enter') }}
          </span>
        </v-card-title>
        <v-card-text>
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
        </v-card-text>
        <v-card-actions class="mx-3">
          <v-btn :loading="auth.loading" type="submit" color="green" variant="outlined">
            {{ $t('auth.login') }}
          </v-btn>
          <v-btn :to="{name: 'auth.register'}" variant="outlined">
            {{ $t('auth.register') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>
