<template>
  <div>
    <h1>Community Hot</h1>
    <article-hot-sort-select></article-hot-sort-select>
    <!-- <article-sort-select></article-sort-select> -->
    <article-unit-select></article-unit-select>
    <ul>
      
      <article-title-item
        v-for="article in hots"
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
import ArticleHotSortSelect from '@/components/community/ArticleHotSortSelect';
// import ArticleSortSelect from '@/components/community/ArticleSortSelect';
import ArticleUnitSelect from '@/components/community/ArticleUnitSelect';
export default {
  name: "CommunityArticleView",
  components: {
    ArticleTitleItem,
    ArticleHotSortSelect,
    // ArticleSortSelect,
    ArticleUnitSelect,
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['hots'])
  },
  methods: {
    ...mapActions(['setHotPage', 'setHots','setHotPageNum'])
  },
  created() {
    const page = this.$route.params.page;
    this.setHotPageNum(page)
    this.setHots(page)
  }
}
</script>

<style>

</style>