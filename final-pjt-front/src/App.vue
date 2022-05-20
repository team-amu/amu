<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'login' }">login</router-link> |
      <router-link :to="{ name: 'logout'}">logout</router-link> |
      <router-link :to="{ name: 'signup'}">signup</router-link>
    </nav>
    <section>
      <!-- profile 관련 -->
      <router-link :to="{ name: 'profileLike' }">ProfileLike</router-link> | 
      <router-link :to="{ name: 'profileBookmark' }">ProfileBookmark</router-link> |
      <router-link :to="{ name: 'profileArticle' }">ProfileArticle</router-link> | 
      <router-link :to="{ name: 'profileComment' }">ProfileComment</router-link>
    </section>
    <section>
      <!-- movie 관련 -->
      <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link :to="{ name: 'movieDetail' }">MovieDetail</router-link>
    </section>
    <section>
      <!-- community 관련 -->
      <router-link :to="{ name: 'articleCreate' }">ArticleCreate</router-link>
    </section>

    <router-view/>
  </div>
</template>

// <script>
// import HomeView from '@/components/profile/ProfileUserSection.vue'
// export default {
//   components: { HomeView },
//   name: "App",
//   computed: {
//   },
//   methods: {
//   }
// }
// </script>

<style>
</style>
