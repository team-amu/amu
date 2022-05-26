<template>
  <div>
    <profile-user-section v-if="isRightProfile && isProfile" :profile="profile"></profile-user-section>
    <profile-content-section
      v-if="isRightProfile && isProfile"
      :contents="profile.user.comments"
      type="comment"
    ></profile-content-section>
  </div>
</template>

<script>
import ProfileUserSection from '@/components/profile/ProfileUserSection.vue'
import ProfileContentSection from '@/components/profile/ProfileContentSection.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { ProfileUserSection, ProfileContentSection },
  name: "ProfileCommentView",
    data() {
      return {
        isRightProfile: false
      }
    },
    computed: {
      ...mapGetters(['isProfile', 'profile'])
    },
    methods: {
      ...mapActions(['fetchProfileComment'])
    },
    watch: {
      // 이 조건은 구글링 하다가 찾았는데 아직 잘 모름 일단 넣어놈,,
      immediate: true,
      // 주소가 바뀌면 그 주소에 맞는 프로필 가져오기!
      $route: {
        handler() {
          this.isRightProfile = false
          this.fetchProfileComment(this.$route.params.username)
        }
      },
      // 프로필을 가져와서 바뀌었으면 isRightProfile 조건 true로 바꿔서 랜더링하게!
      profile: {
        handler() {
          this.isRightProfile = true
        }
      },
    },
    created() {
      this.fetchProfileComment(this.$route.params.username)
    }
  }
</script>

<style>

</style>