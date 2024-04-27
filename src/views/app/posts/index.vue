<template>
  <v-card>
    <v-card-text v-if="loading">
      <v-container>
        <v-row justify="center">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-text v-else>
      <v-row v-for="(postRow, index) in posts" :key="`post-row-${index}`" justify="center">
        <v-col
            xs="12"
            lg="4"
            md="4"
            xl="4"
            xxl="4"
            v-for="(post, index) in postRow"
            :key="`post-row-id-${index / Math.random()}`"
        >
          <v-card
              style="border: solid 2px gray; border-radius: 8px"
              @click="$router.push({name: 'posts.show', params: {id: post.id}})"
          >
            <post-body :post="post">
            </post-body>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-pagination
            v-model="current_page"
            :length="total"
            :total-visible="5"
            @click="getAllPosts(current_page)"
        >
        </v-pagination>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import {useAuthStore} from "../../../stores/AuthStore.js";
import {API_PATH} from "../../../plugins/consts.js";
import axios from "axios";
import {chunk} from "lodash/array.js";
import PostBody from "../../../components/PostBody.vue";

export default {
  components: {PostBody},
  data: () => ({
    posts: null,
    total: null,
    loading: false,
    current_page: 1,
  }),
  methods: {
    logout() {
      const auth = useAuthStore()
      auth.logout()
    },
    async getAllPosts(page) {
      this.loading = true
      const {data} = await axios.get(`${API_PATH}/posts?page=${page}&amount=21`)
      this.loading = false
      this.posts = chunk(data.data, 3)
      this.current_page = data.current_page
      this.total = data.last_page
    }
  },
  created() {
    this.getAllPosts(1)
  }
}
</script>

<style>

</style>
