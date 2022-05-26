<template>
  <div class="container-404">
    <div id="message-box">
      <h1 class="main-title">404 Not Found</h1>
      <h1 class="main-title">잘못된 요청입니다!</h1>
    </div>
    <button id="back-button" @click="goDoubleBack">이전으로 돌아가기</button>
    <button id="back-button" @click="goHome">HOME으로 돌아가기</button>
    
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "NotFound404",
  methods: {
    ...mapActions(['goDoubleBack', 'goHome'])
  }
}
</script>

<style lang="scss" scoped>
.container-404 {
  @include flex(column);
  margin: 3em 0;

  .main-title {
    @include main-title;
    border: 0;
    margin: 0;
  }

  #back-button {
    @include back-btn1;
  }
}
</style>