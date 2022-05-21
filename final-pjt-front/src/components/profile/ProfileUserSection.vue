<template>
  <div>
    <h2>ProfileUserSection</h2>
    <hr>
    <h2>닉네임 : {{ profile.nickname }}</h2>
    <h2>{{ profile }}</h2>
    <!-- <p>팔로잉 : {{ followingsNum }} / 팔로워 : {{ followersNum }}</p> -->
  </div>
</template>

<script>
export default {
  name: 'ProfileUserSection',
  props: {
    profile: Object,
  },
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style>

</style>