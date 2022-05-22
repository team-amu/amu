<template>
  <router-link
  :to="{ name: 'articleDetail',
          params: { articlePk: review.pk, article: review } }">
    <li>
      [{{ review.category }} #{{ review.pk }}] {{ review.title }} - {{ nickname }}
      {{ review.movie }}
    </li>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "ReviewTitleItem",
  data () {
    return {}
  },
  props: {
    review: Object
  },
  methods: {},
  computed: {
    ...mapGetters(['profile']),
    nickname () {
      return this.review.user.profile.nickname
    }
  },
}
</script>

<style>

</style>