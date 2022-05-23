<template>
  <div>
    <h2>SearchBarSection</h2>
    <select v-model="select" @change="inputChange">
      <option value="title">영화제목</option>
      <option value="actor">배우</option>
    </select>
    
    <input type="text" 
    @input="inputChange"
    @keyup.enter="onSearch"
    v-model="inputData"
    >

    <button @click="onSearch">검색</button>
  </div>
</template>

<script>
export default {
  name: "SearchBarSection",
  data() {
    return {
      select: 'title',
      inputData: this.searchWord,
    }
  },
  props: {
    searchWord: String,
  },
  methods: {
    inputChange: function () {
      let data = {
        inputData: this.inputData,
        select: this.select,
      }
      this.$emit('input-change', data)
    },
    onSearch: function () {
      let data = {
        inputData: this.inputData,
        select: this.select,
      }
      this.$emit('on-search', data)
    }
  }
}
</script>

<style>

</style>