<template>
  <div>
    {{articleInfo}}
    <h1>{{ articleInfo.title }}</h1>
    <h2>#{{ articleInfo.pk }}</h2>
    작성자 : {{ articleInfo.user.username}}
    <hr>
    생성 시간 : {{ articleInfo.created_at }} | 
    댓글 : {{ articleInfo.comments_count }} |
    좋아요 : {{ articleInfo.likes_count }}
    <div v-if="isAuthor">
      <router-link
        :to="{ name: 'articleEdit', params: { articlePk: articleInfo.pk }}"
      >
        <button>수정</button>
      </router-link>
      <button @click="deleteArticle(articleInfo.pk)">삭제</button>
    </div>
    <hr>
    <!-- 영화게시판이면 poster사진이랑 평점 보이게 -->
    <div v-if="isReview">
      <img :src="posterSrc" alt="포스터 사진"> <br>
      {{ articleInfo.rank}}
      <hr>
    </div>
    
    <!-- 내용 부분 -->
    내용
    <hr>
    {{ articleInfo.content }}
    <hr>

    <!-- 좋아요 버튼  -->
    <button
      @click="onClickLike(articleInfo.pk)"
    >
    {{ articleInfo.likes_count }} {{ likeBtnText }}</button>
    <hr>

    <!-- 댓글 섹션 -->
    <comment-section :comments="articleInfo.comments"></comment-section>
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
    ...mapGetters(['articleInfo', 'authHeader', 'currentUser', 'isAuthor']),
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

    // 영화 관련
    posterSrc() {
      const domain = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2'
      const path = this.articleInfo.movie.poster_path
      return domain + path
    }
  },

  methods: {
    ...mapActions(['setArticleInfo', 'deleteArticle']),
    // 좋아요 버튼 누르면 호출
    onClickLike(articlePk) {
      axios({
        method: "post",
        url: drf.community.articleLike(articlePk),
        headers: this.authHeader,
        data: {}
      })
      .then(() => {
        this.$router.go(this.$router.currentRoute);
      })
      .catch(err => {
        console.error(err.data)
      })
    }
  },
  created() {
    this.setArticleInfo(this.articlePk)
  },
}
</script>

<style>

</style>