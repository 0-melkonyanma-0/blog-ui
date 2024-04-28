<template>
  <v-layout>
    <nav-bar
        @set-drawer="setDrawerVal"
        :drawer="drawer"
    >
    </nav-bar>
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item
            prepend-icon="mdi-post"
            @click="$router.push({name: 'posts.index'})"
        >
          {{ $t('menu.posts') }}
        </v-list-item>

        <v-list-group v-if="categories.length > 0">
          <template v-slot:activator="{ props }">
            <v-list-item
                v-bind="props"
                prepend-icon="mdi-shape"
            >
              {{ $t('menu.categories') }}
            </v-list-item>
          </template>
          <v-list-item
              v-for="(category, index) in categories"
              :title="category.title"
              :key="`category-${index}`"
          >
          </v-list-item>
        </v-list-group>
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
import axios from "axios";
import {API_PATH} from "../plugins/consts.js";

export default {
  components: {
    NavBar
  },
  data: () => ({
    drawer: false,
    categories: [],
  }),
  created() {
    this.getCategories()
  },
  methods: {
    setDrawerVal(val) {
      this.drawer = val
    },
    async getCategories() {
      const {data} = await axios.get(`${API_PATH}/categories`)
      this.categories = data.data
    }
  }
}
</script>
