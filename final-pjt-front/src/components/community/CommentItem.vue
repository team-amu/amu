<template>
  <li>
    작성자 : 
    <router-link
      :to="{ name: 'profileLike', params: { username: commentData.commentUser.username } }">
      {{ commentData.commentUser.username }}
    </router-link>
    <br>
    <span v-if="!isEditing">
      내용 : {{ commentData.content }}
      <br>
      작성시간 : {{ commentData.createdAt }}
    </span>

    <span v-if="isEditing">
      <input type="text" v-model="commentData.content">
      <button @click="onUpdate">완료</button>
      <button @click="cancelEditing">취소</button>
    </span>
    
    <span v-if="isCommentAuthor && !isEditing">
      <button @click="switchIsEditing">수정</button>
      <button @click="deleteComment(commentData)">삭제</button>
    </span>
    <hr>
  </li>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "CommentItem",
  props: {
    comment: Object,
  },
  data() {
    return {
      isEditing: false,
      pastInputData: '',
      commentData: {
        commentUser: this.comment.user,
        articlePk: this.comment.article,
        commentPk: this.comment.pk,
        content: this.comment.content,
        createdAt: this.comment.created_at,
        updatedAt: this.comment.updated_at,
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    isCommentAuthor() {
      return this.currentUser.pk === this.comment.user.pk
    }
  },
  methods: {
    ...mapActions(['updateComment', 'deleteComment']),
    switchIsEditing() {
      this.pastInputData = this.commentData.content
      this.isEditing = !this.isEditing
    },
    cancelEditing() {
      this.commentData.content = this.pastInputData
      this.isEditing = !this.isEditing
    },
    onUpdate() {
      this.updateComment(this.commentData)
      this.isEditing = false
    },
    // cancelEdit() {
    //   this.pastInputData = this.commentData.content
    // }
  }
}
</script>

<style>

</style>