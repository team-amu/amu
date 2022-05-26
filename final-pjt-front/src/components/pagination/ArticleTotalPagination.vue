<template>
  <div 
		id="pagination"
		class="text-center">
    <v-pagination
      circle
      v-model="totalPageNum"
      :length="totalsWholePageNum"
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
		...mapActions(['setTotals', 'setTotalPageNum']),

		handlePageChange(page) {
			this.$router.push({ name: 'communityTotal', params: { page } })
			this.setTotalPageNum(page)
			this.setTotals(page)
		}
	},
	computed: {
		...mapGetters(['totalPageNum', 'totalsWholePageNum']),
	},
	created() {}
}
</script>

<style lang="scss" scoped>
#pagination {
	margin: 2em 0 4em 0;
}
</style>