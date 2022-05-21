<template>
  <div>
    <h1>Home</h1>
    <hr>
    <search-bar-section></search-bar-section>
    <hr>
    <h2>최근 HOT한 영화 </h2>
    <card-list></card-list>
    <h2>친구가 좋아하는 영화</h2>
    <card-list></card-list>
    <h2>흠?!</h2>
    <card-list></card-list>
  </div>
</template>

<script>
import CardList from '@/components/movies/CardList.vue'
import SearchBarSection from '@/components/movies/SearchBarSection.vue'

export default {
  name: "HomeView",
  components: { CardList, SearchBarSection },
  data () {
    return {}
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>

</style>

