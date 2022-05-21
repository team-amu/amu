<template>
  <div>
    <comment-form></comment-form>
    <hr>
    댓글 {{ articleInfo.comments.length }}
    <hr>
    <ul>
      <comment-item
        v-for="comment in comments"
        :key="comment.pk"
        :comment="comment"
      ></comment-item>
    </ul>
  </div>
</template>

<script>
import CommentForm from '@/components/community/CommentForm'
import CommentItem from '@/components/community/CommentItem'
import { mapGetters } from 'vuex'
export default {
  name: "CommentSection",
  components: { CommentForm, CommentItem },
  props: { comments: Array },
  computed: {
    ...mapGetters(['articleInfo'])
  }
}
</script>

<style>

</style>