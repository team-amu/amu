<template>
  <div>
    <h1>{{ articleInfo.title }}</h1>
    <h2>#{{ articleInfo.pk }}</h2>
    작성자 : {{ articleInfo.user.username}}
    <hr>
    생성 시간 : {{ articleInfo.created_at }} | 
    댓글 : {{ articleInfo.comments_count }} |
    좋아요 : {{ articleInfo.likes_count }}
    <hr>
    <div v-if="isReview">
      <img :src="posterSrc" alt="포스터 사진"> <br>
      {{ articleInfo.rank}}
    </div>
    <hr>
    내용
    <hr>
    {{ articleInfo.content }}
    <hr>
    <button>좋아요</button>
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
    ...mapGetters(['articleInfo', 'authHeader']),
    isReview() {
      return this.articleInfo.category==='review'
    },
    comments() {
      return this.articleInfo.comments
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