<template>
  <div>
    <form
      @submit.prevent="onSubmit"
    >
      <label for="categorySelect">카테고리 선택</label><br>
      <select
        v-model="formData.category"
        name="categorySelect"
        id="categorySelect"
        @change="onChangeCategory"
      ><hr>
        <option value="review" selected>영화게시판</option>
        <option value="free">자유게시판</option>
      </select><hr>
      <label for="titleInput">글 제목</label><br>
      <input v-model="formData.title" type="text" id="titleInput" name="titleInput"><hr>

      <div v-if="isReview">
        <label for="movieInput">영화 제목</label><br>
        <input v-model="movieTitle" type="text" id="movieInput" name="movieInput"><hr>
        
        <search-bar-section
        @click="onSearch"
        ></search-bar-section>
        <div class="searched-box" v-if="isKeywordsMovie && !isSelect">
          <ul>
            <button v-for="movie in keywordMovies" :key="movie.id" 
            @click.prevent="selectMovie(movie)"
            style="display: block;"
            >
                {{ movie.title }}
            </button>
          </ul>
        </div>        
        
        <hr>

        <label for="rankInput">평점</label><br>
        <input
          v-model="formData.rank"
          type="number"
          id="rankInput"
          name="rankInput"
          max=10 min=1 step=1>
        <hr>
      </div>

      <label for="contentInput">내용</label><br>
      <textarea v-model="formData.content" name="contentInput" id="contentInput" placeholder="내용을 적습니다."></textarea><hr>
      <button>작성 완료</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SearchBarSection from '@/components/movies/SearchBarSection.vue'
export default {
  name: 'ArticleForm',
  components: { SearchBarSection },
  props: {
    articleInfo: Object,
    action: String,
  },
  data () {
    return {
      movieTitle: '',
      formData: {
        'title': this.articleInfo.title,
        'category': this.articleInfo.category,
        'content': this.articleInfo.content,
        'movie': this.articleInfo.movie,
        'rank': this.articleInfo.rank,
      }
    }
  },
  methods: {
    ...mapActions(['createArticle', 'updateArticle']),
    onSubmit() {
      if (this.action === 'create') {
        // this.formData.movie = Number(this.formData.movie)
        this.createArticle(this.formData)
      } else if (this.action === 'update') {
        const payload = {
          pk: this.articleInfo.pk,
          ...this.formData
        }
        this.updateArticle(payload)
      }
    },
    onChangeCategory(event) {
      this.formData.category = event.target.value
    },
    onSearch() {
      // 원래 상세 검색 페이지로 가는데, 막아 놓음..!! 그럼 검색 버튼이 필요가 없는데 어케 없애지?
    },
    selectMovie(movie) {
      this.$store.commit("SET_SEARCH_KEYWORDS", movie.title)
      this.formData.movie = movie.id
      this.movieTitle = movie.title
    }
  },
  computed: {
    ...mapGetters(['isReview', 'isKeywordsMovie', 'keywordMovies', 'searchKeywords']),
    isReview() {
      return this.formData.category === 'review'
    },
    isSelect() {
      return this.movieTitle === this.searchKeywords
    }
  },
  created() {
    if (this.action === 'update') {
      this.movieTitle = this.formData.movie.title
      this.formData.movie = this.formData.movie.id
    }
    this.$store.commit("RESET_SEARCH")
  }
}
</script>

<style>
.searched-box {
  width: 100%;
  height: 100px;
  margin: 5px;
  background-color: silver;
  float: left;
  overflow: auto;
}
</style>