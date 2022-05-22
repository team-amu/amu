<template>
  <div>
    <h1>Home</h1>
    
    <hr>
    <search-bar-section></search-bar-section>
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

export default {
  name: "HomeView",
  components: { CardList, SearchBarSection },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['hotMovie', 'likeMovie', 'bookmarkMovie']),
  },
  methods: {
    ...mapActions(['fetchHotMovie', 'fetchLikeMovie', 'fetchBookmarkMovie', ]),
  },
  watch: {
    // 이 조건은 구글링 하다가 찾았는데 아직 잘 모름 일단 넣어놈,,
    immediate: true,
    // 프로필을 가져와서 바뀌었으면 isRightProfile 조건 true로 바꿔서 랜더링하게!
    // hotMovie: {
    //   handler() {
    //   this.fetchHotMovie()
    //   }
    // },
    // likeMovie: {
    //   handler() {
    //   this.fetchLikeMovie()
    //   }
    // },
    // bookmarkMovie: {
    //   handler() {
    //   this.fetchBookmarkMovie()
    //   }
    // },
  },
  created() {
     this.fetchHotMovie()
     this.fetchLikeMovie()
     this.fetchBookmarkMovie()
  },
}
</script>

<style>

</style>

