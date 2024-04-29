<script setup>
import Editor from "../../../components/Editor.vue";
import {onMounted, ref} from "vue";
import {useAuthStore} from "../../../stores/AuthStore.js";
import axios from "axios";
import {API_PATH} from "../../../plugins/consts.js";
import {useToast} from 'vue-toastification'
import router from "../../../router/index.js";

const toast = useToast()

const props = defineProps({
  model: {
    type: [String, Number],
    default: null
  }
})

let editor = ref(null)

let post = ref({
  title: '',
  body: '',
  cover: '',
  categories: [],
  loading: false
})

let selectCategories = ref([])

function setPostBody(body) {
  post.value.body = body
}

function savePost() {
  post.value.loading = true
  if (!props.model) {
    axios.post(`${API_PATH}/posts`, post.value)
        .then(({data}) => {
          post.value.loading = false
          router.push({name: 'posts.show', params: {id: data.id}})
          toast.success(this.$t('post.success_created'))
        })
        .catch
        ((err) => {
          post.value.loading = false
          toast.error(err.response.data.message)
        })
  } else {
    axios.patch(`${API_PATH}/posts/${props.model}`, post.value)
        .then(({data}) => {
          post.value.loading = false
          router.push({name: 'posts.show', params: {id: data.id}})
          toast.success(this.$t('post.success_created'))
        })
        .catch
        ((err) => {
          post.value.loading = false
          toast.error(err.response.data.message)
        })
  }
}

onMounted(async () => {
  post.value.loading = true

  await axios.get(`${API_PATH}/categories`).then(({data}) => {
    selectCategories.value = data.data
    post.value.loading = false
  })


  if (props.model) {
    await axios.get(`${API_PATH}/posts/${props.model}/edit`)
        .then(({data}) => {
          post.value.loading = false
          post.value.categories = data.data.categories.map((el) => el.id)
          post.value.cover = data.data.cover
          post.value.title = data.data.title
          post.value.body = data.data.body
          this.$forceUpdate
        })
        .catch((err) => {
          post.value.loading = false
          if (err.response.status === 403) {
            toast.error(err.response.data.message)
            router.push({name: 'posts.index'})
          }
        })
  }
});
</script>

<template>
  <v-container class="justify-center align-center d-flex">
    <v-col xs="12" md="8" xl="6" xxl="4">
      <v-card variant="outlined">
        <v-card-title class="mx-4 my-4">
          {{ !model ? $t('post.create') : $t('post.edit') }}
        </v-card-title>
        <v-row class="my-4" v-if="post.loading && model" justify="center">
          <v-progress-circular indeterminate>
          </v-progress-circular>
        </v-row>
        <v-card-text>
          <v-text-field
              class="mx-4"
              v-model="post.title"
              variant="outlined"
              density="compact"
          >
            <template #label>
              {{ $t('post.title') }}<span style="color: red">*</span>
            </template>
          </v-text-field>
          <v-text-field
              class="mx-4"
              v-model="post.cover"
              variant="outlined"
              density="compact"
          >
            <template #label>
              {{ $t('post.cover') }}
            </template>
          </v-text-field>
          <v-select
              class="mx-4"
              clearable
              v-model="post.categories"
              :items="selectCategories"
              item-value="id"
              multiple
              variant="outlined"
              density="compact"
          >
            <template #label>
              {{ $t('post.categories') }}<span style="color: red">*</span>
            </template>
          </v-select>
          <editor
              ref="editor"
              class="mx-4 mb-4"
              :content-editor-style="true"
              :active-buttons="[
                  'bold',
                  'italic',
                  'strike',
                  'underline',
                  'undo',
                  'redo',
                  'image',
                  'align-left',
                  'align-center',
                  'align-right',
                  'align-justify',
                  'align-unset'
              ]"
              @update="setPostBody"
              :initial-value="post.body"
          />
        </v-card-text>
        <v-card-actions class="ma-0 pa-0 mx-8 mb-4">
          <v-btn
              variant="outlined"
              :loading="post.loading"
              color="primary"
              @click="savePost"
          >
            {{ $t('add') }}
          </v-btn>
          <v-btn
              variant="outlined"
              color="red"
              @click="$router.push({name: 'users.show', params: {username: useAuthStore().user.username}})"
          >
            {{ $t('close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-container>
</template>

<style scoped>
</style>
