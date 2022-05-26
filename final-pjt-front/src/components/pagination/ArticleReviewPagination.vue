<template>
  <div 
		id="pagination"
		class="text-center">
    <v-pagination
      circle
      v-model="reviewPageNum"
      :length="reviewsWholePageNum"
			@input="handlePageChange"
    ></v-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
	data () {
		return {}
	},
	props: {},
	methods: {
		...mapActions(['setReviews', 'setReviewPageNum']),

		handlePageChange(page) {
			this.$router.push({ name: 'communityReview', params: { page } })
			this.setReviewPageNum(page)
			this.setReviews(page)
		}
	},
	computed: {
		...mapGetters(['reviewPageNum', 'reviewsWholePageNum']),
	},
	created() {}
}
</script>

<style lang="scss" scoped>
#pagination {
	margin: 2em 0 4em 0;
}
</style>