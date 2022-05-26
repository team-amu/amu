<template>
  <div>
    <h1>Community Hot</h1>
    <section id="article-list-header-section">
      <router-link
        id="create-article-btn"
        :to="{ name: 'articleCreate' }"
      >
        <v-icon>mdi-pen</v-icon>
        <span>게시글 작성</span>
      </router-link>
      <div id="select-section">
        <article-hot-sort-select :action="action"></article-hot-sort-select>
        <article-unit-select></article-unit-select>
      </div>
    </section>
    <ul class="article-list">
      <article-title-item
        v-for="article in hots"
        :key="article.pk"
        :article="article"
      >
      </article-title-item>
    </ul>
    <article-hot-pagination></article-hot-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ArticleTitleItem from "@/components/community/ArticleTitleItem";
import ArticleHotSortSelect from '@/components/community/ArticleHotSortSelect';
// import ArticleSortSelect from '@/components/community/ArticleSortSelect';
import ArticleUnitSelect from '@/components/community/ArticleUnitSelect';
import ArticleHotPagination from "@/components/pagination/ArticleHotPagination";
export default {
  name: "CommunityHotView",
  components: {
    ArticleTitleItem,
    ArticleHotSortSelect,
    // ArticleSortSelect,
    ArticleUnitSelect,
    ArticleHotPagination,
  },
  data () {
    return {
      action: 'hot'
    }
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

<style lang="scss" scoped>
#article-list-header-section {
  @include article-list-header-section;
}
</style>