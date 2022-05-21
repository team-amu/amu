<template>
  <form
    @submit.prevent="createArticle(formData)"
  >
    <label for="categorySelect">카테고리 선택</label><br>
    <select v-model="categorySelectData" name="categorySelect" id="categorySelect"><hr>
      <option value="review">영화게시판</option>
      <option value="free">자유게시판</option>
    </select><hr>
    <label for="titleInput">글 제목</label><br>
    <input v-model="titleInputData" type="text" id="titleInput" name="titleInput"><hr>
    <div v-if="isReview">
      <label for="movieInput">영화 제목</label><br>
      <input v-model="movieInputData" type="text" id="movieInput" name="movieInput"><hr>
      <label for="rankInput">평점</label><br>
      <input
        v-model="rankInputData"
        type="number"
        id="rankInput"
        name="rankInput"
        max=10 min=1 step=1>
      <hr>
    </div>
    <label for="contentInput">내용</label><br>
    <textarea v-model="contentInputData" name="contentInput" id="contentInput" placeholder="내용을 적습니다."></textarea><hr>
    <button>작성 완료</button>
  </form>
</template>

<script>
import axios from 'axios';
import drf from "@/api/drf";
import { mapGetters } from 'vuex';
export default {
  name: 'ArticleCreateForm',
  data () {
    return {
      'titleInputData': '',
      'categorySelectData': 'review',
      'contentInputData': '',
      'movieInputData': '',
      'rankInputData': 10,
    }
  },
  computed: {
    ...mapGetters(['authHeader']),
    isReview () {
      return this.categorySelectData==='review'
    }
  },
  methods: {
    // article 생성
    createArticle() {
      const formData = {
        'title': this.titleInputData,
        'category': this.categorySelectData,
        'content': this.contentInputData,
        'movie': this.movieInputData,
        'rank': this.rankInputData,
      }
      axios({
        method: "post",
        url: drf.community.articleCreate(),
        headers: this.authHeader,
        data: formData,
      })
      .then(res => {
        alert('작성이 완료되었습니다!')
        const newArticlePk = res.data.pk
        this.$router.push({ name: 'articleDetail', params: { articlePk: newArticlePk } })
      })
    }
  }
}
</script>

<style>

</style>