<template>
  <div>
    <h1>Home</h1>
    
    <hr>
    <type-select-box></type-select-box>
    <search-bar-section
    @on-search="onSearch"
    ></search-bar-section>

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
    <hr>
    
    <h2>최근 HOT한 영화 </h2>
    <card-list :movies="hotMovie"></card-list>
    
    <h2>팔로우한 사람들이 좋아하는 영화</h2>
    <card-list :movies="likeMovie"></card-list>
    
    <h2>팔로우한 사람들이 북마크한 영화</h2>
    <card-list :movies="bookmarkMovie"></card-list>
  </div>
</template>

<script>
import CardList from '@/components/movies/CardList.vue'
import SearchBarSection from '@/components/movies/SearchBarSection.vue'
import TypeSelectBox from '@/components/movies/TypeSelectBox.vue'
import router from "@/router";
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "HomeView",
  components: { CardList, SearchBarSection, TypeSelectBox },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['hotMovie', 'likeMovie', 'bookmarkMovie', 
    'isKeywordsMovie', 'keywordMovies', 'type', 'searchKeywords', 'selectedGenres', 'minRank', 'sortKeyword']),
  },
  methods: {
    ...mapActions(['fetchHotMovie', 'fetchLikeMovie', 'fetchBookmarkMovie', ]),
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
    // 이 조건은 구글링 하다가 찾았는데 아직 잘 모름 일단 넣어놈,,
    immediate: true,
  },
  created() {
    this.fetchHotMovie()
    this.fetchLikeMovie()
    this.fetchBookmarkMovie()
    this.$store.commit("RESET_SEARCH")
  },
}
</script>

<style lang="scss" scopted>
.searched-box {
  @include searched-box;
}
</style>

