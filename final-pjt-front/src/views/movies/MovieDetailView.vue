<template>
  <div>
    <h1>MovieDetailView</h1>
    <!-- 일단 카드 아이템으로 썼는데 달라질듯?? -->
    <h2>{{ movieDetail.title }}</h2>
    <h2>{{ movieDetail.release_date }}</h2>
    <card-item :movie="movieDetail" style="display: inline;"></card-item>
    <div>
      <!-- 아이프레임 옵션 검색 후 적용 필요 -->
      <iframe :src="videoURI" frameborder="0"></iframe>
    </div>
    <h2>평점 : {{ movieDetail.vote_average }} / </h2>
    
    <button v-if="isLike && isLoggedIn" @click="movieLike(movieDetail.id)">좋아요 취소</button>
    <button v-if="!isLike && isLoggedIn" @click="movieLike(movieDetail.id)">좋아요</button>

    <button v-if="isBookmark && isLoggedIn" @click="movieBookmark(movieDetail.id)">북마크 취소</button>
    <button v-if="!isBookmark && isLoggedIn" @click="movieBookmark(movieDetail.id)">북마크</button>

    <h3>개요</h3>
    <p>{{ movieDetail.overview}}</p>

    <h3>출연진</h3>
    <span v-for="actor in movieDetail.actors" :key="actor.id" >
      <actor-item :actor="actor" style="display: inline;"></actor-item>
    </span>

    <h3>리뷰</h3>
    <hr>
    <review-list :reviews="movieDetail.article_set"></review-list>
  </div>
</template>

<script>
// import  from '@/components//.vue'
import { mapActions, mapGetters } from 'vuex'
import CardItem from '@/components/movies/CardItem.vue'
import ActorItem from '@/components/movies/ActorItem.vue'
import ReviewList from '@/components/movies/ReviewList.vue'

export default {
  name: "MovieDetailView",
  components: { CardItem, ActorItem, ReviewList },
  data () {
    return {
      isLike: '',
      isBookmark: '',
    }
  },
  computed: {
    ...mapGetters(['movieDetail', 'isLoggedIn', 'currentUser']),
    videoURI() {
      const videoId = this.movieDetail.video_key
      return `https://www.youtube.com/embed/${videoId}`
    },
    isLikeChange() {
      return this.movieDetail.like_users
    },
    isBookmarkChange() {
      return this.movieDetail.bookmark_users
    }
  },
  methods: {
    ...mapActions(['fetchMovieDetail', 'movieLike', 'movieBookmark']),
  },
  watch: {
  // 이 조건은 구글링 하다가 찾았는데 아직 잘 모름 일단 넣어놈,,
    immediate: true,
    $route: {
      handler() {
        this.fetchMovieDetail(this.$route.params.moviePk)
      }
    },
    isLikeChange(value) {
      let flag = false
      for (const val of value) {
        if (val.pk === this.currentUser.pk) {
          flag = true
        }
      }
      this.isLike = flag
    },
    isBookmarkChange(value) {
      let flag = false
      for (const val of value) {
        if (val.pk === this.currentUser.pk) {
          flag = true
        }
      }
      this.isBookmark = flag
    }
  },
  created() {
    this.fetchMovieDetail(this.$route.params.moviePk)
  }
}
</script>

<style>

</style>