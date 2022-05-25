<template>
  <li id="comment-item">
    <section id="comment-profile">
      <router-link
        :to="{ name: 'profileLike', params: { username } }"
      >
        <!-- <img src="" alt=""> -->
        <span id="comment-profile-nickname">{{ nickname }}</span>
      </router-link>

      <span
        id="edit-btn-list"
        v-if="isCommentAuthor && !isEditing">
          <button id="edit-btn" @click="switchIsEditing">수정</button>
          <button id="remove-btn" @click="deleteComment(commentData)">삭제</button>
      </span>

      <span
        id="editing-btn-list"
        v-if="isEditing"
      >
        <button id="edit-complete-btn" @click="onUpdate">완료</button>
        <button id="edit-cancel-btn" @click="cancelEditing">취소</button>
      </span>
    </section>

    <section 
      v-if="!isEditing"
      id="comment-content"
    >
      {{ commentData.content }}
    </section>
    
    <input
      v-if="isEditing"
      id="edit-input"
      type="text"
      v-model="commentData.content"
    >

    <section id="comment-date">
      <div><v-icon>mdi-clock</v-icon> <span> 작성 {{ cuttedCreatedAt }}</span></div>
      <div><v-icon>mdi-pen</v-icon> <span> 수정 {{ cuttedUpdatedAt }}</span></div>
    </section>
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
    },
    username() {
      return this.commentData.commentUser.username
    },
    nickname() {
      return this.commentData.commentUser.profile.nickname
    },

    cuttedCreatedAt() {
      return this.timedelta(this.commentData.createdAt)
    },

    cuttedUpdatedAt() {
      return this.timedelta(this.commentData.updatedAt)
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

    timedelta (data) {
      const date1 = new Date(data);
      const date2 = new Date();
      let timedelta = Math.ceil((date2 - date1)/1000)
      if (timedelta < 60) {
        return `${timedelta}초 전`
      }
      timedelta = Math.floor(timedelta/60)
      if (timedelta < 60) {
        return `${timedelta}분 전`
      }
      timedelta = Math.floor(timedelta/60)
      if (timedelta < 24) {
        return `${timedelta}시간 전`
      }
      timedelta = Math.floor(timedelta/24)
      if (timedelta < 7) {
        return `${timedelta}일 전`
      }
      timedelta = Math.floor(timedelta/7)
      if (timedelta < 4) {
        return `${timedelta}주 전`
      }
      timedelta = Math.floor(timedelta/4)
      if (timedelta < 12) {
        return `${timedelta}달 전`
      }
      timedelta = Math.floor(timedelta/12)
      return `${timedelta}년 전`
    },
  }
}
</script>

<style lang="scss" scoped>
#comment-item {
  @include flex-gap(column, .7);
  @include f-5;
  color: black;
  background-color: white;
  border-radius: 20px;
  padding: 1em;

  #comment-profile {
    @include flex-gap(row, .5);
    justify-content: space-between;
    border-bottom: 1px solid $dm-bg-color1;
    padding: 0 1em .5em 1em;

    // #comment-profile-image {}
    #comment-profile-nickname{
      font-weight: 700;
      color: black
    }

    #edit-btn-list {
      @include flex-gap;
      @include f-6;

      #remove-btn {
        color: red;
      }
    }

    #editing-btn-list {
      @include flex-gap;
      @include f-6;
    }
  }

  #comment-content {
    @include f-6;
  }

  #edit-input {
      @include f-6;
      outline: none;
      color: green;
      width: 100%;
    }

  #comment-date {
    @include flex-gap(row, 1);
    @include f-7;
    align-self: flex-end;
    margin: 2em 1em .5em 0;

    i {
      @include f-8;
    }

    span {
      color: $dm-bg-color1;
    }

  }
}
</style>