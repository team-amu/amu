<template>
  <div>
    
    <div class="filter-sort-section">
      <div class="filter-box">
        <select v-model="sort" @change="sortChange">
          <option value="-release_date">최신 순</option>
          <option value="release_date">오래된 순</option>
          <option value="-vote_average">평점 순</option>
          <option value="vote_average">평점 낮은 순</option>
          <option value="title">제목 오름차순</option>
          <option value="-title">제목 내림차순</option>
        </select>
      </div>

        
      <div class="rank-box">

        <div class="title">평점</div>
        <hr>
        <div class="rank">
          <input class="rank-input" @change="onChange" 
          type="number" min="0" max="10"
          step="1" placeholder="최소" v-model="rank"
        />
          <v-icon class="down" @click="onDown">mdi-chevron-down</v-icon>
          <v-icon class="up" @click="onUp">mdi-chevron-up</v-icon>
        </div>
      </div>

      <hr>

      <div class="genres-box">
        <div class="title">장르</div>
        <hr>
        <div class="genre">
          <span v-for="genre in genres" :key="genre.id">
          <genres-select-box :genre="genre" style="display: inline;"></genres-select-box>
        </span>
        </div>
      </div>
    </div>
    
  </div>

</template>

<script>
import GenresSelectBox from '@/components/movies/GenresSelectBox.vue'
import { mapGetters } from 'vuex'
export default {
  name: "FilterSortSection",
  components: { GenresSelectBox },
  props: {
    genres: Array
  },
  data() {
    return {
      rank : null,
      sort: this.sortKeyword
    }
  },
  computed: {
    ...mapGetters(['minRank', 'sortKeyword'])
  },
  methods: {
    onChange(event) {
      this.rank = event.target.value
      this.bindNumber(this.rank)
    },
    bindNumber(value) {
      this.$store.commit('SET_MIN_RANK', value)
    },
    sortChange(event) {
      this.sort = event.target.value
      this.$store.commit('SET_SORT_KEYWORD', this.sort)
    },
    onUp() {
      if (parseInt(this.minRank) >= 10) {
        return 
      } else {
        this.rank = parseInt(this.minRank) + 1
        this.bindNumber(this.rank)
      }
    },
    onDown() {
      if (parseInt(this.minRank) <= 0) {
        return
      } else {
        this.rank = parseInt(this.minRank) - 1
        this.bindNumber(this.rank)
      }
    }
  },
  created() {
    this.sort = this.sortKeyword
  }
}
</script>

<style lang="scss" scoped>

.filter-sort-section {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;;
  width: 100%;
  height: 100%;

  position: relative;

  .filter-sort-section-overlay {
    content: "";
    background-color: rgb(173, 20, 20);
    border: 1px solid white;
    width: 100%;
    height: 100%;
  }

  .filter-box {
    @include select-style1;
    display: flex;
    justify-content: center;
    select {
      @include f-5;
      width: 100%;
      background-color: #fff;
      color: $dm-bg-color1;
      font-weight: 600;
      letter-spacing: 1px;
    }
    select::-ms-expand { 
      display: none;
    }
    .select {
      -o-appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
  }

  .rank-box {

    .title {
      @include f-3;
      color: $dm-pt-color1;
    }

    .input {
      @include input-style1;
      width: 100px;
      border: 1px solid white;
    }

    // @media screen and (max-width: 768px) {
    //   flex-direction: column;
    // }

    .rank {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: space-evenly;

      .up {
        color: white;

        &:hover {
          color: $dm-pt-color1;
        }
      }
      .down {
        color: white;

        &:hover {
          color: $dm-pt-color1;
        }
      }
    }
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .genres-box {
    display: flex;
    flex-direction: column;
    word-break:break-all;
    margin-top: 0.5rem;
    .title {
      color: $dm-pt-color1;
      @include f-3;
    }
  }
}
</style>