<template>
  <div>
    <h1>Community Free</h1>
    <article-sort-select></article-sort-select>
    <article-unit-select></article-unit-select>
    <ul>
      
      <article-title-item
        v-for="article in frees"
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
  name: "CommunityTotalView",
  components: {
    ArticleTitleItem,
    ArticleUnitSelect,
    ArticleSortSelect,
  },
  data () {
    return {}
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

<style>

</style>