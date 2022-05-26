<template>
  <div>
    <h1>Home</h1>
    
    <hr>

    <type-select-box id=""></type-select-box>

    <search-bar-section
    @on-search="onSearch"
    ></search-bar-section>

    <div class="background">

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
      
      <div class="slides">
  
        <div class="hot">
          <div class="title">
            <h2>최근 HOT한 영화 </h2>
          </div>
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
        </div>
        
        <div v-if="isLoggedIn">
          <div class="follow-like">
            <div class="title">
              <h2>팔로우한 사람들이 좋아하는 영화</h2>
            </div>
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
          </div>
          
          <div class="follow-bookmark">
            <div class="title">
              <h2>팔로우한 사람들이 북마크한 영화</h2>
            </div>
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
          </div>
        </div>
    
        <div v-if="!isLoggedIn">
    
          <div class="recent">
            <div class="title">
              <h2>최근 개봉 영화</h2>
            </div>
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
          </div>
          
          <div class="popular">
            <div class="title">
              <h2>인기 있는 영화</h2>
            </div>
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
          </div>
        </div>
      </div>

    </div>  

  </div>

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

<style lang="scss" scopted>
.searched-box {
  @include searched-box;
}

.slides {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

}

.background {
  display: flex;
  flex-direction: column;

    .title {
      @media only screen and (max-width:1100px){
        text-align: center;
      }
      margin-top: 1rem;
      margin-left: 1rem;
    }

  .hot {
    display: flex;
    flex-direction: column;   
  }
  .follow-like {
    display: flex;
    flex-direction: column;
  }
  .follower-follow {
    display: flex;
    flex-direction: column;
  }
  .recent {
    display: flex;
    flex-direction: column;
  }
  .popular {
    display: flex;
    flex-direction: column;
  }

}


</style>

