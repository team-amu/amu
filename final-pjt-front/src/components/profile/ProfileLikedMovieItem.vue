<template>
  <router-link
  :to="{ name: 'movieDetail',
          params: { moviePk: content.id } }"
  class="movie-card-item"
  >
    <img
      class="movie-poster"
      :src="posterImageSrc"
    >
    <div class="movie-title">{{ content.title }}</div>
  </router-link>
</template>

<script>
export default {
  name: "ProfileLikedMovieItem",
  data () {
    return {
    }
  },
  props: {
    content: Object
  },
  methods: {},
  computed: {
    posterImageSrc() {
      const host = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2'
      return `${host}${this.content.poster_path}`
    }
  },
}
</script>

<style lang="scss" scoped>
.movie-card-item {
  @include movie-card-item;
}
</style>