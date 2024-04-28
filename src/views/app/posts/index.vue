<template>
  <v-container class="mx-auto d-flex align-center justify-center">
    <v-card variant="flat" color="#B39CD0">
      <v-responsive max-width="1500">
        <v-card-text>
          <v-row v-if="posts" v-for="(postRow, index) in posts" :key="`post-row-${index}`" justify="center">
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
                  :disabled="loading"
              >
                <v-card-text style="min-height: 125px; max-height: 150px; max-width: 400px" v-if="loading">
                  <v-row justify="center">
                    <v-col align-self="center" align="center">
                      <v-progress-circular class="mt-8" v-model="loading" indeterminate></v-progress-circular>
                    </v-col>
                  </v-row>
                </v-card-text>
                <post-body v-else :post="post">
                </post-body>
              </v-card>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-row justify="center">
              <v-col align-self="center" align="center">
                <v-progress-circular class="mt-8" v-model="loading" indeterminate></v-progress-circular>
              </v-col>
            </v-row>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-pagination
                :disabled="loading"
                v-model="current_page"
                :length="total"
                :total-visible="5"
                @click="getAllPosts(current_page)"
            >
            </v-pagination>
          </v-container>
        </v-card-actions>
      </v-responsive>
    </v-card>
  </v-container>
</template>

<script>
import {API_PATH} from "../../../plugins/consts.js";
import axios from "axios";
import {chunk} from "lodash/array.js";
import PostBody from "../../../components/PostBody.vue";

export default {
  components: {PostBody},
  data: () => ({
    posts: null,
    total: null,
    loading: true,
    current_page: 1,
  }),
  methods: {
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
