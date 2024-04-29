<script setup>
const props = defineProps(['post', 'show'])
</script>

<template>
  <v-card-title>
    <v-row class="my-1 mx-2">
      <span class="title-ellipses">
        {{ props.post.title }}
      </span>
    </v-row>
    <v-row class="my-1 mx-1 account">
      <span v-if="show" class="pa-1">{{ props.post.author.name }}</span>
      <v-chip
          @click="$router.push({name: 'users.show', params: {username: props.post.author.username}})"
      >
        {{ props.post.author.username }}
      </v-chip>
    </v-row>
    <v-row class="mx-2 mb-4">
      <v-chip v-for="(category, index) in props.post.categories"
              :style="{backgroundColor: `#${((Math.random() * 0xffffff) <<0).toString(16)}`, color: 'white'}"
      >
        {{ category.title }}
      </v-chip>
    </v-row>
  </v-card-title>
  <v-card-text class="mx-2">
    <span v-if="show" v-html="props.post.body" :class="props.show? '': 'body-ellipses'">
    </span>
    <span v-else v-html="props.post.body.replace(/(<img([^>]+)>)/ig, '')" :class="props.show ? '': 'body-ellipses'">
    </span>
  </v-card-text>
  <v-card-text v-if="!show">
    <v-row justify="end" class="pa-2">
      <v-col class="pa-0 ml-2" cols="6">
        <v-btn
            color="primary"
            @click="$router.push({name: 'posts.show', params: {id: post.id}})"
            block
        >
          {{ $t('post.read') }}
        </v-btn>
      </v-col>
      <v-col class="pa-0" align-self="center" align="end">
        <span class="me-4 view-colorize">
          <v-icon>mdi-eye</v-icon> {{ props.post.views }}
        </span>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<style scoped>
.title-ellipses {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.body-ellipses {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.account {
  font-size: 16px;
  color: gray
}

.view-colorize {
  color: gray;
}

.view-colorize:hover {
  color: green;
}
</style>
