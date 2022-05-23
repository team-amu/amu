<template>
  <div>
    <h1>MovieSearchView</h1>
    <search-bar-section
    @input-change="inputChange"
    @on-search="onSearch"
    :searchWord="searchWord"
    ></search-bar-section>
    <!-- 박스 회색이 계속 보이는거 수정하기! 검색에 커서 갔을 때만!!-->
    <div class="searched-box">
      <ul>
        <li v-for="searchedOutput in searchedOutputs" :key="searchedOutput.id">
          <span v-if="type==='title'">
            {{ searchedOutput.title }}
          </span>
          <span v-if="type==='actor'">
            {{ searchedOutput.name }}
          </span>
        </li>
      </ul>
    </div>
    
    <hr>
    <h3 v-if="isTitle">검색된 영화 결과</h3>
    <h3 v-if="isActor">해당 영화 배우가 출연한 영화</h3>
    <ul>
      <li v-for="searchedMovie in searchedMovies" :key="searchedMovie.id">
        {{ searchedMovie }}
      </li>
    </ul>

  </div>
</template>

<script>
import axios from 'axios'
import drf from "@/api/drf"
import SearchBarSection from '@/components/movies/SearchBarSection.vue'
import { mapActions, mapGetters } from 'vuex'
import router from "@/router";

export default {
  name: "MovieSearchView",
  components: { SearchBarSection },

  data () {
    return {
      inputValue: null,
      searchedOutputs: null,
      searchWord: this.$route.query.searchWord,
      type: this.$route.query.type,
      isTitle: '',
      isActor: '',
    }
  },
  computed: {
    ...mapGetters(['searchedMovies'])
  },
  methods: {
      ...mapActions(['fetchSearchMovie']), 
      inputChange: function ({inputData, select}) {
      this.type = select
      axios({
        url: drf.movies.keywordSearch(),
        methods: "get",
        params: {
          searchWord: inputData,
          select: select
        }
      })
        .then((res) => {
          this.searchedOutputs = res.data
        })
        .catch((err) => {
          console.error(err.response.data)
        })
    },
    onSearch: function ({inputData, select}) {
      if (select === 'title') {
        this.isTitle = true
        this.isActor = false
      }
      else {
        this.isActor = true
        this.isTitle = false
      }
      router.push({ name: 'movieSearch', params: { searchPage: '1' }, query: {searchWord: inputData, type: select}})
    }
  },
  watch: {
    $route: {
      handler() {
        const payload = {
          searchPage: this.$route.params.searchPage,
          searchWord: this.$route.query.searchWord,
          select: this.$route.query.type,
        }
        this.fetchSearchMovie(payload)
        this.inputValue = this.$route.query.searchWord
        this.type = this.$route.query.type
        console.log('sdsd')
      }
    }
  },
  created() {
    const payload = {
      searchPage: this.$route.params.searchPage,
      searchWord: this.$route.query.searchWord,
      select: this.$route.query.type,
    }
    this.fetchSearchMovie(payload)
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