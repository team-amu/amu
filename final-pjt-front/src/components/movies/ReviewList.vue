<template>
  <div>
    <!-- 왜 언디파인 되는거지?ㅠㅠ 찾아보기!-->
    <div v-for="review in reviews" :key="review.pk">
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
import _ from 'lodash'

export default {
  name: 'ReviewList',
  components: { ReviewItem },
  data() {
    return {
      // recentTwoReviews: [],
      isCheck: false,
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
  },
  watch: {
    movieRecentTwoReviews: {
      handler() {
        this.isCheck = !_.isEmpty(this.movieRecentTwoReviews)
      }
    }
  },
  created() {

  }
}
</script>

<style>

</style>