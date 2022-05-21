<template>
  <div>
    <h2>ProfileUserSection</h2>
    <hr>
    <h2>닉네임 : {{ profile.nickname }}</h2>
    <h2> 팔로잉 : {{ profile.user.followings_count }} / 팔로워 : {{ profile.user.followers_count }}</h2>
    <button v-if="isFollow() && !isMe()" @click="follow(profileUsername)">언팔로우</button>
    <button v-if="!isFollow() && !isMe()" @click="follow(profileUsername)">팔로우</button>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ProfileUserSection',
  props: {
    profile: Object,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    profileUsername() {
      return this.$route.params.username
    }
  },
  methods: {
    ...mapActions(['follow']),
    isFollow() {
      return this.profile.user.followers.some((ele) => {
        return ele.id === this.currentUser.pk
      })
    },
    isMe() {
      return this.profile.user.id === this.currentUser.pk
    }
  },
}
</script>

<style>

</style>