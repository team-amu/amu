<template>
  <router-link
  :to="{ name: 'articleDetail',
          params: { articlePk: review.pk, article: review } }">
    <li>
      [{{ review.category }} #{{ review.pk }}] {{ review.title }}
    </li>
  </router-link>
</template>

<script>
export default {
  name: "ReviewTitleItem",
  data () {
    return {}
  },
  props: {
    review: Object
  },
  methods: {},
  computed: {},
}
</script>

<style>

</style>