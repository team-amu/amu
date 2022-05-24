<template>
  <div>
    <h2>ProfileUserSection</h2>
    <hr>
    <span v-if="!isEditing">
      <img :src="imageSrc" alt="프로필사진">
    </span>
    <span v-if="isEditing">
      <v-file-input v-model="payload.profile_image" label="File input"></v-file-input>
    </span>
    
    <span v-if="!isEditing">
      <h2>닉네임 : {{ profile.nickname }}</h2>    
    </span>
    <span v-if="isEditing">
      <input type="text" v-model="payload.nickname">
    </span>

    <h2> 팔로잉 : {{ profile.user.followings_count }} / 팔로워 : {{ profile.user.followers_count }}</h2>
    
    <button v-if="isFollow() && !isMe()" @click="follow(profileUsername)">언팔로우</button>
    <button v-if="!isFollow() && !isMe()" @click="follow(profileUsername)">팔로우</button>
    
    <span>
      <h2>한 줄 자기소개: </h2>
    </span>

    <h2 v-if="!isEditing"> {{ profile.introduce }}</h2>
    
    <span v-if="isEditing">
      <input type="text" v-model="payload.introduce">
      <button @click="onUpdate">Update</button> |
      <button @click="switchIsEditing">Cancel</button>
    </span>

    <button v-if="isMe() && !isEditing" @click="switchIsEditing">Edit</button>

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
      isEditing: false,
      payload: {
        username: this.$route.params.username,
        nickname: this.profile.nickname,
        profile_image: this.profile.profile_image,
        introduce: this.profile.introduce,
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isProfile']),
    profileUsername() {
      return this.$route.params.username
    },
    imageSrc() {
      if (this.isProfile && this.profile.profile_image) {
        return `http://localhost:8000${this.profile.profile_image}`
      } 
      else {
        return 'http://localhost:8000/media/images/default.png'
      }
    }
  },
  methods: {
    ...mapActions(['follow', 'profileUpdate']),
    isFollow() {
      return this.profile.user.followers.some((ele) => {
        return ele.id === this.currentUser.pk
      })
    },
    isMe() {
      return this.profile.user.id === this.currentUser.pk
    },
    switchIsEditing() {
      this.isEditing = !this.isEditing
    },
    onUpdate() {
      this.profileUpdate(this.payload)
      this.isEditing = false
    },
  },
}
</script>

<style>

</style>