<template>
  <router-link
  :to="{ name: 'articleDetail',
          params: { articlePk: content.pk } }">
    <li>
      <span>#{{ content.pk }} | </span>
      <b v-if="content.movie">{{ content.movie.title }} | </b>
      <b>{{ content.title }} | </b>
      <b>🧡{{ content.likes_count }} | </b>
      <b>💬{{ content.comments_count }} | </b>
      <b>{{ nickname }}</b> <br>
      <span>{{ content.content }}</span> <span v-if="content.movie">{{ content.rank }}</span>
      <p>{{ content.created_at }}</p>
      <hr>
    </li>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "ProfileArticleItem",
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
    }
  }
}
</script>

<style>
div {
  color: white;
}
</style>