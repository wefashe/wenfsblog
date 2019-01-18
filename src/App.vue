
  <template>
  <div>
    <Card :bordered="false"
          v-for="(post,index) in posts"
          :key="index">
      <p slot="title"
         v-text="post.title"></p>
      <p v-text="post.description"></p>
    </Card>
  </div>
</template>
  <script>
import matter from 'gray-matter';

export default {
  data () {
    return {
      posts: []
    }
  },
  methods: {
    //方法定义
    test: function () {
      console.log(123);
    }
  },
  mounted () {
    //方法执行
    this.$get('/user/docs')
      .then((response) => {
        this.posts = response.data;
      })
  }
}
</script>




<style lang="less" scoped>
.avatar {
  width: 100px;
  height: 100px;
}
</style>

