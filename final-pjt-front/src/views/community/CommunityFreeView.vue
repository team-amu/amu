<template>
  <div>
    <h1>Community Free</h1>
    <article-unit-select></article-unit-select>
    <ul>
      
      <free-title-item
        v-for="free in frees"
        :key="free.pk"
        :free="free"
      >
      </free-title-item>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FreeTitleItem from "@/components/community/FreeTitleItem";
import ArticleUnitSelect from '@/components/community/ArticleUnitSelect';
export default {
  name: "CommunityTotalView",
  components: {
    FreeTitleItem,
    ArticleUnitSelect,
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['frees'])
  },
  methods: {
    ...mapActions(['setArticlePage', 'setFrees','setFreePageNum'])
  },
  created() {
    const page = this.$route.params.page;
    this.setFreePageNum(page)
    this.setFrees(page)
  }
}
</script>

<style>

</style>