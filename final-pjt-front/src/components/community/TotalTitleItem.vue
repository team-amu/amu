<template>
  <router-link
  :to="{ name: 'articleDetail',
          params: { articlePk: total.pk, article: total } }">
  
    <li>
      [{{total.category}} #{{ total.pk }}] {{ total.title }} - {{ nickname }} - {{ total.created_at }}
    </li>
  </router-link>
</template>

<script>
export default {
  name: "TotalTitleItem",
  data () {
    return {}
  },
  props: {
    total: Object
  },
  methods: {},
  computed: {
    nickname () {
      return this.total.user.profile.nickname
    }
  },
}
</script>

<style>

</style>