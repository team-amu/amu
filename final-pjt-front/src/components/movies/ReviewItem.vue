<template>
  <div>
    <p>작성자 : {{ review.user.profile.nickname }}</p>
    <p>제목 : {{ review.title }}</p>
    <p>내용 : {{ review.content }}</p>
  </div>
</template>

<script>
export default {
  name: 'ReviewItem',
  props: {
    review: Object,
  }
}
</script>

<style>

</style>