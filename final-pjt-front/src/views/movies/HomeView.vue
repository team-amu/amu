<template>
  <div>
    <h1>Home</h1>
    
    <hr>
    <search-bar-section
    @input-change="inputChange"
    @on-select="onSearch"
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
    
    <h2>최근 HOT한 영화 </h2>
    <card-list :movies="hotMovie"></card-list>
    
    <h2>팔로우한 사람들이 좋아하는 영화</h2>
    <card-list :movies="likeMovie"></card-list>
    
    <h2>팔로우한 사람들이 북마크한 영화</h2>
    <card-list :movies="bookmarkMovie"></card-list>
  </div>
</template>

<script>
import CardList from '@/components/movies/CardList.vue'
import SearchBarSection from '@/components/movies/SearchBarSection.vue'
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import drf from "@/api/drf"

export default {
  name: "HomeView",
  components: { CardList, SearchBarSection },
  data () {
    return {
      inputValue: null,
      searchedOutputs: null,
      type: '',
    }
  },
  computed: {
    ...mapGetters(['hotMovie', 'likeMovie', 'bookmarkMovie']),
  },
  methods: {
    ...mapActions(['fetchHotMovie', 'fetchLikeMovie', 'fetchBookmarkMovie', ]),
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
    // onSearch: function({inputData, select}) {

    // }
  },
  watch: {
    // 이 조건은 구글링 하다가 찾았는데 아직 잘 모름 일단 넣어놈,,
    immediate: true,
  },
  created() {
    this.fetchHotMovie()
    this.fetchLikeMovie()
    this.fetchBookmarkMovie()
  },
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

