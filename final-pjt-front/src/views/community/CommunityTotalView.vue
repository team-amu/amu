<template>
  <div>
    <h1>Community Total</h1>
    <article-sort-select></article-sort-select>
    <article-unit-select></article-unit-select>
    <ul>
      
      <article-title-item
        v-for="article in totals"
        :key="article.pk"
        :article="article"
      >
      </article-title-item>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ArticleTitleItem from "@/components/community/ArticleTitleItem";
import ArticleUnitSelect from '@/components/community/ArticleUnitSelect';
import ArticleSortSelect from '@/components/community/ArticleSortSelect';
export default {
  name: "CommunityArticleView",
  components: {
    ArticleTitleItem,
    ArticleSortSelect,
    ArticleUnitSelect,
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['totals'])
  },
  methods: {
    ...mapActions(['setTotalPage', 'setTotals','setTotalPageNum'])
  },
  created() {
    const page = this.$route.params.page;
    this.setTotalPageNum(page)
    this.setTotals(page)
  }
}
</script>

<style>

</style>