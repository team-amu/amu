<template>
  <div>
    <ul>
      <li v-for="searchedMovie in searchedMovies" :key="searchedMovie.id">
        <router-link :to="{ name: 'movieDetail', params: {moviePk: searchedMovie.id}}">
          <searched-card-item :movie="searchedMovie"></searched-card-item>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import SearchedCardItem from '@/components/movies/SearchedCardItem.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'SearchedCardSection',
  components: { SearchedCardItem },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['searchedMovies'])
  }
}
</script>

<style>

</style>