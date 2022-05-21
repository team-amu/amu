<template>
  <select
    name="articleSortSelect"
    id="articleSortSelect"
    @change.prevent="onChange"
  >
    <option value="-pk">최신순</option>
    <option value="-likes_count">좋아요 많은 순</option>
    <option value="-comments_count">댓글 많은 순</option>
  </select>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "ArticleUnitSelect",
  methods: {
    ...mapActions(['setCommunityArticleSort', 'setReviews', 'setFrees', 'setTotals']),

    onChange(event) {
      if (confirm('정렬 기준을 변경하시면 1번 페이지로 이동합니다. 이동하시겠습니까?')){
        // 새로운 정렬 단위 저장
        const newSort = event.target.value
        this.setCommunityArticleSort(newSort)
        this.setReviews(1)
        this.setFrees(1)
        this.setTotals(1)
      }
    },
  },
  computed: {
    ...mapGetters(['communityArticleSort']),
  }
}
</script>

<style>

</style>