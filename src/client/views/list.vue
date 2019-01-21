<template>
  <div>
    <Card
      v-for="(post,index) in posts"
      :key="index"
      :bordered="false"
    >
      <p
        slot="title"
        v-text="post.title"
      />
      <p v-text="post.description" />
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.$get('/user/docs').then(response => {
      this.posts = response.data;
    });
  }
};
</script>

<style>
</style>
