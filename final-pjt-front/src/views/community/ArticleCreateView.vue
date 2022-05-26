<template>
  <article-form :articleInfo="articleInfo" action="create"></article-form>
</template>

<script>
import ArticleForm from "@/components/community/ArticleForm"
export default {
  name: "ArticleCreateView",
  components: {
    ArticleForm,
  },
  data () {
    return {
      articleInfo: {
        pk: null,
        title: '',
        category: 'review',
        content: '',
        movie: null,
        rank: null
      }
    }
  }
}
</script>

<style>

</style>