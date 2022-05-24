<template>
  <router-link
  :to="{ name: 'articleDetail',
          params: { articlePk: article.pk, article: article } }">
    <div class="article-title-item">
      <li class="article-line">
        <div class="article-id">#{{ article.pk }}</div>
        <div class="article-title">
          <div><b v-if="article.movie">[ {{ article.movie.title }} ] </b></div>
          <div><b>{{ article.title }} 🧡{{ article.likes_count }} 💬{{ article.comments_count }}</b></div>      
          <div><b v-if="article.movie"> ⭐{{ article.rank }}</b></div>
        </div>
        <div class="article-user"><b>{{ nickname }}</b></div>
      </li>
      <li class="article-line">
        <div class="article-space"></div>
        <div class="article-content">{{ article.content }}</div>
        <div class="article-date">{{ article.created_at }}</div>
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
    }
  },
}
</script>

<style lang="scss" scoped>
.article-title-item {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  list-style: none;
  border: 1px solid white;
  padding: .5em;
  color: white;

  &:hover {
    background-color: mix($dm-bg-color1, white, 90%);
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
    display: flex;
    flex-direction: row;
    justify-content: right;
    width: 100%;
  }
  .article-id, .article-space {
    flex-basis: 100px;
    display: flex;
    justify-content: left;
    flex-grow: 1;
  }
  .article-title, .article-content {
    flex-basis: 700px;
    flex-grow: 7;
    display: flex;
    justify-content: left;
  }
  .article-user, .article-date {
    flex-basis: 200px;
    flex-grow: 2;
    display: flex;
    justify-content: center;
  }

}
</style>