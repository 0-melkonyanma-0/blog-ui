<template>
  <v-layout>
    <nav-bar
        @set-drawer="setDrawerVal"
        :drawer="drawer"
    >
    </nav-bar>
    <v-navigation-drawer v-model="drawer">
      <v-list>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <div class="ma-4 mt-4">
        <router-view></router-view>
      </div>
    </v-main>
  </v-layout>
</template>
<script>
import NavBar from "./NavBar.vue";

export default  {
  components: {
    NavBar
  },
  data: () => ({
    drawer: false,
  }),
  methods: {
    setDrawerVal(val) {
      this.drawer = val
    }
  }
}
</script>
