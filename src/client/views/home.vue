
<template>
  <div>
    <Menu active-name="1">
      <router-link :to="{ name: 'home' }"/>
      <!-- <MenuGroup title="内容管理"> -->
      <MenuItem name="home" to="home">
        <Icon type="md-home"/>首页
      </MenuItem>
      <MenuItem name="tags" to="tags">
        <Icon type="md-pricetags"/>标签
      </MenuItem>
      <!-- </MenuGroup> -->
      <!-- <MenuGroup title="统计分析"> -->
      <MenuItem name="archive" to="archive">
        <Icon type="md-archive"/>归档
      </MenuItem>
      <MenuItem name="github" to="github">
        <Icon type="logo-github"/>Github
      </MenuItem>
      <!-- </MenuGroup> -->
    </Menu>

    <Card>
      <div style="min-height: 200px;">
        <router-view/>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      theme3: 'light'
    };
  },
  methods: {
    handleSelect(key) {
      if (key === 'github') {
        window.open('https://github.com/wefashe');
      } else {
        this.$router.push({
          name: key
        });
      }
    }
  }
};
</script>
