<template>
  <div class="overflow-auto">
    <b-pagination
			pills
			v-model="currentPage"
			:total-rows="rows"
			></b-pagination>
  </div>
</template>

<script>
import { BPagination } from 'bootstrap-vue'
export default {
	name: "CustomPagination",
	components: {
		BPagination,
	},
	data() {
		return {
			rows: 100,
			currentPage: 1,
			perPage: 5,
			total: 20
		}
	}
}
</script>