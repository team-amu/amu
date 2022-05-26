<template>
  <div id="article-detail-section">

    <section id="post-header-section">
      <div id="post-title-part">
        <div id="post-title">{{ articleInfo.title }}</div>
        <div id="post-number">#{{ articleInfo.pk }}</div>
      </div>
      <div id="user-info-part">
        <router-link
          :to="{ name: 'profileLike', params: { username } }"
        >
          <!-- <div id="user-profile-image">
            <img src="" alt="user profile image">
          </div> -->
          <div id="user-username">{{ nickname }}</div>
        </router-link>
      </div>
      
      <div id="post-info-part">
        <div id="post-created-at-part">
          <v-icon>mdi-clock</v-icon>
          <div>작성 {{ cuttedCreatedAt }}</div>
        </div>
        <div id="post-updated-at-part">
          <v-icon>mdi-pen</v-icon>
          <div>수정 {{ cuttedUpdatedAt }}</div>
        </div>
        <div id="post-count-part">
          <div id="comments-count-part">
            <v-icon class="profile-btn-icon">mdi-comment-text</v-icon>
            <div>{{ articleInfo.comments_count }}</div>
          </div>
          <div id="likes-count-part">
            <v-icon>mdi-heart</v-icon>
            <div>{{ articleInfo.likes_count }}</div>
          </div>
        </div>
      </div>

      <div
        v-if="isAuthor"
        id="post-edit-part"
      >
        <router-link
          :to="{ name: 'articleEdit', params: { articlePk: articleInfo.pk }}"
        >
          <div id="post-edit-btn">수정</div>
        </router-link>
        
        <div
          id="post-remove-btn"
          @click="deleteArticle(articleInfo.pk)"
        >삭제</div>
      </div>
    </section>

    <section id="post-body-section">
      <div
        id="movie-poster-part"
        v-if="isReview"
      >
        <img :src="posterSrc" alt="movie poster image">
      </div>

      <div id="movie-content-part">
        <div
          id="movie-title-part"
          v-if="isReview"
        >
          {{ articleInfo.title }} ⭐{{ articleInfo.rank}}
        </div>
        <div id="post-content">
          {{ articleInfo.content }}
        </div>
      </div>
    </section>

    <section id="like-btn-section">
      <button
        id="like-btn"
        @click="onClickLike(articleInfo.pk)"
      >
        🧡 {{ articleInfo.likes_count }} {{ likeBtnText }}
      </button>
    </section>

    <!-- 댓글 섹션 -->
    <comment-section
      :comments="articleInfo.comments"
    ></comment-section>
  </div>
</template>

<script>
import axios from 'axios';
import drf from "@/api/drf";
import { mapActions, mapGetters } from 'vuex'
import CommentSection from '@/components/community/CommentSection'
export default {
  name: "ArticleDetailView",
  components: {
    CommentSection,
  },
  data () {
    return {
      commentInputData: '',
    }
  },
  computed: {
    ...mapGetters(['articleInfo', 'authHeader',
                  'currentUser', 'currentUserProfile', 'isAuthor', 'profile']),
    articlePk() {
      return this.$route.params.articlePk
    },
    comments() {
      return this.articleInfo.comments
    },
    isReview() {
      return this.articleInfo.category==='review'
    },
    isLiked() {
      const ret = this.articleInfo.like_users.some(like_user => {
        return this.currentUser.pk === like_user.pk
      })
      return ret
    },
    likeBtnText() {
      return this.isLiked ? '좋아요 취소' : '좋아요'
    },

    username() {
      return this.articleInfo.user.username
    },

    nickname() {
      return this.articleInfo.user.profile.nickname
    },

    profileImageSrc() {
      const profile_image = this.currentUserProfile.profile_image
      console.log(profile_image)
      return `http://localhost:8000${profile_image}`
    },

    cuttedCreatedAt() {
      // const data = this.cutDate(this.articleInfo.created_at)
      // return `${data.Y}년 ${data.M}월 ${data.D}일 ${data.h}:${data.m}`
      const data = new Date(this.articleInfo.created_at)
      return data.toLocaleString()
    },

    cuttedUpdatedAt() {
      // const data = this.cutDate(this.articleInfo.updated_at)
      // return `${data.Y}년 ${data.M}월 ${data.D}일 ${data.h}:${data.m}`
      const data = new Date(this.articleInfo.updated_at)
      return data.toLocaleString()
    },

    // 영화 관련
    posterSrc() {
      const domain = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2'
      const path = this.articleInfo.movie.poster_path
      return domain + path
    },
  },

  methods: {
    ...mapActions(['setArticleInfo', 'deleteArticle', 'setArticleInfo', 'cutDate']),
    // 좋아요 버튼 누르면 호출
    onClickLike(articlePk) {
      axios({
        method: "post",
        url: drf.community.articleLike(articlePk),
        headers: this.authHeader,
        data: {}
      })
      .then((res) => {
        this.$store.commit("SET_ARTICLE_INFO", res.data);
      })
      .catch(err => {
        console.error(err.data)
      })
    },
  },
  created() {
    this.setArticleInfo(this.articlePk)
  },
}
</script>

<style lang="scss" scoped>
#article-detail-section {
  @include flex-gap(column, 1);
  @include f-5;
  margin: 2em;
  padding: 2em;
  border: 1px solid white;
  border-radius: 10px;


  #post-header-section {
    @include flex-gap(column, 1);

    #post-title-part {
      @include flex-gap(row, 1);
      align-items: flex-end;
      border-bottom: 1px solid white;
      padding-bottom: .5em;

      #post-title {
        @include f-2;
      }

      #post-number {
        color: darken(white, 0.1);
        padding: .2em;
      }
    }

    #user-info-part {
      @include flex-gap(row, 1);

      #user-profile-image {
        width: 2em;
        aspect-ratio: 1/1;
        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        .img {
          flex-shrink: 0;
          min-width: 100%;
          min-height: 100%;
        }
      }

      // #user-username {

      // }
    }

    #post-info-part {
      @include flex-gap(column, .5);
      @include f-6;

      #post-created-at-part {
        @include flex-gap;
        @include icon-size;
      }

      #post-updated-at-part {
        @include flex-gap;
        @include icon-size;
      }

      #post-count-part {
        @include flex-gap;

        #comments-count-part {
          @include flex-gap;
          @include icon-size;
        }

        #likes-count-part {
          @include flex-gap;
          @include icon-size;
        }
      }

      #post-edit-part {
        @include flex-gap;

        #post-edit-btn {
          display: inline;
          border: 1px solid white;
          border-radius: 20px;
          padding: .3em 1em;
        }

        #post-remove-btn {
          @include pt-btn2;
        }
      }
    }

  }

  #post-body-section {
    @include flex-gap(row, 1);

    #movie-poster-part {
      width: 2000px;
      flex-shrink: 1;

      img {
        flex-shrink: 0;
        min-width: 100%;
        max-width: 100%;
      }
    }
    #post-content-part {
      @include flex-gap(column, 1);
      border-bottom: 1px solid white;
      padding-bottom: 1em;
      width: 4000px;
      flex-shrink: 1;

      #movie-title-part {
        @include f-1;
      }

      // #post-content {}
    }
  }

  #like-btn-section {
    @include flex-gap;
    justify-content: center;

    #like-btn {
      @include blank-btn1;
      border-color: $dm-pt-color1;
      width: 10em;
    }
  }
}
</style>