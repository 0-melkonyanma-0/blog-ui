<template>
  <v-container v-if="user.name !== ''" class="mx-auto d-flex align-center justify-center">
    <v-responsive max-width="600">
      <v-card max-height="200" style="border: solid 1px gray">
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-img
                  height="150"
                  :src="`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${this.user.username}`"
              >
              </v-img>
            </v-col>
            <v-col class="ml-10">
              <v-row class="mt-4" style="font-size: 20px">
                <v-col class="pa-0">
                  {{ user.name }}
                </v-col>
                <v-col class="pa-0 ml-10" v-if="user.username !== useAuthStore().user.username">
                  <v-btn color="green" icon @click="subscribe">
                    <v-icon>
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row class="mt-4" style="font-size: 14px">
                <v-chip style="color: #839D2D">@{{ user.username }}</v-chip>
              </v-row>
              <v-row class="mt-4" style="font-size: 14px">
                <span class="mr-4 mt-2">Email:</span>
                <v-chip color="red">{{ user.email }}</v-chip>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-responsive>
  </v-container>
  <v-container class="mx-auto d-flex align-center justify-center">
    <v-card variant="flat" color="#845EC2">
      <v-responsive max-width="1500">
        <v-card-text>
          <v-row
              v-if="posts.length > 0"
              v-for="(postRow, index) in posts"
              :key="`post-row-${index}`"
              justify="center"
          >
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
                  style="border: solid 2px #B39CD0; border-radius: 8px"
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
          <v-row v-else-if="loading">
            <v-row justify="center">
              <v-col align-self="center" align="center">
                <v-progress-circular class="mt-8" v-model="loading" indeterminate></v-progress-circular>
              </v-col>
            </v-row>
          </v-row>
          <v-row v-else>
            <v-row class="mt-8" justify="center">
              <v-col align-self="center" align="center">
                {{ $t('post.here_no_posts') }}
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
                @click="getUserPosts(current_page)"
            >
            </v-pagination>
          </v-container>
        </v-card-actions>
      </v-responsive>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import {API_PATH} from "../../../plugins/consts.js";
import PostBody from "../../../components/PostBody.vue";
import {chunk} from "lodash/array.js";
import {useAuthStore} from "../../../stores/AuthStore.js";

export default {
  data: () => ({
    posts: [],
    user: {
      name: '',
      username: '',
      email: '',
    },
    total: null,
    loading: true,
    current_page: 1,
  }),
  components: {PostBody},
  methods: {
    useAuthStore,
    async getUser() {
      this.loading = true
      const {data} = await axios.get(`${API_PATH}/users/${this.$route.params.username}`)
      this.user = data.data
      this.loading = false
    },
    async getUserPosts(page) {
      this.loading = true
      const {data} = await axios.get(`${API_PATH}/users/${this.$route.params.username}/posts?page=${page}&amount=21`)
      this.loading = false
      this.posts = chunk(data.data, 3)
      this.current_page = data.current_page
      this.total = data.last_page
    },
    async subscribe() {
      await axios.post(`${API_PATH}/users/${this.$route.params.username}/follow `)
    }
  },
  created() {
    this.getUser()
    this.getUserPosts(1)
  }
}
</script>

<style lang="scss" scoped>

</style>