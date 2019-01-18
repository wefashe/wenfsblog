<template>
	<div class="post-list">
		<Card :bordered="false" v-for=''>
			<p slot="title" v-text=""></p>
            <p v-text=""></p>
		</Card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			posts:[]
		};
	},
	mounted() {
		this.$get('/user/docs')
		  .then((response) => {
		    this.posts = response.data;
		  })
	}
};
</script>

<style>
</style>
