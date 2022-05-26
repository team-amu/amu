<template>
  <div>
    <h1 id="main-title">자유게시판</h1>
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
      <li id="article-list-header">
        <div class="article-id">글 번호</div>
        <div class="article-title">글 제목</div>
        <div class="article-user">작성자</div>
      </li>
      <article-title-item
        v-for="article in frees"
        :key="article.pk"
        :article="article"
      >
      </article-title-item>
    </ul>
    <article-free-pagination></article-free-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ArticleTitleItem from "@/components/community/ArticleTitleItem";
import ArticleUnitSelect from '@/components/community/ArticleUnitSelect';
import ArticleSortSelect from '@/components/community/ArticleSortSelect';
import ArticleFreePagination from "@/components/pagination/ArticleFreePagination";

export default {
  name: "CommunityFreeView",
  components: {
    ArticleTitleItem,
    ArticleUnitSelect,
    ArticleSortSelect,
    ArticleFreePagination,
  },
    data () {
    return {
      action: "free"
    }
  },
  computed: {
    ...mapGetters(['frees'])
  },
  methods: {
    ...mapActions(['setArticlePage', 'setFrees','setFreePageNum'])
  },
  created() {
    const page = this.$route.params.page;
    this.setFreePageNum(page)
    this.setFrees(page)
  }
}
</script>

<style lang="scss" scoped>
#main-title {
  @include main-title;
}

#article-list-header-section {
  @include article-list-header-section;
}

#article-list-header {
  @include article-list-header;
}

.article-list {
  border: 2px solid white;
  border-radius: 10px;
  padding: 0;
  margin: 1em 0;
}
</style>