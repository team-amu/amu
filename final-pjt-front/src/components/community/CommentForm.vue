<template>
  <form
    id="comment-form"
    @submit.prevent="onSubmit"
    @keyup.enter="onSubmit"
  >
    <textarea
      id="comment-input"
      v-model="content"
      name="commentInput"
      placeholder="댓글 작성..."
      required
    ></textarea>
    <button id="comment-btn">등록</button>
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

<style lang="scss" scoped>
#comment-form {
  @include flex-gap(column, 1);

  #comment-input {
    @include f-6;
    @include wh-ratio(16, 3);
    width: 100%;
    padding: 1em;
    border-radius: 10px;
    background-color: white;
    outline: none;
  }

  #comment-btn {
    @include pt-btn1;
    margin: 0;
    padding: .2em 0;
  }
}
</style>