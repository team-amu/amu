<template>
  <select
    name="articleSortSelect"
    id="articleSortSelect"
    @change.prevent="onChange"
  >
    <option value="-pk" :selected="isSortRecent">최신순</option>
    <option value="-likes_count" :selected="isSortLikesCount">좋아요 많은 순</option>
    <option value="-comments_count" :selected="isSortCommentsCount">댓글 많은 순</option>
  </select>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "ArticleSortSelect",
  props: {
    action: String,
  },
  methods: {
    ...mapActions(['setCommunityArticleSort', 'setReviews', 'setFrees', 'setTotals', 'setHots',
    'setReviewPageNum', 'setFreePageNum', 'setTotalPageNum', 'setHotPageNum']),

    onChange(event) {
      if (confirm('정렬 기준을 변경하시면 최근 페이지로 이동합니다. 이동하시겠습니까?')){
        // 새로운 정렬 단위 저장
        const newSort = event.target.value
        this.setCommunityArticleSort(newSort)
        switch (this.action) {
          case 'total':
            this.$router.push({ name: 'communityTotal', params: { page: 1 } })
            this.setTotals(1)
            this.setTotalPageNum(1)
            break
          case 'hot':
            this.$router.push({ name: 'communityHot', params: { page: 1 } })
            this.setHots(1)
            this.setHotPageNum(1)
            break
          case 'review':
            this.$router.push({ name: 'communityReview', params: { page: 1 } })
            this.setReviews(1)
            this.setReviewPageNum(1)
            break
          case 'free':
            this.$router.push({ name: 'communityFree', params: { page: 1 } })
            this.setFrees(1)
            this.setFreePageNum(1)
            break
        }
      }
    },
  },
  computed: {
    ...mapGetters(['communityArticleSort']),
    isSortRecent(){
      return this.communityArticleSort === '-pk'
    },
    isSortLikesCount(){
      return this.communityArticleSort === '-likes_count'
    },
    isSortCommentsCount(){
      return this.communityArticleSort === '-comments_count'
    },
  }
}
</script>

<style>

</style>