<template>
  <div>
    <h1>Profile Like</h1>
    <profile-user-section v-if="isRightProfile && isProfile" :profile="profile"></profile-user-section>
    <profile-content-section
      v-if="isRightProfile && isProfile"
      :contents="profile.user.like_movies"
      type="likedMovie"
    ></profile-content-section>
    <profile-liked-movie-pagination></profile-liked-movie-pagination>
  </div>
</template>

<script>
  import ProfileUserSection from '@/components/profile/ProfileUserSection.vue'
  import ProfileContentSection from '@/components/profile/ProfileContentSection.vue'
  import ProfileLikedMoviePagination from '@/components/pagination/ProfileLikedMoviePagination'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: { ProfileUserSection, ProfileContentSection, ProfileLikedMoviePagination },
    name: "ProfileLikeView",
    data() {
      return {
        isRightProfile: false
      }
    },
    computed: {
      ...mapGetters(['isProfile', 'profile'])
    },
    methods: {
      ...mapActions(['fetchProfileLike', 'setProfileLikedMoviePageNum'])
    },
    watch: {
      // 이 조건은 구글링 하다가 찾았는데 아직 잘 모름 일단 넣어놈,,
      immediate: true,
      // 주소가 바뀌면 그 주소에 맞는 프로필 가져오기!
      $route: {
        handler() {
          this.isRightProfile = false
          this.fetchProfileLike(this.$route.params.username)
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
      const params = this.$route.params
      console.log('ㅋㅋㅋ아 짜증나!!', params)
      this.setProfileLikedMoviePageNum(params.page)
      this.fetchProfileLike(params)
    }
  }
</script>

<style>

</style>