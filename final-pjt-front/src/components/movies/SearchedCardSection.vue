<template>
  <div>
    <ul>
      <span v-for="searchedMovie in searchedMovies" :key="searchedMovie.id">
        <router-link :to="{ name: 'movieDetail', params: {moviePk: searchedMovie.id}}">
          <div class="grid">
            <searched-card-item :movie="searchedMovie"></searched-card-item>
          </div>
        </router-link>
      </span>
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

<style lang="scss" scoped>
// Basic Grid for Demo;
.grid {
  float: none;
  width: 100%;
  padding-left: 0.5em;
  // padding-bottom: 0.4em;

  @media screen and (min-width: 1024px) {
    float: left;
    width: 50%;
  }
}
</style>