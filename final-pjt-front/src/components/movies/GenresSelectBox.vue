<template>
  <div>

    <div class="genres-box">
      <input type="checkbox" name="genre" 
      class="check-box"
      @change="onCheck"
      :value="genre.id" 
      :checked="isChecked"
      >
      {{genre.name}}
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'GenresSelectBox',
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

<style lang="scss" scoped>

.genres-box {
  @include f-5;

  .check-box {

  }

}

</style>