<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <!-- 계정 관련 -->
      <section>
        <router-link :to="{ name: 'login' }">로그인</router-link> <br>
        <router-link :to="{ name: 'logout'}">로그아웃</router-link> <br>
        <router-link :to="{ name: 'signup'}">회원가입</router-link>
      </section>
      <hr>
      <!-- profile 관련 -->
      <section v-if="isCurrentUser">
        <router-link :to="{ name: 'profileLike', params: { username }}">좋아요한 영화</router-link> <br>
        <router-link :to="{ name: 'profileBookmark',  params: { username }}">북마크한 영화</router-link> <br>
        <router-link :to="{ name: 'profileArticle',  params: { username }}">내가 쓴 게시글</router-link> <br>
        <router-link :to="{ name: 'profileComment',  params: { username }}">내가 쓴 댓글</router-link>
      </section>
      <hr>
      <section>
        <!-- movie 관련 -->
        <router-link :to="{ name: 'home' }">홈 화면</router-link> <br>
        <router-link :to="{ name: 'movieSearch', params: { searchPage: '1'} }">영화 검색 페이지</router-link>
      </section>
      <hr>
      <section>
        <!-- community 관련 -->
        <router-link :to="{ name: 'articleCreate' }">게시글 쓰기</router-link> <br>
        <router-link :to="{ name: 'communityTotal', params: {page:'1'} }">전체게시판</router-link> <br>
        <router-link :to="{ name: 'communityHot', params: {page:'1'} }">인기게시판</router-link> <br>
        <router-link :to="{ name: 'communityReview', params: {page:'1'} }">영화게시판</router-link> <br>
        <router-link :to="{ name: 'communityFree', params: {page:'1'} }">자유게시판</router-link>
      </section>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Archive Of Movie</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view/>
    </v-main>
    
  </v-app>
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
    data: () => ({ drawer: null }),
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
