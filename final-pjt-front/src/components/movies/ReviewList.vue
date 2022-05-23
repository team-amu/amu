<template>
  <div>
    <div v-for="review in recentTwoReviews" :key="review.pk">
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