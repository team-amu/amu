<template>
  <div>
    <h1>MovieSearchView</h1>

    <div class="search-section">

      <v-container>
        <v-row>
          <v-col cols="2" align-self="center">
            <type-select-box></type-select-box>
          </v-col>
          <v-col cols="10">
            <search-bar-section
            @on-search="onSearch"
            ></search-bar-section>
          </v-col>
        </v-row>
      </v-container>

      <div class="searched-box" v-if="isKeywordsMovie">
        <ul>
          <li v-for="movie in keywordMovies" :key="movie.id">
            <button v-if="type==='title'"
              @click.prevent="onClickMovie(movie)"
            >
              {{ movie.title }}
            </button>
            <button v-if="type==='actor'"
              @click.prevent="onClickActor(movie)"
            >
              {{ movie.name }}
            </button>
          </li>
        </ul>
      </div>

    </div>

    <v-container class="">
      <v-row dense>
        <v-col cols="2">
            <div>
              <filter-sort-section :genres="genres"></filter-sort-section>
            </div>
        </v-col>

        <v-col cols="10">
            
            <div class="cards-section">
              <!-- 검색하고 글자 바뀌게 수정 -->
              <div class="section-container">
                <h3 class="title" v-if="isType==='title'">검색한 영화 결과</h3>
                <h3 class="title" v-if="isType==='actor'">검색한 배우가 출연한 영화</h3>
                <searched-card-section></searched-card-section>
              </div>
            </div>

        </v-col>        
      </v-row>  
    </v-container>


    <hr>

  </div>
</template>

<script>
import SearchBarSection from '@/components/movies/SearchBarSection.vue'
import FilterSortSection from '@/components/movies/FilterSortSection.vue'
import TypeSelectBox from '@/components/movies/TypeSelectBox.vue'
import SearchedCardSection from '@/components/movies/SearchedCardSection.vue'
import router from "@/router";
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "MovieSearchView",
  components: { SearchBarSection, FilterSortSection, TypeSelectBox, SearchedCardSection },

  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['searchedMovies', 'genres', 'selectedGenres', 
    'keywordMovies', 'type', 'searcKeywords', 'isKeywordsMovie', 'searchKeywords', 'minRank', 'sortKeyword']),

    isType () {
      return this.type
    },
  },
  methods: {
      ...mapActions(['fetchSearchMovie', 'fetchGenres']),
      onSearch() {
        router.push({ name: 'movieSearch', params: { searchPage: '1' }, query: {searchKeywords: this.searchKeywords, 
        type: this.type, genres: this.selectedGenres, minRank: this.minRank, sort: this.sortKeyword}})
    },
    onClickMovie(movie) {
      router.push({name: 'movieDetail', params: {moviePk: movie.id}})
    },
    onClickActor(actor) {
      router.push({ name: 'movieSearch', params: { searchPage: '1' }, query: {searchKeywords: actor.name, 
      type: this.type, genres: this.selectedGenres, minRank: this.minRank, sort: this.sortKeyword}})
    }
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

<style lang="scss" scoped>
.searched-box {
  width: 100%;
  height: 100px;
  margin: 5px;
  background-color: silver;
  float: left;
  overflow: auto;
}

.section-container {
  display: flex;
  flex-direction: column;
  text-align: right;

  .h3 {
    @include f-3;
    border : 1px solid white;
  }
}

</style>