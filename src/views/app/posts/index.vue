<template>
  <v-container class="mx-auto d-flex align-center justify-center">
    <v-card variant="flat" class="posts-background__color">
      <v-card-title>
        <v-row justify="center">
          <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              class="mt-10 mx-10"
              bg-color="white"
              clearable
              @keyup.enter="getAllPosts(current_page)"
          >
          </v-text-field>
        </v-row>
      </v-card-title>
      <v-responsive min-width="900" max-width="1500">
        <v-card-text>
          <v-row v-if="posts.length" v-for="(postRow, index) in posts" :key="`post-row-${index}`" justify="center">
            <v-col
                :xs="12"
                :lg="postRow.length === 2 ? 6 : 3"
                :md="postRow.length === 2 ? 4 : 3"
                :xl="postRow.length === 2 ? 3 : 3"
                :xxl="postRow.length === 2 ? 4 : 3"
                v-for="(post, index) in postRow"
                :key="`post-row-id-${index / Math.random()}`"
            >
              <v-card
                  min-width="150"
                  style="border: solid 2px #B39CD0; border-radius: 8px"
                  :disabled="loading"
              >
                <v-skeleton-loader
                    v-if="loading"
                    :loading="loading"
                    class="mx-auto"
                    elevation="2"
                    width="300"
                    max-width="350"
                    height="150"
                    type="article"
                    boilerplate
                ></v-skeleton-loader>
                <post-body v-else :post="post">
                </post-body>
              </v-card>
            </v-col>
          </v-row>
          <v-row v-else-if="loading">
            <v-row justify="center">
              <v-col align-self="center" align="center">
                <v-progress-circular class="mt-8" v-model="loading" indeterminate></v-progress-circular>
              </v-col>
            </v-row>
          </v-row>
          <v-row v-else>
            <v-row justify="center" class="mt-10 px-10">
              <v-col align-self="center" align="center">
                {{ $t('post.no_content_on_web_site') }}
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
    posts: [],
    total: null,
    loading: true,
    current_page: 1,
    search: ''
  }),
  methods: {
    async getAllPosts(page) {
      this.loading = true
      const {data} = await axios.get(`${API_PATH}/posts?page=${page}&amount=21&search=${this.search}`)
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
.posts-background__color {
  background: rgba(206, 214, 237, 0.6);
  backdrop-filter: blur(14.5px);
  -webkit-backdrop-filter: blur(14.5px);
  border-radius: 10px;
}
</style>
