<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      id="navigation-drawer"
      color='#212121'
      app
    >
      <section id="nav-account">
        <router-link
          id="user-profile-image-container"
          :to="{ name: 'profileLike', params: { username: currentUser.username }}"
        >
          <div
            id="user-profile-image"
            :style="profileImageSrc"
          ></div>
        </router-link>
        

        <div id="user-nickname">
          {{ nickname }}
        </div>

        <router-link
          v-if="isLoggedIn"
          :to="{ name: 'logout'}"
          class="account-link"
        >로그아웃</router-link>

        <router-link 
          v-if="!isLoggedIn"
          class="account-link"
          :to="{ name: 'login' }"
        >로그인</router-link>

      </section>

      <!-- profile 관련 -->
      <section id="nav-profile" v-if="isCurrentUser">
        <div class="section-title">MY PAGE</div>
        <router-link :to="{ name: 'profileLike', params: { username: currentUser.username }}">나의 좋아요 영화</router-link>
        <router-link :to="{ name: 'profileBookmark',  params: { username: currentUser.username }}">나의 북마크 영화</router-link>
        <router-link :to="{ name: 'profileArticle',  params: { username: currentUser.username }}">나의 게시글</router-link>
        <router-link :to="{ name: 'profileComment',  params: { username: currentUser.username }}">나의 댓글</router-link>
      </section>

      <section id="nav-movie">
        <div class="section-title">MOVIE</div>
        <!-- movie 관련 -->
        <router-link :to="{ name: 'home' }">HOME</router-link>
        <!-- params 없이 들어갔을 때 막아주기 -->
        <router-link :to="{ name: 'movieSearch', params: { searchPage: '1'}, query: {searchKeywords: '', 
      type: 'title', genres: [], minRank: 0, sort: '-release_date'}}">SEARCH</router-link>
      </section>

      <section id="nav-community">
        <!-- community 관련 -->
        <div class="section-title">COMMUNITY</div>
        <router-link :to="{ name: 'articleCreate' }">게시글 작성</router-link>
        <router-link :to="{ name: 'communityTotal', params: {page:'1'} }">전체게시판</router-link>
        <router-link :to="{ name: 'communityHot', params: {page:'1'} }">인기게시판</router-link>
        <router-link :to="{ name: 'communityReview', params: {page:'1'} }">영화게시판</router-link>
        <router-link :to="{ name: 'communityFree', params: {page:'1'} }">자유게시판</router-link>
      </section>
    </v-navigation-drawer>

    <v-app-bar
      app
      color='#212121'
    >
      <v-app-bar-nav-icon color='white' @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link id="nav-main-title" :to="{ name: 'home' }">
          Archive Of Movie
        </router-link>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view/>
    </v-main>
    
  </v-app>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'App',
    components: { },
    data: () => ({ drawer: null }),
    methods: {
      ...mapActions(['fetchCurrentUser', 'fetchMyProfile']),
    },
    computed: {
      ...mapGetters(['currentUser', 'currentUserProfile', 'isCurrentUser', 'isLoggedIn']),
      username() {
        return this.currentUser.username? this.currentUser.username : 'guest'
      },
      profileImageSrc() {
        let profile_image = this.currentUserProfile.profile_image
        if (!profile_image) {
          profile_image = '/media/images/default.png'
        }
        return {
          'background-image': `url("http://localhost:8000${profile_image}")`,
          'background-size': 'cover'
        }
      },
      nickname() {
        return this.currentUserProfile.nickname
      }
    },
    created() {
      this.fetchCurrentUser()
      this.fetchMyProfile()
      this.drawer = false;
    }
  }
</script>

<style lang="scss">
@import '@/styles/_app.scss';
@include scrollbar;
@mixin nav-section {
  @include flex-gap(column, .5);
  align-items: center;
  border-bottom: 1px solid white;
  margin: 2vw 1em;
  padding: 0 0 2vw 0;
  flex-basis: 100%;
  flex-shrink: 1;
}

#navigation-drawer {
  a {
    text-decoration: none;
    color: white;
    @include hover;
  }

  .section-title {
    @include f-4;
    font-weight: 700;
    color: mix(white, $dm-pt-color1, .8);
  }

  @include flex-gap(column, .5);
  #nav-account {
    @include wh-ratio(1, 1);
    @include nav-section;

    #user-profile-image-container {
      @include flex;
      width: 100%;

      #user-profile-image {
        @include wh-ratio(1, 1);
        flex-basis: 20em;
        border-radius: 50%;
        border: 1px solid white;
        margin: 1em;
      }
    }

    #user-nickname {
      @include f-4;
      font-weight: 800;
    }

    .account-link {
      @include f-6;
      color: lightgrey;
    }
  }

  #nav-profile {
    @include nav-section;
  }

  #nav-movie {
    @include nav-section;
  }

  #nav-community {
    @include nav-section;
  }
}

#nav-main-title {
  text-decoration: none;
  font-weight: 800;

  &:link {
    color: white;
  }

  &:visited {
    color: white;
  }
}
</style>
