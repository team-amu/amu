<template>
  <section id="home-view">
    <section id="search-bar-section">
      <div id="movie-search-bar">
        <h1 class="main-title">Home</h1>
        <type-select-box id="type-select-box"></type-select-box>
        <search-bar-section
          @on-search="onSearch"
        ></search-bar-section>
      </div>
      <div id="searched-section" v-if="isKeywordsMovie">
        <ul id="searched-title-list">
          <li
            id="searched-title"
            v-for="movie in keywordMovies"
            :key="movie.id"
          >
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
    </section>

    <section id="follower-like-section" v-if="isLoggedIn">
      <h2 class="main-title">팔로워들이 좋아하는 영화</h2>
      <div class="slide">
        <vueper-slides
          class="no-shadow"
          :visible-slides="5"
          :slide-ratio="1 / 4"
          :dragging-distance="300"
          :breakpoints="{ 
            1500: { visibleSlides: 4, slideMultiple: 1 },
            1100: { visibleSlides: 3, slideMultiple: 1 },
            800: { visibleSlides: 2, slideMultiple: 1 } ,
            450: { visibleSlides: 1, slideMultiple: 1 } }"
          >
          <vueper-slide v-for="movie in likeMovie" :key="movie.id">
            <template v-slot:content >
              <card-item :movie="movie" class="vueperslide__content-wrapper"></card-item>
            </template>
          </vueper-slide>
        </vueper-slides>
      </div>
    </section>
      
    <section id="follower-bookmark-section" v-if="isLoggedIn">
      <h2 class="main-title">팔로워들이 북마크한 영화</h2>
      <div class="slide">
        <vueper-slides
          class="no-shadow"
          :visible-slides="5"
          :slide-ratio="1 / 4"
          :dragging-distance="300"
          :breakpoints="{ 
            1500: { visibleSlides: 4, slideMultiple: 1 },
            1100: { visibleSlides: 3, slideMultiple: 1 },
            800: { visibleSlides: 2, slideMultiple: 1 } ,
            450: { visibleSlides: 1, slideMultiple: 1 } }"
          >
          <vueper-slide v-for="movie in bookmarkMovie" :key="movie.id">
            <template v-slot:content >
              <card-item :movie="movie" class="vueperslide__content-wrapper"></card-item>
            </template>
          </vueper-slide>
        </vueper-slides>
      </div>
    </section>

    <section id="hot-section">
      <h2 class="main-title">AMU 인기 영화 </h2>
      <div class="slide">
        <vueper-slides
          class="no-shadow"
          :visible-slides="5"
          :slide-ratio="1 / 4"
          :dragging-distance="300"
          :breakpoints="{ 
            1500: { visibleSlides: 4, slideMultiple: 1 },
            1100: { visibleSlides: 3, slideMultiple: 1 },
            800: { visibleSlides: 2, slideMultiple: 1 } ,
            450: { visibleSlides: 1, slideMultiple: 1 } }"
          >
          <vueper-slide v-for="movie in hotMovie" :key="movie.id ">
            <template v-slot:content >
              <card-item :movie="movie" class="vueperslide__content-wrapper"></card-item>
            </template>
          </vueper-slide>
        </vueper-slides>
      </div>
    </section>

    <section id="recent-open-section">
      <h2 class="main-title">최근 개봉 영화</h2>
      <div class="slide">
        <vueper-slides
          class="no-shadow"
          :visible-slides="5"
          :slide-ratio="1 / 4"
          :dragging-distance="300"
          :breakpoints="{ 
            1500: { visibleSlides: 4, slideMultiple: 1 },
            1100: { visibleSlides: 3, slideMultiple: 1 },
            800: { visibleSlides: 2, slideMultiple: 1 } ,
            450: { visibleSlides: 1, slideMultiple: 1 } }"
          >
          <vueper-slide v-for="movie in recentMovie" :key="movie.id">
            <template v-slot:content >
              <card-item :movie="movie" class="vueperslide__content-wrapper"></card-item>
            </template>
          </vueper-slide>
        </vueper-slides>
      </div>
    </section>
        
    <section id="popular-section">
      <h2 class="main-title">인기 영화</h2>
      <div class="slide">
        <vueper-slides
          class="no-shadow"
          :visible-slides="5"
          :slide-ratio="1 / 4"
          :dragging-distance="300"
          :breakpoints="{ 
            1500: { visibleSlides: 4, slideMultiple: 1 },
            1100: { visibleSlides: 3, slideMultiple: 1 },
            800: { visibleSlides: 2, slideMultiple: 1 } ,
            450: { visibleSlides: 1, slideMultiple: 1 } }"
          >
          <vueper-slide v-for="movie in popularMovie" :key="movie.id">
            <template v-slot:content>
              <card-item :movie="movie" class="vueperslide__content-wrapper"></card-item>
            </template>
          </vueper-slide>
        </vueper-slides>
      </div>
    </section>
  </section>
</template>

<script>
import CardItem from '@/components/movies/CardItem.vue'
import SearchBarSection from '@/components/movies/SearchBarSection.vue'
import TypeSelectBox from '@/components/movies/TypeSelectBox.vue'
import router from "@/router";
import { mapActions, mapGetters } from 'vuex'
// vueper slides
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  name: "HomeView",
  components: { CardItem, SearchBarSection, TypeSelectBox, VueperSlides, VueperSlide },
  data () {
    return {
      slides: [
        {
          title: 'Slide#1',
          content: 'Slide content'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['hotMovie', 'likeMovie', 'bookmarkMovie', 
    'isKeywordsMovie', 'keywordMovies', 'type', 'searchKeywords', 
    'selectedGenres', 'minRank', 'sortKeyword', 'isLoggedIn',
    'recentMovie', 'popularMovie', ]),
  },
  methods: {
    ...mapActions(['fetchHotMovie', 'fetchLikeMovie', 'fetchBookmarkMovie', 'fetchPopularMovie', 'fetchRecentMovie' ]),    
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
    this.fetchPopularMovie()
    this.fetchRecentMovie()
    this.$store.commit("RESET_SEARCH")
  },
}
</script>

<style lang="scss" scoped>
.main-title {
  @include main-title;
  margin: .5em 0;
}

#home-view {
  @include flex-gap(column, 4);
  margin: 4em 0;

  #search-bar-section {
    @include flex-gap(column, .5);

    #movie-search-bar {
      @include flex-gap(column, 0);

      #type-select-box {
        @include flex;
      }
    }

    #searched-section {
      @include searched-box;
    }
  }
}

vueper-slide {
  height: 1000px;
}
card-item {
  height: 1000px;
}
</style>

