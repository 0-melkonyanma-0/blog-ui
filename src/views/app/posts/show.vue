<script>
import axios from "axios";
import {API_PATH} from "../../../plugins/consts.js";
import PostBody from "../../../components/PostBody.vue";
import Form from "vform";
import {EditorContent} from "@tiptap/vue-3";
import Editor from "../../../components/Editor.vue";
import {useAuthStore} from "../../../stores/AuthStore.js";
import {useToast} from "vue-toastification";

const toast = useToast()

export default {
  components: {Editor, EditorContent, PostBody},
  data: () => ({
    post: {
      title: '',
    },
    loading: false,
    comment: new Form({
      body: ''
    }),
  }),
  methods: {
    useAuthStore,
    async getPost() {
      this.loading = true
      const {data} = await axios.get(`${API_PATH}/posts/${this.$route.params.id}`)
      if (data.status === 204) {
        this.$router.push({name: 'posts.index'})
      }
      this.post = data.data
      this.loading = false
    },
    async sendComment() {
      this.loading = true
      await this.comment.post(`${API_PATH}/posts/${this.$route.params.id}/comments`)
          .then(() => {
            this.loading = false
          })
          .catch((err) => {
            this.loading = false
            toast.error(err.response.data.message)
          })
      this.comment.body = ''
      await this.getPost()
    },
    async deleteComment(id) {
      this.loading = true
      await this.comment.delete(`${API_PATH}/posts/comments/${id}`)
          .then(() => {
            this.loading = false
          })
          .catch((err) => {
            this.loading = false
            toast.error(err.response.data.message)
          })
      this.comment.body = ''
      await this.getPost()
    },
    async deletePost() {
      await axios.delete(`${API_PATH}/posts/${this.$route.params.id}`)
          .catch((err) => {
            toast.error(err.response.data.message)
          })
      this.$router.push({name: 'posts.index'})
    },
    async archivePost() {
      await axios.patch(`${API_PATH}/posts/${this.$route.params.id}/archive`)
      window.location.reload()
    },
    async unArchivePost() {
      await axios.patch(`${API_PATH}/posts/${this.$route.params.id}/un-archive`)
      window.location.reload()
    },
    setComment(comment) {
      this.comment.body = comment
    }
  },
  created() {
    this.getPost()
    axios.post(`${API_PATH}/posts/${this.$route.params.id}/view`)
  }
}
</script>

<template>
  <v-container class="mx-auto d-flex align-center justify-center">
    <v-col xs="12" md="12" lg="8" xl="7" xxl="6">
      <v-card style="border: solid 2px gray; border-radius: 8px">
        <v-row class="my-4 ml-4" v-if="post.author?.username === useAuthStore().user.username">
          <v-btn
              @click="archivePost"
              v-if="
              !post.archived_at
            "
              color="green"
          >
            <v-icon>
              mdi-archive
            </v-icon>
          </v-btn>
          <v-btn
              @click="unArchivePost"
              v-else-if="post.archived_at"
              color="green"
          >
            <v-icon>
              mdi-package-up
            </v-icon>
          </v-btn>
          <v-btn
              class="ml-4"
              color="red"
              @click="deletePost"
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
          <v-btn
              class="ml-4"
              color="primary"
              @click="$router.push({name: 'posts.edit', params: {id: post.id}})"
          >
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
        </v-row>
        <v-card-text v-if="loading">
          <v-row justify="center" class="pa-16">
            <v-progress-circular indeterminate>
            </v-progress-circular>
          </v-row>
        </v-card-text>
        <post-body v-else :post="post" :show="true"></post-body>
      </v-card>
      <v-card class="mt-4" style="border: solid 2px gray;border-radius: 8px">
        <v-card-text>
          <v-row class="pa-0">
            <v-col>
              <editor
                  class="mx-4 mt-4"
                  :active-buttons="['bold', 'italic', 'strike', 'underline']"
                  @update="setComment"
                  :initial-value="comment.body"
              />
            </v-col>
          </v-row>
          <v-row class="ml-4 mb-4">
            <v-btn :loading="loading" @click="sendComment" color="green" class="mt-4">
              {{ $t('post.send_comment') }}
            </v-btn>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card v-show="post.comments" variant="flat" class="mt-4">
        <v-card-text>
          <v-card
              style="border: solid 2px grey; border-radius: 8px"
              class="mb-4"
              v-for="(comment, index) in post.comments"
              :key="index"
          >
            <v-card-title class="mt-4 ml-2">
              <v-row>
                <v-col cols="8">
                  <span style="font-size: 18px">
                <span style="color: #9AC11C">
                  {{ comment.author.name }}
                </span>
                <span class="ml-1" style="color:#9ebe37">@</span>
                <span
                    style="color: #839D2D"
                    class="ml-1"
                    @click="$router.push({name: 'users.show', params: {username: comment.author.username }})"
                >
                  <v-chip>
                    {{ comment.author.username }}
                  </v-chip>
                </span>
              </span>
                </v-col>
                <v-col v-if="comment.author.username === useAuthStore().user.username">
                  <v-row justify="end" class="mr-8 pa-1">
                    <v-btn :loading="loading" color="red" @click="deleteComment(comment.id)" icon>
                      <v-icon>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
            <span class="pa-2" v-html="comment.body" style="font-size: 16px;">
            </span>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-col>
  </v-container>
</template>

<style scoped>

</style>
