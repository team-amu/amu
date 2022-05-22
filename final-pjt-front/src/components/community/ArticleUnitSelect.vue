<template>
  <select
    name="articleUnitSelect"
    id="articleUnitSelect"
    @change.prevent="onChange"
  >
    <option value="5" :selected="isUnit5">5개씩 보기</option>
    <option value="10" :selected="isUnit10">10개씩 보기</option>
    <option value="20" :selected="isUnit20">20개씩 보기</option>
  </select>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "ArticleUnitSelect",
  // data () {
  // },
  methods: {
    ...mapActions(['setCommunityArticleUnit',
                    'setReviews', 'setFrees', 'setTotals', 'setHots']),

    onChange(event) {
      // 현재 page번호와 개수 단위 임시 저장
      const currentPage = this.$route.params.page
      const currentUnit = this.communityArticleUnit

      // 새로운 개수 단위 저장
      const newUnit = event.target.value
      this.setCommunityArticleUnit(newUnit)

      // 새로운 페이지로 저장 및 이동
      const tmpPage = parseInt((currentPage-1)*currentUnit/newUnit)
      const newPage = tmpPage ? tmpPage : tmpPage + 1
      // this.$router.push({ name: 'communityReview', params: {page: newPage} })
      this.setReviews(newPage)
      this.setFrees(newPage)
      this.setTotals(newPage)
      this.setHots(newPage)
    },
  },
  computed: {
    ...mapGetters(['communityArticleUnit']),
    isUnit5(){
      return this.communityArticleUnit === '5'
    },
    isUnit10(){
      return this.communityArticleUnit === '10'
    },
    isUnit20(){
      return this.communityArticleUnit === '20'
    },
  }
}
</script>

<style>

</style>