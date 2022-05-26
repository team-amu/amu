<template>
  <div>
    <h1 id="main-title">영화게시판</h1>
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
        v-for="article in reviews"
        :key="article.pk"
        :article="article"
      ></article-title-item>
    </ul>
    <article-review-pagination></article-review-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ArticleTitleItem from "@/components/community/ArticleTitleItem";
import ArticleUnitSelect from '@/components/community/ArticleUnitSelect';
import ArticleSortSelect from '@/components/community/ArticleSortSelect';
import ArticleReviewPagination from "@/components/pagination/ArticleReviewPagination";
export default {
  name: "CommunityReviewView",
  components: {
    ArticleTitleItem,
    ArticleUnitSelect,
    ArticleSortSelect,
    ArticleReviewPagination,
  },
  data () {
    return {
      action: "review"
    }
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