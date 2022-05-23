<template>
  <router-link
  :to="{ name: 'articleDetail',
          params: { articlePk: content.article.pk } }">
    <li>
      <b>{{ content.content }}</b>
      <br>
      <span>#{{ content.article.pk }} | </span>
      <span v-if="content.article.movie">{{ content.article.movie.title }} | </span>
      <span v-if="content.movie">{{ content.rank }}</span>
      <span>{{ content.article.title }} </span>
      <span>🧡{{ content.article.likes_count }} </span>
      <span>💬{{ content.article.comments_count }} </span>
      <p>{{ content.created_at }}</p>
    </li>
    <hr>
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
    nickname: () => this.content.user.profile.nickname,
    article: () => this.content.article,
  },
}
</script>

<style>

</style>