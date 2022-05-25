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
#type-select {
  @include select-style2;
  @include f-5;
  flex-shrink: 1;
  border-radius: 10px;
  width: 3000px;
}
</style>