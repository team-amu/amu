<template>
  <div>
    <h3>
      FilterSortSection
    </h3>

    <h4>장르 선택</h4>
      <span v-for="genre in genres" :key="genre.id">
        <genres-select-box :genre="genre" style="display: inline;"></genres-select-box>
      </span>
    
    <h4>최소 평점</h4>
    <input style="background-color: tomato;" @change="bindNumber" 
    :value="minRank" type="number" min="0" max="10"
    step="1"
    />

    <select v-model="sort" @change="sortChange">
      <option value="-release_date">최신 순</option>
      <option value="release_date">오래된 순</option>
      <option value="-vote_average">평점 순</option>
      <option value="vote_average">평점 낮은 순</option>
      <option value="title">제목 오름차순</option>
      <option value="-title">제목 내림차순</option>
    </select>
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
      rank : this.minRank,
      sort: this.sortKeyword
    }
  },
  computed: {
    ...mapGetters(['minRank', 'sortKeyword'])
  },
  methods: {
    bindNumber(event) {
      this.rank = event.target.value
      this.$store.commit('SET_MIN_RANK', this.rank)
    },
    sortChange(event) {
      this.sort = event.target.value
      console.log(event.target.value)
      this.$store.commit('SET_SORT_KEYWORD', this.sort)
    }
  },
  created() {
    this.rank = this.minRank
    this.sort = this.sortKeyword
  }
}
</script>

<style>

</style>