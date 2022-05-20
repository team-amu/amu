<template>
  <div>
    <h1>Profile Like</h1>
    {{ profileUser }}
    <profile-user-section v-if="isSelfUser" :profile="profile"></profile-user-section>
    <profile-content-section v-if="isSelfUser" :profile="profile"></profile-content-section>
  </div>
</template>

<script>
  import ProfileUserSection from '@/components/profile/ProfileUserSection.vue'
  import ProfileContentSection from '@/components/profile/ProfileContentSection.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: { ProfileUserSection, ProfileContentSection },
    name: "ProfileLikeView",
    computed: {
      ...mapGetters(['profile', 'isProfile', 'isSelfUser']),
      // 버튼으로 이동했을 때 state의 프로필 바꿔주기 위해서!!
      profileUser() {
        const payload = { username: this.$route.params.username }
        this.fetchProfileLike(payload)
        console.log(this.isSelfUSer)
        // return this.profile
        return payload.username
      },
    },
    methods: {
      ...mapActions(['fetchProfileLike'])
    },
    mounted() {
    },
    created() {
      const payload = { username: this.$route.params.username }
      this.fetchProfileLike(payload)
    }
  }
</script>

<style>

</style>