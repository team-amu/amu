<template>
  <div>
    <h1>Community Review</h1>
    <article-unit-select></article-unit-select>
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
import { mapGetters, mapActions } from "vuex";
import ReviewTitleItem from "@/components/community/ReviewTitleItem";
import ArticleUnitSelect from '@/components/community/ArticleUnitSelect';
export default {
  name: "CommunityTotalView",
  components: {
    ReviewTitleItem,
    ArticleUnitSelect,
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['reviews'])
  },
  methods: {
    ...mapActions(['setReviewPageNum', 'setReviews'])
  },
  created() {
    const page = this.$route.params.page;
    this.setReviewPageNum(page)
    this.setReviews(page)
  }
}
</script>

<style>

</style>