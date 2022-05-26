<template>
  <article-form
    v-if="isArticle"
    :articleInfo="articleInfo"
    action="update"
  ></article-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ArticleForm from '@/components/community/ArticleForm.vue'
export default {
  name: "articleEditView",
  components: { ArticleForm },
  computed: {
    ...mapGetters(['articleInfo', 'isArticle',])
  },
  methods: {
    ...mapActions(['setArticleInfo'])
  },
  created() {
    this.setArticleInfo(this.$route.params.articlePk)
  }
}
</script>

<style>

</style>