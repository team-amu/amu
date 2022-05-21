<template>
  <div>
    작성자 : {{ comment.user.username }}
    <br>
    내용 : {{ comment.content }}
    <br>
    작성시간 : {{ comment.created_at }}
    <hr>
  </div>
</template>

<script>
export default {
  name: "CommentItem",
  props: {
    comment: Object,
  }
}
</script>

<style>

</style>