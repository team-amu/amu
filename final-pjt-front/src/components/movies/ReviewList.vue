<template>
  <div>
    <div v-for="review in recentTwoReviews" :key="review.id">
      <router-link :to="{ name: 'articleDetail', params: { articlePk : review.id } }">
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
  created() {
    const reverseArray = [...this.reviews].reverse() // 최근 리뷰만 2개 뽑기
    this.recentTwoReviews = reverseArray.splice(0, 2)
  }
}
</script>

<style>

</style>