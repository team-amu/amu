<template>
  <section id="comment-section">
    <comment-form></comment-form>
    <div id="comment-count-part">
      <div id="comment-count">
        댓글 {{ articleInfo.comments.length }}
      </div>
    </div>
    <ul id="comment-list-part" v-if="isComments">
      <comment-item
        v-for="comment in comments"
        :key="comment.pk"
        :comment="comment"
      ></comment-item>
    </ul>
  </section>
</template>

<script>
import CommentForm from '@/components/community/CommentForm'
import CommentItem from '@/components/community/CommentItem'
import { mapGetters } from 'vuex'
import _ from 'lodash';
export default {
  name: "CommentSection",
  components: { CommentForm, CommentItem },
  props: { comments: Array },
  computed: {
    ...mapGetters(['articleInfo']),
    isComments() {
      return !_.isEmpty(this.articleInfo.comments)
    }
  }
}
</script>

<style lang="scss" scoped>
#comment-section {
  @include flex-gap(column, 1);
  @include f-5;
  color: white;

  #comment-count-part {
    @include flex;
    justify-content: flex-start;

    // #comment-count {}
  }

  #comment-list-part {
    @include flex-gap(column, 1);
    padding: 0;
  }
}
</style>