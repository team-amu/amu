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
    <article-total-pagination></article-total-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ArticleTitleItem from "@/components/community/ArticleTitleItem";
import ArticleUnitSelect from '@/components/community/ArticleUnitSelect';
import ArticleSortSelect from '@/components/community/ArticleSortSelect';
import ArticleTotalPagination from "@/components/common/ArticleTotalPagination";
export default {
  name: "CommunityTotalView",
  components: {
    ArticleTitleItem,
    ArticleSortSelect,
    ArticleUnitSelect,
    ArticleTotalPagination,
  },
  data () {
    return {
      action: "total",
    }
  },
  computed: {
    ...mapGetters(['totals'])
  },
  methods: {
    ...mapActions(['setTotalPage', 'setTotals','setTotalPageNum'])
  },
  created() {
    const page = this.$route.params.page;
    this.setTotals(page)
    this.setTotalPageNum(page)
  }
}
</script>

<style>

</style>