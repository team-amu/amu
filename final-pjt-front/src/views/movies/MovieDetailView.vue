<template>
  <div>
    <h1>MovieDetailView</h1>
    <!-- 일단 카드 아이템으로 썼는데 달라질듯?? -->
    <card-item :movie="movieDetail" style="display: inline;"></card-item>
    {{ movieDetail}}
  </div>
</template>

<script>
// import  from '@/components//.vue'
import { mapActions, mapGetters } from 'vuex'
import CardItem from '@/components/movies/CardItem.vue'

export default {
  name: "MovieDetailView",
  components: { CardItem },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['movieDetail'])
  },
  methods: {
    ...mapActions(['fetchMovieDetail'])
  },
  watch: {
  // 이 조건은 구글링 하다가 찾았는데 아직 잘 모름 일단 넣어놈,,
    immediate: true,
    $route: {
      handler() {
        this.fetchMovieDetail(this.$route.params.moviePk)
      }
    }
  },
  created() {
    this.fetchMovieDetail(this.$route.params.moviePk)
  }
}
</script>

<style>

</style>