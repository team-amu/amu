<template>
  <form
    @submit.prevent="onSubmit"
    @keyup.enter="onSubmit"
  >
    <textarea
        v-model="content"
        name="commentInput"
        id="commentInput"
        placeholder="댓글 작성..."
        required
        ></textarea>
    <br>
    <button>등록</button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "CommentForm",
  data() {
    return {
      content: ''
    }
  },
  computed: {
    ...mapGetters(['articleInfo'])
  },
  methods: {
    ...mapActions(['createComment']),
    onSubmit() {
      this.createComment({ articlePk: this.articleInfo.pk, content: this.content, })
      this.content = ''
    }
  }
}
</script>

<style>

</style>