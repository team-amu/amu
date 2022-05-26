<template>
  <div>

    <div>
      <card-item 
        v-for="movie in movies" 
        :key="movie.id" 
        :movie="movie"
        style="display: inline;"
      ></card-item>
    </div>

  </div>
</template>

<script>
import CardItem from '@/components/movies/CardItem.vue'

export default {
  components: { CardItem },
  name: "CardList",
  props: {
    movies: Array,
  },
  computed: {
    check() {
      return typeof(this.movies)
    }
  }
}
</script>

<style>
</style>