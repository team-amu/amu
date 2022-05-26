<template>
<div>

  <router-link
  :to="{name: 'movieDetail', params: {moviePk: movie.id}}">
    <div class="card">
      <img :src="posterSrc" :alt="`${movie.title}포스터`">
    </div>
  </router-link>

  <!-- 라우터 링크를 밖에 넣어야 하나? -->
  <!-- <router-link
    :to="{ name: 'movieDetail', params: {moviePk: movie.id}}">
    <div id="movieCard">
      <img :src="posterSrc" alt="poster" class="movie-poster">
      <div id="titleSection">
        <span id="score">{{ movie.vote_average }}</span>
        <span id="title">{{ movie.title }}</span>
      </div>
    </div>
  </router-link> -->
</div>
</template>

<script>
export default {
  name: "CardItem",
  props: {
    movie: Object,
  },
  computed: {
    posterSrc () {
      return `https://image.tmdb.org/t/p/w600_and_h900_bestv2${this.movie.poster_path}`
    },
  }

}
</script>

<style lang="scss" scoped>

  .card {
    width: 20vh;
    height: 28vh;
    border-radius: 10px;
    outline: 1px solid rgba(255, 255, 255, .5);
    outline-offset: -8px;
    box-shadow: 5px 5px 10px 1px $dm-nav-color;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: end;

    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: .6;
      transition: transform .75s;
    }

    &:hover img{
      transform: scale(1.15);
      opacity: .9;
    }
  }


</style>