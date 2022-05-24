<template>
  <div>

    <v-container>
      <v-row>
        <v-col cols="10">          
          <input type="text" 
          @input="inputChange"
          @keyup.enter="onSearch"
          :value="keywords"
          >
        </v-col>
        <v-col cols="2">
          <button @click="onSearch">검색</button>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "SearchBarSection",
  data() {
    return {
      keywords: this.searcKeywords,
    }
  },
  props: {

  },
  methods: {
    ...mapActions(['fetchKeywordMovie']),
    inputChange: function (event) {
      const data = {
        searchKeywords : event.target.value,
        type : this.type
      }
      this.fetchKeywordMovie(data)
      this.$store.commit('SET_SEARCH_KEYWORDS', event.target.value)
    },
    onSearch: function () {
      this.$emit('on-search')
    }
  },
  computed: {
    ...mapGetters(['type', 'searchKeywords', 'selectedGenres', 'minRank', 'sortKeyword']),
  },
  created() {
    this.keywords = this.searchKeywords
  }
}
</script>

<style scoped>
  input[type="text"] {
    width: 100%;
    border: 1px solid white;
  }
</style>