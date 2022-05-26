<template>
  <div 
		id="pagination"
		class="text-center">
    <v-pagination
      circle
			class="custom-pagination"
      v-model="freePageNum"
      :length="freesWholePageNum"
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
		...mapActions(['setFrees', 'setFreePageNum']),

		handlePageChange(page) {
			this.$router.push({ name: 'communityFree', params: { page } })
			this.setFreePageNum(page)
			this.setFrees(page)
		}
	},
	computed: {
		...mapGetters(['freePageNum', 'freesWholePageNum']),
	},
	created() {}
}
</script>

<style lang="scss" scoped>
#pagination {
	margin: 2em 0 4em 0;
}
</style>