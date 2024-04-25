<script setup>

</script>

<template>
  <v-layout>
    <v-app>
      <v-main>
        <v-container class="fill-height" fluid>
          <v-col align-self="center">
            <v-row justify="center">
              <router-view></router-view>
            </v-row>
          </v-col>
        </v-container>
      </v-main>
    </v-app>
  </v-layout>
</template>

<style scoped>

</style>
