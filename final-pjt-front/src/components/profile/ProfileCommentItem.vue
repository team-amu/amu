<template>
  <router-link
  :to="{ name: 'articleDetail',
          params: { articlePk: content.article.pk } }">
    <div class=article-title-item>
      <li class="article-line">
        <div class="article-space"></div>
        <div class="article-content">{{ shortContent }}</div>
        <div class="article-date">{{ timedelta }}</div>
      </li>
      <li class="article-line">
        <div class="article-id">{{ content.article.pk }}</div>
        <div class="article-title">
          <div>{{ content.article.title }} 🧡{{ content.article.likes_count }} 💬{{ content.article.comments_count }}</div>      
          <div v-if="content.article.movie"> ⭐{{ content.article.rank }}</div>
        </div>
        <div class="article-user"></div>
      </li>
      <!-- <li>
        <b>{{ content.content }}</b>
        <br>
        <span>#{{ content.article.pk }} | </span>
        <span v-if="content.article.movie">{{ content.article.movie.title }} | </span>
        <span v-if="content.movie">{{ content.rank }}</span>
        <span>{{ content.article.title }} </span>
        <span>🧡{{ content.article.likes_count }} </span>
        <span>💬{{ content.article.comments_count }} </span>
        <p>{{ content.created_at }}</p>
      </li> -->
    </div>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "ProfileCommentItem",
  data () {
    return {}
  },
  props: {
    content: Object
  },
  methods: {},
  computed: {
    ...mapGetters(['profile']),
    nickname(){
      return this.content.user.profile.nickname
    },
    timedelta () {
      const date1 = new Date(this.content.created_at);
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
      return this.content.created_at.split('T')[0]
    },

    shortContent () {
      const len = 10;
      const content = this.content.content;
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

  .article-user {
    @include flex-line(2, center);
  }
  .article-space {
    @include flex-line(1, center);
  }
  .article-content {
    @include flex-line(7, left);
    font-weight: 500;
  }
  .article-date {
    @include flex-line(2, center);
  }


  .article-id {
    @include flex-line(1, center);
    opacity: 0.6
  }
  .article-title {
    @include flex-line(7, left);
    opacity: 0.6
  }
}
</style>