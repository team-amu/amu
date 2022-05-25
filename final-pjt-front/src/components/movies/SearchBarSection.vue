<template>
  <section id="searchbar-section">        
    <input
      id="search-title-input"
      type="text" 
      @input="inputChange"
      @keyup.enter="onSearch"
      :value="keywords"
    >
    <button
      id="search-title-btn"
      @click="onSearch"
    >검색</button>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
    inputChange: function (event) {
      const data = {
        searchKeywords : event.target.value,
        type : this.type
      }
      this.fetchKeywordMovie(data)
      this.$store.commit('SET_SEARCH_KEYWORDS', event.target.value)
    },
    onSearch: function () {
      this.$emit('on-search')
    }
  },
  computed: {
    ...mapGetters(['type', 'searchKeywords', 'selectedGenres', 'minRank', 'sortKeyword']),
  },
  created() {
    this.keywords = this.searchKeywords
  }
}
</script>

<style lang="scss" scoped>
input[type="text"] {
  width: 100%;
  border: 1px solid white;
}

#searchbar-section {
  @include flex-gap(row, 0.5);
  align-items: center;
  width: 100%;

  #search-title-input {
    @include input-style1;
    margin: 0;
    width: 9000px;
    height: auto;
    flex-shrink: 1;  
  }

  #search-title-btn {
    @include pt-btn2;
    padding: 0.7em;
    width: 1000px;
    flex-shrink: 1;  
  }
}
</style>