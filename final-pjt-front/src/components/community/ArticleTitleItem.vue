<template>
  <router-link
  :to="{ name: 'articleDetail',
          params: { articlePk: article.pk, article: article } }">
    <li>
      <span>#{{ article.pk }} </span> |
      <b v-if="article.movie">{{ article.movie.title }}</b> |
      <b>{{ article.title }}</b> |
      <b>🧡{{ article.likes_count }} </b>
      <b>💬{{ article.comments_count }} </b>
      <b>{{ nickname }}</b> <br>
      <span>{{ article.content }}</span> <span v-if="article.rank">{{ article.rank }}</span>
      <p>{{ article.created_at }}</p>
      <hr>
    </li>
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

<style>

</style>