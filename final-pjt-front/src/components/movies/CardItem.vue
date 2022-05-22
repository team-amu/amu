<template>
<div>
  <h3>CardItem</h3>
  <p>{{ movie.title }}</p>
</div>
</template>

<script>
export default {
  name: "CardItem",
  props: {
    movie: Object,
  },
}
</script>

<style>

</style>