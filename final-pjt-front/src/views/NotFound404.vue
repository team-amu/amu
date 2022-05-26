<template>
  <div class="container-404">
    <div>
      <h1 class="main-title">404 Not Found</h1>
      <h1 class="main-title">존재하지 않는 페이지입니다</h1>
      <button id="back-button" @click="goDoubleBack">이전으로 돌아가기</button>
      <button id="back-button" @click="goHome">HOME으로 돌아가기</button>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "NotFound404",
  methods: {
    ...mapActions(['goDoubleBack', 'goHome']),
  }
}
</script>

<style lang="scss" scoped>
.container-404 {
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 3em auto;

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