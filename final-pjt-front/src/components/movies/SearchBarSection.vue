<template>
  <div>
    <h2>SearchBarSection</h2>
    <select v-model="selected" @change="inputChange">
      <option value="title">영화제목</option>
      <option value="actor">배우</option>
    </select>
    
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
      selected: this.type,
    }
  },
  props: {
  },
  methods: {
    ...mapActions(['fetchKeywordMovie']),
    inputChange: function () {
      const data = {
        searchKeywords : this.keywords,
        type : this.selected
      }
      this.fetchKeywordMovie(data)
      this.$store.commit('SET_SEARCH_KEYWORDS', this.keywords)
      this.$store.commit('SET_TYPE', this.selected)
    },
    onSearch: function () {
      router.push({ name: 'movieSearch', params: { searchPage: '1' }, query: {searchKeywords: this.keywords, 
      type: this.selected, genres: this.selectedGenres, rank: this.minRank}})
    }
  },
  computed: {
    ...mapGetters(['type', 'searchKeywords', 'selectedGenres', 'minRank'])
  },
  created() {
    this.keywords = this.searchKeywords,
    this.selected = this.type
  }
}
</script>

<style>

</style>