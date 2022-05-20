<template>
  <div>
    <h1>Profile Comment</h1>
    <profile-user-section></profile-user-section>
    <profile-content-section></profile-content-section>
  </div>
</template>

<script>
import ProfileUserSection from '@/components/profile/ProfileUserSection.vue'
import ProfileContentSection from '@/components/profile/ProfileContentSection.vue'
export default {
  name: "ProfileCommentView",
  components: { ProfileUserSection, ProfileContentSection },
  computed: {
  },
  methods: {
  }
}
</script>

<style>

</style>