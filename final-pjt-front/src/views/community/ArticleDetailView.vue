<template>
  <div>
    <h1>Article Detail</h1>
    {{ articleInfo }} <hr>
    {{ articleInfo.user.username}}
    {{ articleInfo.pk }}

    <div v-if="isReview">
      {{ articleInfo.movie}}
      {{ articleInfo.rank}}
    </div>
  </div>
</template>

<script>
// import ArticleCreateForm from "@/components/community/ArticleCreateForm"
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "ArticleDetailView",
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['articleInfo']),
    isReview() {
      return this.articleInfo.category==='review'
    },
  },
  methods: {
    ...mapActions(['setArticleInfo']),
  },
  created() {
    const articlePk = this.$route.params.articlePk
    this.setArticleInfo(articlePk)
  }
}
</script>

<style>

</style>