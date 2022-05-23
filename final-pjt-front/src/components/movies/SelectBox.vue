<template>
  <div> 
    <p style="display: inline;">
      <input type="checkbox" name="genre" :value="genre.id" 
      @change="onCheck"
      :checked="isChecked"
      >
      {{genre.name}}
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SelectBox',
  data() {
    return {
    }
  },
  props: {
    genre: Object,
  },
  methods: {
    ...mapActions(['changeSelectedGenres']),
    onCheck (event) {
      this.changeSelectedGenres(event.target.value)
    }
  },
  computed: {
    ...mapGetters(['selectedGenres']),
    isChecked() {
      return this.selectedGenres.some((id) => {
        return id == this.genre.id // 둘이 형식이 다른가? 지금 너무 생각하기가 싫음..
      })
    }
  },
}
</script>

<style>

</style>