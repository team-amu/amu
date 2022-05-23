<template>
  <router-link
  :to="{ name: 'movieDetail',
          params: { moviePk: content.id } }">
    <div class="profileMoviePoster">
      <!-- <img
        :src="posterSrc"
        :alt="content.title"
        class="profile-poster"
      > -->
      {{ content.poster_path }}
      <br>
      <h4 class="profile-poster-title">{{ content.title }}</h4>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "ProfileLikedMovieItem",
  data () {
    return {}
  },
  props: {
    content: Object
  },
  methods: {},
  computed: {
    posterSrc () {
      const host = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/'
      return `${host}${this.content.poster_path}`
    }
  },
}
</script>

<style>
.profileMoviePoster {
  display: inline-block;
  border: 1px solid black;
}

.profile-poster {
  width: 300px;
}

.profile-poster-title {
  text-align: center;
}
</style>