<template>
  <div>
    <h1>Community Total</h1>
    <section id="article-list-header-section">
      <router-link
        id="create-article-btn"
        :to="{ name: 'articleCreate' }"
      >
        <v-icon>mdi-pen</v-icon>
        <span>게시글 작성</span>
      </router-link>
      <div id="select-section">
        <article-sort-select :action="action"></article-sort-select>
        <article-unit-select></article-unit-select>
      </div>
    </section>
    
    <ul class="article-list">
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
import ArticleTotalPagination from "@/components/pagination/ArticleTotalPagination";
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

<style lang="scss" scoped>
#article-list-header-section {
  @include article-list-header-section;
}
</style>