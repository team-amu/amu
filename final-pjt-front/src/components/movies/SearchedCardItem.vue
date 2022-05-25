<template>
  <div>
  
    <!-- <div class="card">
      <div class="card__image">
        <img :src="posterSrc" alt="">

        <div class="card__overlay card__overlay--black">
          <div class="card__overlay-content">
            <ul class="card__detail">
              <p v-for="genre in movie.genres" :key="genre.id"> {{genre.name}}</p>
              <p> {{movie.release_date}}</p>
            </ul>

            <h2 class="title">{{ movie.title }}</h2>

            <ul class="card__detail card__detail--last">
              <li>⭐ {{ movie.vote_average}}</li>
            </ul>
          </div>
        </div>

      </div>
    </div> -->

    <div class="card">
      <div class="poster-section">
        <div class="poster-overlay"></div>
        <div class="poster-shadow"></div>
        <div class="poster">
          <img :src="posterSrc" alt="포스터">
        </div>
      </div>
      <div class="detail">
        <div class="up-title">
          <div class="title">{{ movie.title }}</div>
          <div class="rank">⭐{{ movie.vote_average }}</div>
        </div>
        <div class="sub-detail">
          <div class="release-date">({{ movie.release_date.substring(0,4) }})</div>
          <div class="genres">
            <div v-for="genre in movie.genres" :key="genre.id"
              class="genre">
              {{genre.name}}
            </div>
          </div>
        </div>
        <div class="overview">{{ movie.overview }}</div>
        
      </div>
    </div>

</div>
</template>

<script>
export default {
  name: 'SearchedCardItem',
  props: { movie: Object },
  computed: {
    posterSrc () {
      return `https://image.tmdb.org/t/p/w600_and_h900_bestv2${this.movie.poster_path}`
    },
  }
}
</script>

<!-- <style lang="scss" scoped>

// Color Variables
$black: #000000;

$body-font-family: "Lato";
$header-font-family: "Montserrat";

img {
  height: auto;
  max-width: 100%;
}

.card__image {
  border-radius: 30px;
  display: block;
  min-height: 240px; 
  overflow: hidden;
  position: relative;

  > img {
    display: block;
    margin-bottom: 0;
    transition: all .25s ease-in-out;
  }

  &:hover > img {
    transform: scale(1.2);
  }

  box-shadow: 3px 2px 20px 1px rgba(0, 0, 0, 0.781);
}

.card__overlay {
  display: block;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  width: 100%;
  z-index: 1;
}

.card__overlay--black {
  background-image: linear-gradient(to bottom, rgba($black, 0.01), rgba($black, 0.6));
  z-index: 2;
}

.card__overlay-content {
  position: absolute;
  bottom: 0;
  padding: 1.5em;
  z-index: 3;
}

.card__detail {
   
  li {
    color: #f8f8f8;
    display: inline;
    list-style-type: none;
    padding-right: 0.5em;
    font-size: 1em;
    letter-spacing: 1px;
  }

}

.title {
  &:hover {
    color: rgba(rgb(247, 181, 0), 0.7);
    text-decoration: none;
  }
}

</style> -->

<style lang="scss" scoped>

  .card {
    background-color: #e6e6e6;

    border-radius: 15px;
    display: block;
    width: 95%;
    height: 20vh;
    border: 2px solid black;
    display: flex;
    flex-direction: row;
    position: relative;
    margin: 1rem auto;
    transition: all .4s ease-in-out;
  
  .poster-section {

    .poster-overlay{
      border-radius: 15px;
      width: 28%;
      height: 100%;
      border: 3px solid black;
      position: absolute;
      top: -13%;
      left: 5%;
      background-color: $dm-pt-color2;
      opacity: 0.1;
      z-index: 2;
    }
  
    .poster-shadow {
      border-radius: 15px;
      width: 28%;
      height: 100%;
      position: absolute;
      top: -13%;
      left: 5%;
      box-shadow: 5px 5px 10px 1px $dm-nav-color;
      opacity: 0.4;
      z-index: 0;
    }
  
    .poster {
      border-radius: 15px;
      width: 28%;
      height: 100%;
      position: absolute;
      top: -13%;
      left: 5%;
      overflow: hidden;
    }
    .poster > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &.card:hover {
    transform: scale(1.1);
    .poster-overlay {
      border-radius: 15px;
      width: 28%;
      height: 100%;
      border: 5px solid black;
      position: absolute;
      top: -13%;
      left: 5%;
      background-color: $dm-pt-color2;
      opacity: 0;
      z-index: 2;
    }
    background-color: white;
  }

  .detail {
    margin-left: 38%;
    width: 57%;
    height: 93%;
    margin-top: 2%;


    .up-title {
      display: flex;
      
      .title {
        @include f-3;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        line-height: 1.5;
        overflow: hidden;
        color: $dm-bg-color1;
      }

      .rank {
        @include f-6;
        font-weight: 500;
        padding-top: 0.3rem;
        padding-left: 0.1rem;
        color: $dm-bg-color1;
      }
    }

    .sub-detail {
      display: flex;
      .release-date {
        padding-left: 0.2rem;
        @include f-6;
        font-weight: 600;
        color: $dm-bg-color1;
        margin-right: 0.5rem;
      }

      .genres {
        display: flex;
        flex-wrap: wrap;
        @include f-8;
        color: $light-gray;
        font-weight: 300;
        .genre {
          padding-top: 3px;
          padding-bottom: 0px;
          background-color: $dm-bg-color1;
          border-radius: 5px;
          margin-right: 0.3rem;
          letter-spacing: 2px;
        }
      }
    }

    .overview {
      @include f-7;
      margin-top: 0.5rem;
      font-weight: 500;
      padding-top: 0.4rem;
      color: $dm-bg-color1;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      line-height: 1.5;
      overflow: hidden;
      letter-spacing: 1px;
    }
  }

  box-shadow: 5px 5px 10px 1px $dm-nav-color;
}

</style>