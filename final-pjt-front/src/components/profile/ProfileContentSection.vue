<template>
  <div>
    <h2>ProfileContentSection</h2>
    <li v-for="(content, i) in contents" :key="i">
      {{ content }}
    </li>
  </div>
</template>

<script>
export default {
  name: 'ProfileContentSection',
  props: {
    contents: Array,
  },
}
</script>

<style>

</style>