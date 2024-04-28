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
      <span class="pa-1">{{ props.post.author.name }}@<v-chip
          @click="$router.push({name: 'users.show', params: {username: props.post.author.username}})">
          {{ props.post.author.username }}
        </v-chip>
      </span>
    </v-row>
  </v-card-title>
  <v-card-text class="mx-2">
    <span :class="props.show? '': 'body-ellipses'">
      {{ props.post.body }}
    </span>
  </v-card-text>
  <v-card-text v-if="!show">
    <v-row justify="end" class="pa-2">
      <span class="me-4 view-colorize">
        <v-icon>mdi-eye</v-icon> {{ props.post.views }}
      </span>
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
