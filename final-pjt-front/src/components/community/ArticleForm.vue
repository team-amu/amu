<template>
  <div>
    <h2>게시글 작성</h2>
    <form
      id="article-form"
      @submit.prevent="onSubmit"
    >
      <section id="article-title-section">
        <select
          v-model="formData.category"
          name="categorySelect"
          id="article-category-select"
          @change="onChangeCategory"
        >
          <option value="review" selected>영화게시판</option>
          <option value="free">자유게시판</option>
        </select>
        <input
          v-model="formData.title"
          type="text"
          id="article-title-input">
      </section>

      <!-- 영화 제목 검색창 -->
      <search-bar-section
      @click="onSearch"
      class="movie-search-part"
      ></search-bar-section>

    <!-- 영화 제목 검색 결과 드롭다운 -->
      <div
        v-if="isKeywordsMovie && !isSelect"
        id="searched-title-part"
      >
        <ul>
          <button v-for="movie in keywordMovies" :key="movie.id" 
          @click.prevent="selectMovie(movie)"
          style="display: block;"
          >
              {{ movie.title }}
          </button>
        </ul>
      </div>  

      <section v-if="isReview" id="movie-info-section">
        <div id="movie-info-part">
          <!-- 영화 제목 결과창 -->
          <input
            disabled
            v-model="movieTitle"
            id="movie-title-part"
            type="text"
          >

          <v-rating
            background-color="grey lighten-2"
            color="red lighten-3"
            :empty-icon="$mdiStarOutline"
            :full-icon="$mdiStar"
            :half-icon="$mdiStarHalfFull"
            half-increments
            hover
            length="5"
            size="30"
            v-model="formData.rank"
            @input="addRating($event, rating.id)"
          ></v-rating>
        </div>    
      </section>

      <textarea
        v-model="formData.content"
        id="article-content-input"
        placeholder="내용">
      </textarea>

      <section id="btn-section">
        <button class="btn" @click.prevent="goBackCheck">이전</button>
        <button class="btn">완료</button>
      </section>
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
    ...mapActions(['createArticle', 'updateArticle', 'goBackCheck']),
    addRating(value, id){
      id
      this.formData.rank = Number(value)*2;
    },
    onSubmit() {
      this.formData.rank = Number(this.rank1)*2;
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
    },
  },
  computed: {
    ...mapGetters(['isReview', 'isKeywordsMovie', 'keywordMovies', 'searchKeywords']),
    isReview() {
      return this.formData.category === 'review'
    },
    isSelect() {
      return this.movieTitle === this.searchKeywords
    },
    rank1() {
      return this.formData.rank
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

<style lang="scss" scoped>
#article-form {
  @include f-5;
  @include flex-gap(column, 1.5);
  color: white;

  #article-title-section {
    @include flex-gap(row, 0.5);

    #article-category-select {
      @include select-style2;
      @include f-5;
      background-color: white;
      border-radius: 10px;
      margin: 0;
      
      color: $dm-bg-color1;
      text-align: center;

    }

    #article-title-input {
      @include input-style1;
      margin: 0;
    }
  }

  #movie-info-section {
    @include flex-gap(column, 0.5);

    #movie-info-part {
      @include flex-gap(row, 0.5);

      #movie-title-part {
        @include input-style1;
        background-color: mix($dm-bg-color1, white, 90%);
        color: white;
        margin: 0;
        flex-shrink:1;
        width: 2000px;
      }
    }
  }

  #searched-title-part{
      @include searched-box;
    }

  #article-content-input {
    background-color: white;
    border-radius: 10px;
    padding: 1em;
    outline: none;
    width: 100%;
    @include wh-ratio(16, 5);
    @include f-5;

    @media only screen and (max-width:768px){
      @include wh-ratio(1, 1);
    }
    @media only screen and (max-width:465px){
      @include wh-ratio(5, 16);
    }
  }

  #btn-section {
    @include flex-gap(row, 0.5);
    justify-content: flex-end;

    .btn {
      @include pt-btn1;
      width: 10%;
      padding: 0.4em;
    }
  }
}

.test {
  background-color: white;
  color: black;
}

</style>