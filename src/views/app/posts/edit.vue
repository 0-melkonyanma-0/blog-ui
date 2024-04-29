<template>
  <post-form :model="$route.params.id"></post-form>
</template>

<script>
import PostForm from "./postForm.vue";

export default {
  components: {PostForm}
}
</script>
