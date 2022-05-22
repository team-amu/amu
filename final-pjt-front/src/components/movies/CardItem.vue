<template>
<div>
  <!-- 라우터 링크를 밖에 넣어야 하나? -->
  <router-link
    :to="{ name: 'movieDetail', params: {moviePk: movie.id}}">
    <div id="movieCard">
      <!-- {{ movie }} -->
      <img :src="posterSrc" alt="poster" class="movie-poster">
      <div id="titleSection">
        <span id="score">{{ score }}</span>
        <span id="title">{{ movie.title }}</span>
      </div>
    </div>
  </router-link>
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

<style>
/* 예전에 승훈이가 만들어 놓은 것 임의로 가져옴~ */
#movieCard {
  width: 10%;
  height: auto;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color:whitesmoke;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 3px;
  padding: 3px;
  box-shadow: 2px 2px 4px lightgray;
}

.movie-poster {
  width: 100%;
  margin: 0 auto 10px auto;
}

#score {
  padding: 3px 5px;
  margin: 5px;
  background-color: lightsalmon;
  border-radius: 5px;
}

#titleSection {
  text-align: center;
  height: 3em;
  
}

#title {
  font-weight: bold;
  font-size: 0.9em;
}

</style>