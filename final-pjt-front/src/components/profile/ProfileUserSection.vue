<template>
  <div>
    <h2>ProfileUserSection</h2>
    <h3>싹이 난 감자</h3>
    <hr>
    <p>감자에 싹이 나서 잎이 나서 감자감자 싹!!</p>
    <p>팔로잉 : 10 / 팔로워 : 31</p>
    <hr>
    <!-- <h2>{{ profileUser }}</h2> -->
    <h2>닉네임 : {{ profileInfo.nickname }}</h2>
    <p>팔로잉 : {{ followingsNum }} / 팔로워 : {{ followersNum }}</p>
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
      profileInfo: {
        nickname: this.profile.nickname,
        followingsNum: this.profile.user.followings,
      }
    }
  },
  methods: {
  },
}
</script>

<style>

</style>