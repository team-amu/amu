<template>
  <div>
    <h3>
      FilterSortSection
    </h3>

    <h4>장르 선택</h4>
      <span v-for="genre in genres" :key="genre.id">
        <select-box :genre="genre" style="display: inline;"></select-box>
      </span>
    
    <h4>최소 평점</h4>
    <input style="background-color: tomato;" @change="bindNumber" 
    :value="minRank" type="number" min="0" max="10"
    step="1"
    />
  </div>
</template>

<script>
import SelectBox from '@/components/movies/SelectBox.vue'
import { mapGetters } from 'vuex'
export default {
  name: "FilterSortSection",
  components: { SelectBox },
  props: {
    genres: Array
  },
  data() {
    return {
      rank : this.minRank
    }
  },
  computed: {
    ...mapGetters(['minRank'])
  },
  methods: {
    bindNumber(event) {
      console.log(event.target.value)
      this.rank = event.target.value
      this.$store.commit('SET_MIN_RANK', this.rank)
    }
  },
  created() {
    this.rank = this.minRank
  }
}
</script>

<style>

</style>