<template>
  <div>
    <router-link :to="{ name: 'communityReview', params: {page:'1'} }">
      <button>더보기(게시판의 리뷰페이지로 가기(현재 영화의 리뷰만 보게 할 수도 있나?))</button>
    </router-link>
    <hr>
    <div v-for="review in reviews" :key="review.pk">
    <!-- 최신 순으로 자르려고 했는데 버튼 구현 되면! -->
    <!-- <div v-for="review in recentTwoReviews" :key="review.pk"> -->
      <router-link :to="{ name: 'articleDetail', params: { articlePk : review.pk } }">
        <review-item :review="review"></review-item>
      </router-link>
      <hr>
    </div>
  </div>
</template>

<script>
import ReviewItem from '@/components/movies/ReviewItem.vue'

export default {
  name: 'ReviewList',
  components: { ReviewItem },
  data() {
    return {
      recentTwoReviews: [],
    }
  },
  props: {
    reviews: Array,
  },
  computed: {
  },
  watch: {
    reviews: {
      handler() {
        const reverseArray = [...this?.reviews]?.reverse()
        this.recentTwoReviews = reverseArray.splice(0, 2)
      }
    }
  },
  created() {

  }
}
</script>

<style>

</style>