
  <template>
  <div style="background:#eee;padding: 20px">
    <Card :bordered="false">
      <p slot="title">No border title</p>
      <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
    </Card>
  </div>
</template>
  <script>
import matter from 'gray-matter';

export default {
  methods: {
    test: function () {
      var value = matter.read('./README.md');
      return value;
    }
  },
  mounted () {
    console.log(this.test());
  }
}
</script>




<style lang="less" scoped>
.avatar {
  width: 100px;
  height: 100px;
}
</style>

