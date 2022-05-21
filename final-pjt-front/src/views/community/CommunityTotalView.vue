<template>
  <div>
    <h1>Community Total</h1>
    <article-sort-select></article-sort-select>
    <article-unit-select></article-unit-select>
    <ul>
      
      <total-title-item
        v-for="total in totals"
        :key="total.pk"
        :total="total"
      >
      </total-title-item>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TotalTitleItem from "@/components/community/TotalTitleItem";
import ArticleUnitSelect from '@/components/community/ArticleUnitSelect';
import ArticleSortSelect from '@/components/community/ArticleSortSelect';
export default {
  name: "CommunityTotalView",
  components: {
    TotalTitleItem,
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
    ...mapActions(['setArticlePage', 'setTotals','setTotalPageNum'])
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