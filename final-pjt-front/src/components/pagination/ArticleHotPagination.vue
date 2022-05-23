<template>
  <div class="text-center">
    <v-pagination
      circle
      v-model="hotPageNum"
      :length="hotsWholePageNum"
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
		...mapActions(['setHots', 'setHotPageNum']),

		handlePageChange(page) {
			this.$router.push({ name: 'communityHot', params: { page } })
			this.setHotPageNum(page)
			this.setHots(page)
		}
	},
	computed: {
		...mapGetters(['hotPageNum', 'hotsWholePageNum']),
	},
	created() {}
}
</script>