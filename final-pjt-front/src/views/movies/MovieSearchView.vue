<template>
  <div>
    <h1>MovieSearchView</h1>

    <search-bar-section
    @input-change="inputChange"
    ></search-bar-section>
    <!-- 박스 회색이 계속 보이는거 수정하기! 검색에 커서 갔을 때만!!-->
    <div class="searched-box">
      <ul v-for="searchedOutput in searchedOutputs" :key="searchedOutput.id">
        <router-link :to="{ name: 'movieDetail', params: { moviePk : searchedOutput.id } }" v-if="type==='title'">
          <li>
            {{ searchedOutput.title }}
          </li>
        </router-link>
        <router-link v-if="type==='actor'">
          <li>
            {{ searchedOutput.name }}
          </li>
        </router-link>
      </ul>
    </div>

    <hr>

  </div>
</template>

<script>
import axios from 'axios'
import drf from "@/api/drf"
import SearchBarSection from '@/components/movies/SearchBarSection.vue'

export default {
  name: "MovieSearchView",
  components: { SearchBarSection },
  data () {
    return {
      inputValue: null,
      searchedOutputs: null,
      type: '',
    }
  },
  computed: {
  },
  methods: {
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
          console.log(err.response.data)
        })
    },
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