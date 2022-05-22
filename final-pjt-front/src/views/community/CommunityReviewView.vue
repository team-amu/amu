<template>
  <div>
    <h1>Community Review</h1>
    <article-sort-select></article-sort-select>
    <article-unit-select></article-unit-select>
    <ul>
      <article-title-item
        v-for="article in reviews"
        :key="article.pk"
        :article="article"
      ></article-title-item>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ArticleTitleItem from "@/components/community/ArticleTitleItem";
import ArticleUnitSelect from '@/components/community/ArticleUnitSelect';
import ArticleSortSelect from '@/components/community/ArticleSortSelect';
export default {
  name: "CommunityReviewView",
  components: {
    ArticleTitleItem,
    ArticleUnitSelect,
    ArticleSortSelect,
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['reviews'])
  },
  methods: {
    ...mapActions(['setReviewPageNum', 'setReviews'])
  },
  created() {
    const page = this.$route.params.page;
    this.setReviewPageNum(page)
    this.setReviews(page)
  }
}
</script>

<style>

</style>