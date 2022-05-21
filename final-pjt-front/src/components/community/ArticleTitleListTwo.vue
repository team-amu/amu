<template>
  <div>
    <h1>ArticleTitleList Two</h1>
    <ul>
      <review-title-item
        v-for="review in reviews"
        :key="review.pk"
        :review="review"
      ></review-title-item>
    </ul>
  </div>
</template>

<script>
import ReviewTitleItem from "@/components/community/ReviewTitleItem";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ArticleTitleListTwo",
  components: {
    ReviewTitleItem,
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['reviews']),
  },
  methods: {
    ...mapActions(['setReviewArticles']),
  },
  created() {
    const page = this.$route.params.page;
    this.setReviewArticles(page)
  }
}
</script>

<style>

</style>