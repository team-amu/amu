<template>
  <div>
    <h1>MovieSearchView</h1>

    <filter-sort-section :genres="genres"></filter-sort-section>
    <type-select-box></type-select-box>
    <search-bar-section
    ></search-bar-section>
    
    <div class="searched-box" v-if="isKeywordsMovie">
      <ul>
        <li v-for="movie in keywordMovies" :key="movie.id">
          <span v-if="type==='title'">
            {{ movie.title }}
          </span>
          <span v-if="type==='actor'">
            {{ movie.name }}
          </span>
        </li>
      </ul>
    </div>
    
    <hr>
    <!-- 검색하고 글자 바뀌게 수정 -->
    <h3 v-if="isType==='title'">검색된 영화 결과</h3>
    <h3 v-if="isType==='actor'">해당 영화 배우가 출연한 영화</h3>
    <ul>
      <li v-for="searchedMovie in searchedMovies" :key="searchedMovie.id">
        {{ searchedMovie }}
      </li>
    </ul>

  </div>
</template>

<script>
import SearchBarSection from '@/components/movies/SearchBarSection.vue'
import FilterSortSection from '@/components/movies/FilterSortSection.vue'
import TypeSelectBox from '@/components/movies/TypeSelectBox.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "MovieSearchView",
  components: { SearchBarSection, FilterSortSection, TypeSelectBox },

  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['searchedMovies', 'genres', 'selectedGenres', 
    'keywordMovies', 'type', 'searcKeywords', 'isKeywordsMovie']),

    isType () {
      return this.type
    },
  },
  methods: {
      ...mapActions(['fetchSearchMovie', 'fetchGenres']), 
  },
  watch: {
    $route: {
      handler() {
        const payload = {
          searchPage: this.$route.params.searchPage,
          searchKeywords: this.$route.query.searchKeywords,
          type: this.$route.query.type,
          selectedGenres: this.$route.query.genres,
          minRank : this.$route.query.minRank,
          sort: this.$route.query.sort
        }
        this.fetchSearchMovie(payload)
      }
    }
  },
  created() {
    const payload = {
      searchPage: this.$route.params.searchPage,
      searchKeywords: this.$route.query.searchKeywords,
      type: this.$route.query.type,
      selectedGenres: this.$route.query.genres,
      minRank : this.$route.query.minRank,
      sort: this.$route.query.sort
    }
    this.fetchSearchMovie(payload)
    this.fetchGenres()
  }
}
</script>

<style>
.searched-box {
  width: 100%;
  height: 100px;
  margin: 5px;
  background-color: silver;
  float: left;
  overflow: auto;
}
</style>