<template>
  <div>
    <h1>Profile Article</h1>
    <profile-user-section></profile-user-section>
    <profile-content-section></profile-content-section>
  </div>
</template>

<script>
import ProfileUserSection from '@/components/profile/ProfileUserSection.vue'
import ProfileContentSection from '@/components/profile/ProfileContentSection.vue'
export default {
  components: { ProfileUserSection, ProfileContentSection },
  name: "ProfileArticleView",
  computed: {
  },
  methods: {
  }
}
</script>

<style>

</style>