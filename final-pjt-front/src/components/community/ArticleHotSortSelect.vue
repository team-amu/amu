<template>
  <select
    name="articleHotSortSelect"
    id="articleHotSortSelect"
    @change.prevent="onChange"
  >
    <option value="likes.10" :selected="isLike10">좋아요 10개 이상</option>
    <option value="likes.50" :selected="isLike50">좋아요 50개 이상</option>
    <option value="likes.100" :selected="isLike100">좋아요 100개 이상</option>
    <option value="comments.10" :selected="isComment10">댓글 10개 이상</option>
    <option value="comments.50" :selected="isComment50">댓글 50개 이상</option>
    <option value="comments.100" :selected="isComment100">댓글 100개 이상</option>
  </select>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "ArticleHotSortSelect",
  methods: {
    ...mapActions(['setCommunityArticleHotSort', 'setHots']),

    onChange(event) {
      if (confirm('정렬 기준을 변경하시면 1번 페이지로 이동합니다. 이동하시겠습니까?')){
        // 새로운 정렬 단위 저장
        const newHotSort = event.target.value
        this.setCommunityArticleHotSort(newHotSort)
        this.setHots(1)
      }
    },
  },
  computed: {
    ...mapGetters(['communityArticleHotSort']),
    isLike10(){
      return this.communityArticleHotSort === 'likes.10'
    },
    isLike50(){
      return this.communityArticleHotSort === 'likes.50'
    },
    isLike100(){
      return this.communityArticleHotSort === 'likes.100'
    },
    isComment10(){
      return this.communityArticleHotSort === 'comments.10'
    },
    isComment50(){
      return this.communityArticleHotSort === 'comments.50'
    },
    isComment100(){
      return this.communityArticleHotSort === 'comments.100'
    },
  }
}
</script>

<style lang="scss" scoped>
@include select-style1;
select {
  @include font;
}
</style>