<template>
  <v-layout>
    <nav-bar
        @set-drawer="setDrawerVal"
        :drawer="drawer"
    >
    </nav-bar>
    <v-navigation-drawer width="300" v-model="drawer">
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

        <v-list-group v-if="usePostStore().authors.length > 0">
          <template v-slot:activator="{ props }">
            <v-list-item
                v-bind="props"
                prepend-icon="mdi-account-multiple"
            >
              {{ $t('menu.authors') }}
            </v-list-item>
          </template>
          <v-list-item
              v-for="(author, index) in usePostStore().authors"
              :key="`category-${index}`"
              @click="$router.push({name: 'users.show', params: {username: author.username}})"
          >
            <template #title>
              <v-row class="my-1">
                <v-col align-self="center" align="center" cols="4">
                  <v-img
                      height="50"
                      :src="`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${author.username}`"
                  >
                  </v-img>
                </v-col>
                <v-col align-self="center" align="center" cols="7" style="overflow: hidden; text-overflow: ellipsis;">
                  {{ author.username }}
                </v-col>
              </v-row>
            </template>
          </v-list-item>
        </v-list-group>
      </v-list>


    </v-navigation-drawer>

    <v-main>
      <div class="ma-4 mt-4">
        <router-view :key="$route.fullPath"></router-view>
      </div>
    </v-main>
  </v-layout>
</template>
<script>
import NavBar from "./NavBar.vue";
import axios from "axios";
import {API_PATH} from "../plugins/consts.js";
import {useAuthorsStore} from "../stores/AuthorStore.js";

export default {
  components: {
    NavBar
  },
  data: () => ({
    drawer: false,
    categories: [],
  }),
  created() {
    useAuthorsStore().getAuthors()
    this.getCategories()
  },
  methods: {
    usePostStore: useAuthorsStore,
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
