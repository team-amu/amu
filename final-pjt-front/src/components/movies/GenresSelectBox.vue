<template>
  <div>
      <!-- <div class="genres-box">
        <input type="checkbox" name="genre" :id="genre.id" 
        class="check-box"
        @change="onCheck"
        :value="genre.id" 
        :checked="isChecked"
        >
        <label :for="genre.id">{{genre.name}}</label>
      </div> -->

    <div class="box">
      <label>
        <input type="checkbox" name="genre" :id="genre.id"
        @change="onCheck"
        :value="genre.id"
        :checked="isChecked"
        />
        <span class="checkbox"></span>
      </label>
        <button @click.prevent="onClick(genre)">{{genre.name}}</button>
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
    },
    onClick(genre) {
      this.changeSelectedGenres(genre.id)
    }
  },
  computed: {
    ...mapGetters(['selectedGenres']),
    isChecked() {
      return this.selectedGenres.some((id) => {
        return id == this.genre.id // 둘이 형식이 다른가? 지금 너무 생각하기가 싫음..
      })
    },
  },
}
</script>

<style lang="scss" scoped>

.box {
  margin-top: 0.5em;
  display: flex;
  flex-direction: row;
  width: 8rem;
  height: 2rem;
  justify-content: start;

  button {
    margin-top: -0.5rem;
    display: inline;
  }
}

label {
  display: block;
  width: 22px;
  height: 22px;
  cursor: pointer;
  margin-right: 0.5rem;
}

input {
  position: absolute;
  display: none;
  transition: scale(0);
}

input:checked ~ .checkbox {
  transform: rotate(40deg);
  width: 11px;
  margin-left: 5px;
  border-color: $dm-pt-color1;
  border-top-color: transparent;
  border-left-color: transparent;
  border-radius: 0;
}

.checkbox {
  display: block;
  width: inherit;
  height: inherit;
  border: 2px solid white;
  border-radius: 6px;
  transition: all 0.375s;
}

</style>