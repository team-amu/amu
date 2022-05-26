<template>
  <div>
    <div v-for="review in reviews" :key="review.pk">
      <router-link :to="{ name: 'articleDetail', params: { articlePk : review.pk } }">
        <review-item :review="review"></review-item>
      </router-link>
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
    isArticle() {
      return this?.reviews?.length > 2
    }
  },
  methods: {
    onClick () {
      this.isMore = !this.isMore
    }
  },
  watch: {
    reviews: {
      handler() {
        // const reverseArray = [...this?.reviews]?.reverse()
        // this.recentTwoReviews = reverseArray.splice(0, 2)
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