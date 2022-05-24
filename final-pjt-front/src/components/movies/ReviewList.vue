<template>
  <div>
    <!-- <router-link :to="{ name: 'communityReview', params: {page:'1'} }"> -->
      <!-- <button @click="onClick">리뷰 더보기</button> -->
    <!-- </router-link> -->
    <hr>

    <div v-if="isMore">
      <div v-for="review in recentReviews" :key="review.pk">
        <router-link :to="{ name: 'articleDetail', params: { articlePk : review.pk } }">
          <review-item :review="review"></review-item>
        </router-link>
        <hr>
      </div>
      <button @click="onClick">접기</button>
    </div>

    <div v-if="!isMore">
      <button @click="onClick">리뷰 더보기</button>
      <hr>
      <div v-for="review in recentTwoReviews" :key="review.pk">
        <router-link :to="{ name: 'articleDetail', params: { articlePk : review.pk } }">
          <review-item :review="review"></review-item>
        </router-link>
        <hr>
      </div>
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
      recentReviews: [],
      isMore: false,
    }
  },
  props: {
    reviews: Array,
  },
  computed: {
  },
  methods: {
    onClick () {
      this.isMore = !this.isMore
    }
  },
  watch: {
    reviews: {
      handler() {
        const reverseArray = [...this?.reviews]?.reverse()
        this.recentTwoReviews = reverseArray.splice(0, 2)
        this.recentReviews = [...this?.reviews]?.reverse()
      }
    }
  },
  created() {

  }
}
</script>

<style>

</style>