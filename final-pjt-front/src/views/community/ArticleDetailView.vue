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
    <section id="commentSection">
      <form
        @submit.prevent="createComment"
      >
      <textarea
        v-model="commentInputData"
        name="commentInput"
        id="commentInput"
        placeholder="댓글 작성..."
        ></textarea>
      <br>
      <button>등록</button>
      </form>
      <hr>
      댓글 {{ articleInfo.comments_count }}
      <hr>
      <comment-item
        v-for="comment in comments"
        :key="comment.pk"
        :comment="comment"
      ></comment-item>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import drf from "@/api/drf";
import { mapActions, mapGetters } from 'vuex'
import CommentItem from '@/components/community/CommentItem'
export default {
  name: "ArticleDetailView",
  components: {
    CommentItem,
  },
  data () {
    return {
      commentInputData: '',
    }
  },
  computed: {
    ...mapGetters(['articleInfo', 'authHeader', 'currentUser']),
    isReview() {
      return this.articleInfo.category==='review'
    },
    comments() {
      return this.articleInfo.comments
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
    ...mapActions(['setArticleInfo']),
    createComment() {
      axios({
        method: "post",
        url: drf.community.commentCreate(this.articleInfo.pk),
        headers: this.authHeader,
        data: { content: this.commentInputData }
      })
      .then(() => {
        this.$router.go(this.$router.currentRoute);
      })
      .catch(err => {
        console.error(err.data)
      })
    },
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
    const articlePk = this.$route.params.articlePk
    this.setArticleInfo(articlePk)
  }
}
</script>

<style>

</style>