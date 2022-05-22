<template>
<div>
  <!-- 라우터 링크를 밖에 넣어야 하나? -->
  <div id="movieCard">
    <img :src="profileSrc" alt="profile" class="movie-poster">
    <span>{{ actor.name }}</span>
  </div>
</div>
</template>

<script>


export default {
  name: "CardItem",
  data() {
    return {
    }
  },
  props: {
    actor: Object,
  },
  computed: {
    profileSrc () {
      return `https://image.tmdb.org/t/p/w600_and_h900_bestv2${this.actor.profile_path}`
    },
  },
  created() {
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

</style>