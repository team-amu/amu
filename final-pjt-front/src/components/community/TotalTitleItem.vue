<template>
  <router-link
  :to="{ name: 'articleDetail',
          params: { articlePk: total.pk, article: total } }">
  
    <li>
      [{{total.category}} #{{ total.pk }}] {{ total.title }}
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
  computed: {},
}
</script>

<style>

</style>