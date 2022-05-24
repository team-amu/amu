<template>
  <div>
    <input type="text" 
    @input="inputChange"
    @keyup.enter="onSearch"
    v-model="keywords"
    >

    <button @click="onSearch">검색</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import router from "@/router";

export default {
  name: "SearchBarSection",
  data() {
    return {
      keywords: this.searcKeywords,
    }
  },
  props: {
  },
  methods: {
    ...mapActions(['fetchKeywordMovie']),
    inputChange: function () {
      const data = {
        searchKeywords : this.keywords,
        type : this.type
      }
      this.fetchKeywordMovie(data)
      this.$store.commit('SET_SEARCH_KEYWORDS', this.keywords)
    },
    onSearch: function () {
      router.push({ name: 'movieSearch', params: { searchPage: '1' }, query: {searchKeywords: this.keywords, 
      type: this.type, genres: this.selectedGenres, minRank: this.minRank, sort: this.sortKeyword}})
    }
  },
  computed: {
    ...mapGetters(['type', 'searchKeywords', 'selectedGenres', 'minRank', 'sortKeyword'])
  },
  created() {
    this.keywords = this.searchKeywords
  }
}
</script>

<style>

</style>