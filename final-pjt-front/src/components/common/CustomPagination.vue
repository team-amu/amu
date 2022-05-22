<template>
  <div class="text-center">
    <v-pagination
      circle
      v-model="currentPage"
      :length="totalPages"
			@input="handlePageChange"
    ></v-pagination>
  </div>
</template>

<script>
export default {
	data () {
		return {
			currentPage: '1',
			totalPages: '3',
		}
	},
	methods: {
		handlePageChange(value) {
			this.currentPage = value;
		}
	}
}
</script>