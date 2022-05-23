<template>
  <div class="text-center">
    <v-pagination
      circle
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