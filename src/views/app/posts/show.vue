<script>
import axios from "axios";
import {API_PATH} from "../../../plugins/consts.js";
import PostBody from "../../../components/PostBody.vue";
import Form from "vform";
import {EditorContent} from "@tiptap/vue-3";
import Editor from "../../../components/Editor.vue";

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
    async getPost() {
      this.loading = true
      const {data} = await axios.get(`${API_PATH}/posts/${this.$route.params.id}`)
      this.post = data.data
      this.loading = false
    },
    async sendComment() {
      await this.comment.post(`${API_PATH}/posts/${this.$route.params.id}/comments`)
      this.comment.body = ''
      await this.getPost()
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
  <div>
    <v-card style="border: solid 2px gray; border-radius: 8px">
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
          <v-col cols="10">
            <editor
                class="mx-4"
                :active-buttons="['bold', 'italic', 'strike', 'underline']"
                :initial-content="comment.body"
                @update="setComment"
            />
          </v-col>
          <v-col cols="2" class="pa-0 mt-4">
            <v-btn @click="sendComment" height="80">
              <v-icon>
                mdi-arrow-left
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card v-show="post.comments" variant="flat" class="mt-4">
      <v-card-text>
        <v-card style="border: solid 2px grey; border-radius: 8px" class="mb-4"
                v-for="(comment, index) in post.comments" :key="index">
          <v-card-title>
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
          </v-card-title>
          <v-card-text>
            <span class="pa-2" v-html="comment.body" style="font-size: 16px;">
            </span>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>

</style>
