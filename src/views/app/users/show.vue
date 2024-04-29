<template>
  <v-container v-if="user.name !== ''" class="mx-auto d-flex align-center justify-center">
    <v-responsive max-width="600">
      <v-card class="profile__color" max-height="250" style="border: solid 1px gray">
        <v-card-text>
          <v-row>
            <v-col cols="3">
              <v-img
                  height="150"
                  :src="`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${this.user.username}`"
              >
              </v-img>
            </v-col>
            <v-col class="ml-10">
              <v-row class="mt-4" style="font-size: 20px">
                <v-col style="color: white" class="pa-0">
                  {{ user.name }}
                </v-col>
                <v-col class="pa-0 ml-10" v-if="
                    user.username !== useAuthStore().user.username
                    && !Array.from(followers.followers).includes(useAuthStore().user.username)
                "
                >
                  <v-btn :loading="sub_load" color="green" @click="subscribe">
                    {{ $t('user.subscribe') }}
                  </v-btn>
                </v-col>
                <v-col class="pa-0 ml-10" v-if="
                    user.username !== useAuthStore().user.username &&
                    Array.from(followers.followers).includes(useAuthStore().user.username)
                  "
                >
                  <v-btn :loading="sub_load" color="red" @click="unSubscribe">
                    {{ $t('user.un-subscribe') }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-row class="mt-4" style="font-size: 14px">
                <v-chip style="color: #52cb5c">@{{ user.username }}</v-chip>
              </v-row>
              <v-row class="mt-4" style="font-size: 14px">
                <span class="mr-1 mt-2" style="color: white">Email:</span>
                <v-chip color="#B3B15B">{{ user.email }}</v-chip>
              </v-row>
              <v-row justify="start" class="my-6">
                <span style="color: white">{{ $t('user.amount_of_follower', {subs: followers.count}) }}</span>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-responsive>
  </v-container>
  <v-row class="my-4" justify="center">
    <div class="tabs__color">
      <v-tabs v-model="tab" hide-slider selected-class="tabs-selected__color">
        <v-tab :disabled="loading" @click="getUserPosts(1)">
          {{ $t('post.all_posts') }}
        </v-tab>
        <v-tab :disabled="loading" @click="getArchivedUserPosts(1)"
               v-if="useAuthStore().user.username === $route.params.username">
          {{ $t('post.archived_posts') }}
        </v-tab>
      </v-tabs>
    </div>
    <v-btn v-if="useAuthStore().user.username === $route.params.username" class="ml-4" color="green"
           @click="$router.push({name: 'posts.create' })">
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
  </v-row>
  <v-window>
    <v-window-item>
      <v-container class="mx-auto d-flex align-center justify-center">
        <v-card variant="flat" class="posts-background__color">
          <v-responsive min-width="900" max-width="1500">
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
                    @keyup.enter="tab === 0 ? getUserPosts(current_page) : getArchivedUserPosts(current_page)"
                >
                </v-text-field>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-row
                  v-if="posts.length > 0"
                  v-for="(postRow, index) in posts"
                  :key="`post-row-${index}`"
                  justify="center"
              >
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
    </v-window-item>
  </v-window>
</template>

<script>
import axios from "axios";
import {API_PATH} from "../../../plugins/consts.js";
import PostBody from "../../../components/PostBody.vue";
import {chunk} from "lodash/array.js";
import {useAuthStore} from "../../../stores/AuthStore.js";
import {useAuthorsStore} from "../../../stores/AuthorStore.js";

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
    followers: 0,
    sub_load: false,
    tab: 0,
    search: ''
  }),
  components: {PostBody},
  methods: {
    useAuthorsStore,
    useAuthStore,
    async getUser() {
      this.loading = true
      const {data} = await axios.get(`${API_PATH}/users/${this.$route.params.username}`)
      this.user = data.data
      this.loading = false
    },
    async getUserPosts(page) {
      this.loading = true
      const {data} = await axios.get(`${API_PATH}/users/${this.$route.params.username}/posts?page=${page}&amount=21&search=${this.search}`)
      this.loading = false
      this.posts = chunk(data.data, 3)
      this.current_page = data.current_page
      this.total = data.last_page
    },
    async getArchivedUserPosts(page) {
      this.loading = true
      const {data} = await axios.get(`${API_PATH}/archived/posts?page=${page}&amount=21&search=${this.search}`)
      this.loading = false
      this.posts = chunk(data.data, 3)
      this.current_page = data.current_page
      this.total = data.last_page
    },
    async subscribe() {
      this.sub_load = true
      await axios.post(`${API_PATH}/users/${this.$route.params.username}/follow`)
          .then(() => {
            this.sub_load = false
          }).catch(() => {
            this.sub_load = false
          })
      await this.getFollowers()
    },
    async unSubscribe() {
      this.sub_load = true
      await axios.post(`${API_PATH}/users/${this.$route.params.username}/un-follow`)
          .then(() => {
            this.sub_load = false
          }).catch(() => {
            this.sub_load = false
          })
      await this.getFollowers()
    },
    async getFollowers() {
      await axios.get(`${API_PATH}/users/${this.$route.params.username}/followers`)
          .then(({data}) => {
            this.followers = data.data
          })
    },
  },
  created() {
    this.getUser()
    this.getUserPosts(1)
    this.getFollowers()
  }
}
</script>

<style scoped>
.profile__color {
  background: rgba(90, 114, 134, 0.85);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
}

.posts-background__color {
  background: rgba(206, 214, 237, 0.6);
  backdrop-filter: blur(14.5px);
  -webkit-backdrop-filter: blur(14.5px);
  border-radius: 10px;
}

.tabs__color {
  background-color: white;
  border-radius: 8px;
}

.tabs-selected__color {
  background-color: #989898;
  border-radius: 8px !important;
}
</style>
