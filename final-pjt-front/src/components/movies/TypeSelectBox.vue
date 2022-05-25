<template>
  <select
    id="type-select"
    v-model="selected"
    @change="inputChange"
  >
    <option value="title">영화제목</option>
    <option value="actor">배우</option>
  </select>    
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "TypeSelectBox",
  data() {
    return {
        selected: this.type,
    }
  },
  methods: {
      inputChange: function () {
        this.$store.commit('SET_TYPE', this.selected)
      },
  },
  computed: {
    ...mapGetters(['type'])
  },
  created() {
    this.selected = this.type
  }
}
</script>

<style lang="scss" scoped>

  @include select-style1;
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
</style>