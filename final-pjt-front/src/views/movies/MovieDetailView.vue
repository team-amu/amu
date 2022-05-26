<template>
  <div>

    
    <div class="background-overlay background-overlay--black"></div>
    <div class="background">
      <img :src="posterSrc" alt="">
    </div>

    <div class="whole">
        <div class="title">
          <div>{{ movieDetail.title }} ({{ movieDetail.release_date.substring(0,4) }})</div>
        </div>
    
        <div class="upside-section">
          <div class="left-section">
            <div class="poster">
              <img :src="posterSrc" :alt="movieDetail.title" />
            </div>
          </div>
    
          <div class="right-section">
            <div class="iframe-box">
              <iframe :src="videoURI" frameborder="0"></iframe> 
            </div>
          </div>
        </div>
    
        <div class="content">
          <div class="vote">
            <div class="rank"><h2>평점 : {{ movieDetail.vote_average }} </h2></div>
            <div class="click">

              <div class="icon-count-part">
                <v-icon class="clicked-btn-icon"
                v-if="isLike && isLoggedIn" @click="movieLike(movieDetail.id)"
                >mdi-heart</v-icon>
                <v-icon class="btn-icon"
                v-if="!isLike && isLoggedIn" @click="movieLike(movieDetail.id)"
                >mdi-heart-outline</v-icon>
                <v-icon class="btn-icon"
                v-if="!isLoggedIn">mdi-heart-outline</v-icon>
                <span class="btn-count">{{ movieDetail.likes_count }}</span>
              </div>

              <div class="icon-count-part">
                <v-icon class="clicked-btn-icon"
                v-if="isBookmark && isLoggedIn" @click="movieBookmark(movieDetail.id)"
                >mdi-book-heart</v-icon>
                <v-icon class="btn-icon"
                v-if="!isBookmark && isLoggedIn" @click="movieBookmark(movieDetail.id)"
                >mdi-book-heart-outline</v-icon>
                <v-icon class="btn-icon"
                v-if="!isLoggedIn">mdi-book-heart-outline</v-icon>
                <span class="btn-count">{{ movieDetail.bookmarks_count }}</span>
              </div>
            </div>
          </div>
    
          <div class="overview">
            <h2>개요</h2>
            <hr>
            <p>{{ movieDetail.overview}}</p>
          </div>
    
          <h2>주요 출연진</h2>
          <hr>
          <div class="actors">
            <actor-item v-for="actor in movieDetail.castedactors_set" :key="actor.id" :actor="actor" class="actor"></actor-item>
          </div>

          <div class="reviews">
            <h2>리뷰 ({{ movieDetail.article_count }})</h2>
            <review-list :reviews="movieDetail.article_set" class="review"></review-list>
          </div>
        </div>

      </div>
    </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ActorItem from '@/components/movies/ActorItem.vue'
import ReviewList from '@/components/movies/ReviewList.vue'

export default {
  name: "MovieDetailView",
  components: { ActorItem, ReviewList },
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
    },
    posterSrc () {
      return `https://image.tmdb.org/t/p/w600_and_h900_bestv2${this.movieDetail.poster_path}`
    },
    profileSrc (actor) {
      return `https://image.tmdb.org/t/p/w600_and_h900_bestv2${actor.actor.profile_path}`
    },
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

<style lang="scss" scoped>

.background {

  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  border-radius: 10px;
}

.background-overlay {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: linear-gradient(to bottom, rgba($dm-bg-color1, 0.5), rgba($dm-bg-color1, 1));
  box-shadow: 5px 5px 30px 1px $dm-nav-color;
  backdrop-filter: blur(3px);
}

.whole {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.title {
  div {
    letter-spacing: 0.5rem;
    @include f-1;
  }
  z-index: 1;
  width: 100%;
  height: 80px;
  position: relative;
  display: block;
  top: 2rem;
  left: 8%;
  color: white;
  box-shadow: 5px 5px 30px 1px $dm-nav-color;

  @media screen and (max-width: 1024px) {
    text-align: center;
    left: 0;
  }
}
  
.upside-section {
  z-index: 1;
  display: flex;
  width: 100%;
  height: 43.75vh;
  position: relative;
  justify-content: space-around;


  .left-section {
    width: 40%;
    height: auto;
    display: flex;

    .poster {
      width: 60%;
      left: 20%;
      height: auto;
      display: block;
      position : relative;
      overflow: hidden;
      box-shadow: 5px 5px 30px 1px $dm-nav-color;

      img {
        width: 100%;
        height: 100%;
        box-shadow: 0 3px 12px rgb(black,.2);
        border-radius: 10px;
        filter: saturate(70%) contrast(85%);
        object-fit: cover;
      }
    }
  }

  .right-section {
    position: relative;
    width:60%;
    height: auto;
    
    iframe {
      position: absolute;
      width: 90%;
      height: 100%;
      // left: 5%;
      box-shadow: 5px 5px 30px 1px $dm-nav-color;
      border-radius: 10px;
    }
  }

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    height: 60vh;
    .left-section {
      width: 100%;
      height: 50%;
      .poster {
        left: 10%;
        width: 80%;
        height: auto;
        img {
          object-fit: contain;
        }
      }
    }
    .right-section {
      width: 100%;
      height: 60%;
      iframe {
        left: 5%;
      }
    }
  }
}

.content {
  width: 86%;
  left: 8%;
  height: auto;
  z-index: 1;
  position: relative;
  
  .vote {
    width: 100%;
    align-items: center;
    height: auto;
    display: flex;
    .rank {
      @include f-3;
      margin-top: 1rem;
      margin-bottom: 1rem;
      letter-spacing: 1px;
    }

    .click {
      margin-left: 1rem;
      margin-top: 0.05rem;

      @include f-3;
      display:flex;
      gap: 1rem;
      color: white;
      transition: 0.3s all ease-in-out;
      cursor: pointer;

      .btn-icon {
        @include f-2;
        color: white;
        margin-right: 0.3rem;
        font-size:2.5rem;

        &:hover {
          color: $dm-pt-color2;  
          transform: scale(1.1);
        }
      }
      .clicked-btn-icon {
        @include f-2;
        color: $dm-pt-color2;
        margin-right: 0.3rem;
        font-size:2.5rem;

        &:hover {
          animation: shake 1s forwards;
        }
      }
      @keyframes shake {
        10% {
          transform: rotate(15deg)
        }
        20% {
          transform: rotate(-15deg)
        }
        30% {
          transform: rotate(15deg)
        }
        50% {
          transform: rotate(0deg)
        }
      }

    }

  }
  .overview {
    @include f-3;
    letter-spacing: 3px;
    p {
      letter-spacing: 1px;
      @include f-4;
      font-weight: 350;
    }
    width: 100%;
    height: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: wrap;
  }

  h2 {
    @include f-2;
  }
  .actors {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
    position: relative;
    width: 100%;
    margin-top: 1rem;
    .actor {
      display: inline-block;
    }
  }

  .reviews {
    margin-top: 1rem;
    width: 100%;
    height: auto;
    z-index: 1;
    letter-spacing: 2px;
  }

  @media screen and (max-width: 1024px) {
    width: 90%;
    text-align: center;
    left: 5%;
  }
}

</style>