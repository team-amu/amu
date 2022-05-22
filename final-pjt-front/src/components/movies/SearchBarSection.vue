<template>
  <div>
    <h2>SearchBarSection</h2>
    <select v-model="select">
      <option value="title">영화제목</option>
      <option value="actor">배우</option>
    </select>
    <input type="text" 
    @keyup="inputChange"
    >
  </div>
</template>

<script>
export default {
  name: "SearchBarSection",
  data() {
    return {
      select: 'title'
    }
  },
  methods: {
    inputChange: function (event) {
      let data = {
        inputData: event.target.value,
        select: this.select,
      }
      this.$emit('input-change', data)
    }
  }
}
</script>

<style>

</style>