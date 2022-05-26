<template>
<div>
  <div id="actor-profile-image" @click="onClick(actor.actor.name)">
    <img :src="profileSrc" alt="profile" class="color-rotation">
    <div class="actor-overlay">
      <p>{{ actor.character }} </p>
      <p>{{ actor.actor.name }}</p>
    </div>
  </div>
</div>
</template>

<script>

import router from "@/router";
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
      return `https://image.tmdb.org/t/p/w600_and_h900_bestv2${this.actor.actor.profile_path}`
    },
  },
  methods: {
      onClick(name) {
        router.push({ name: 'movieSearch', params: { searchPage: '1' }, query: {searchKeywords: name, 
        type: 'actor', genres: '', minRank: 0, sort: '-release_date'}})
    },
  },
  created() {
  }

}
</script>

<style lang="scss" scoped>


#actor-profile-image {
  @include flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 1px solid $dm-bg-color1;
  box-shadow: 5px 5px 10px 1px $dm-nav-color;
  width: 150px;
  flex-shrink: 1;

  img {
    flex-shrink: 0;
    min-width: 100%;
    max-width: 100%;
  }
}

.actor-overlay {
  @include flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  border-radius: 50%;

  width: 150px;
  flex-shrink: 1;
  position: absolute;
  background-color: transparent;
  transition: all .4s ease-in-out;
  opacity: 0.5;
  
  p {
    @include f-5;
    margin-bottom: -0.05rem;
    margin-top: 0.2rem;
    text-align: center;
    color: transparent;
  }

  &:hover {
    background-color: black;

    p {
      color: white;
    }
  }
}



</style>