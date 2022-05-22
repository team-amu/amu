<template>
  <router-link
  :to="{ name: 'articleDetail',
          params: { articlePk: free.pk, article: free } }">
  
    <li>
      [{{free.category}} #{{ free.pk }}] {{ free.title }} - {{ nickname }}
    </li>
  </router-link>
</template>

<script>
export default {
  name: "FreeTitleItem",
  data () {
    return {}
  },
  props: {
    free: Object
  },
  methods: {},
  computed: {
    nickname () {
      return this.free.user.profile.nickname
    }
  },
}
</script>

<style>

</style>