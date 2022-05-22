<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'login' }">login</router-link> |
      <router-link :to="{ name: 'logout'}">logout</router-link> |
      <router-link :to="{ name: 'signup'}">signup</router-link>
    </nav>
    <section v-if="isCurrentUser">
      <!-- profile 관련 -->
      <router-link :to="{ name: 'profileLike', params: { username }}">ProfileLike</router-link> | 
      <router-link :to="{ name: 'profileBookmark',  params: { username }}">ProfileBookmark</router-link> |
      <router-link :to="{ name: 'profileArticle',  params: { username }}">ProfileArticle</router-link> | 
      <router-link :to="{ name: 'profileComment',  params: { username }}">ProfileComment</router-link>
    </section>
    <section>
      <!-- movie 관련 -->
      <router-link :to="{ name: 'home' }">Home</router-link> |
    </section>
    <section>
      <!-- community 관련 -->
      <router-link :to="{ name: 'articleCreate' }">ArticleCreate</router-link> |
      <router-link :to="{ name: 'communityTotal', params: {page:'1'} }">CommunityTotal</router-link> |
      <router-link :to="{ name: 'communityReview', params: {page:'1'} }">CommunityReview</router-link> |
      <router-link :to="{ name: 'communityFree', params: {page:'1'} }">CommunityFree</router-link>
      
    </section>

    <router-view/>
  </div>
</template>

 <script>
// import HomeView from '@/components/profile/ProfileUserSection.vue'
// export default {
//   components: { HomeView },
//   name: "App",
//   computed: {
//   },
//   methods: {
//   }
// }
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'App',
    components: { },
    methods: {
      ...mapActions(['fetchCurrentUser']),
    },
    computed: {
      ...mapGetters(['currentUser', 'isCurrentUser']),
      username() {
        return this.currentUser.username? this.currentUser.username : 'guest'
      },
    },
    created() {
      this.fetchCurrentUser()
    }
  }
 </script>

<style>
</style>
