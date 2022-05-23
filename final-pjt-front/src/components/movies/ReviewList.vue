<template>
  <div v-if="isCheck">
    <!-- 왜 언디파인 되는거지?ㅠㅠ 찾아보기!-->
    <div v-for="review in movieRecentTwoReviews" :key="review.pk">
      <router-link :to="{ name: 'articleDetail', params: { articlePk : review.pk } }">
        <review-item :review="review"></review-item>
      </router-link>
      <hr>
    </div>
  </div>
</template>

<script>
import ReviewItem from '@/components/movies/ReviewItem.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ReviewList',
  components: { ReviewItem },
  data() {
    return {
      // recentTwoReviews: [],
      // isCheck: false,
    }
  },
  props: {
    reviews: Array,
  },
  computed: {
    // 최근 리뷰 두 개만 뽑기
    // recentTwoReviews() {
    //   const reverseArray = [...this.reviews].reverse()
    //   return reverseArray.splice(0, 2)
    // }
    ...mapGetters(['movieRecentTwoReviews']),
    // isCheck() {
    //   if (this.movieRecentTwoReviews !== undefined) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
    isCheck() {
      if (this?.movieRecentTwoReviews?.length !== 0) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
  },
  created() {

  }
}
</script>

<style>

</style>