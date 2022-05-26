<template>
  <router-link
  :to="{ name: 'articleDetail',
          params: { articlePk: article.pk, article: article } }">
    <div class="article-title-item">
      <li class="article-line">
        <div class="article-id">{{ article.pk }}</div>
        <div class="article-title">
          <div class="article-movie-title" v-if="article.movie">{{ article.movie.title }}</div>
          <div>{{ article.title }} 🧡{{ article.likes_count }} 💬{{ article.comments_count }}</div>      
          <div v-if="article.movie"> ⭐{{ article.rank }}</div>
        </div>
        <div class="article-user">{{ nickname }}</div>
      </li>
      <li class="article-line">
        <div class="article-space"></div>
        <div class="article-content">{{ shortContent }}</div>
        <div class="article-date">{{ timedelta }}</div>
      </li>
    </div>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "ArticleTitleItem",
  data () {
    return {}
  },
  props: {
    article: Object
  },
  methods: {},
  computed: {
    ...mapGetters(['profile']),
    nickname () {
      return this.article.user.profile.nickname
    },
    timedelta () {
      const date1 = new Date(this.article.created_at);
      const date2 = new Date();
      let timedelta = Math.ceil((date2 - date1)/1000)
      if (timedelta < 60) {
        return `${timedelta}초 전`
      }
      timedelta = Math.floor(timedelta/60)
      if (timedelta < 60) {
        return `${timedelta}분 전`
      }
      timedelta = Math.floor(timedelta/60)
      if (timedelta < 24) {
        return `${timedelta}시간 전`
      }
      return this.article.created_at.split('T')[0]
    },
    shortContent () {
      const len = 10;
      const content = this.article.content;
      if (content.length > len) {
        return content.slice(0, len) + '...';
      }
      return content
    },
  },
}
</script>

<style lang="scss" scoped>
.article-title-item {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  list-style: none;
  border: 0.5px solid $dm-bg-color1-light;
  padding: .5em;
  color: white;

  &:hover {
    background-color: $dm-bg-color1-light;
    transition: 0.3s all ease-in-out;
  }

  span {
    color: white;
  }

  div {
    display: inline-block;
    box-sizing: border;
    color: white;
  }

  .article-line {
    @include f-5;
    display: flex;
    flex-direction: row;
    justify-content: right;
    width: 100%;
    padding: .2em;
  }
  .article-id {
    @include flex-line(1, center);
  }
  .article-title {
    @include flex-line(7, left);

    .article-movie-title {
      background-color: white;
      color: black;
      border-radius: 5px;
      margin-right: .5em;
      padding: 0 .5em;
    }
  }

  .article-user {
    @include flex-line(2, center);
  }
  .article-space {
    @include flex-line(1, center);
  }
  .article-content {
    @include flex-line(7, left);
    opacity: 0.6;
  }
  .article-date {
    @include flex-line(2, center);
  }
}
</style>