<template>
  <div class="text-center">
    <v-pagination
      circle
      v-model="currentPage"
      :length="profileLikedMovieWholePageNum"
			@input="handlePageChange"
    ></v-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
	props: {},
	data() {
		return {
			currentPage: 1
		}
	},
	methods: {
		...mapActions(['fetchProfileLike', 'setProfileLikedMoviePageNum']),

		handlePageChange(page) {
			// const payload = {
			// 	username: this.username,
			// 	page: Number(page),
			// }
			console.log(page)
			// this.$router.push({ name: 'profileLike', params: payload })
			// this.setProfileLikedMoviePageNum(page)
			// this.fetchProfileLike(payload)
		}
	},
	computed: {
		...mapGetters(['profileLikedMoviePageNum', 'profileLikedMovieWholePageNum']),
	},
	created() {
		const params = this.$route.params
		console.log(params)
		// this.setProfileLikedMoviePageNum(params.page)
		// this.fetchProfileLike()
	},
	watch: {
		currentPage: function (page) {
			const payload = {
				username: this.$route.params.username,
				page: Number(page),
			}
			this.fetchProfileLike(payload)
		}
	}
}
</script>