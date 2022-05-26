<template>
  <div class="container-404">
    <h1 class="main-title">404 Not Found</h1>
    <h1 class="main-title">잘못된 요청입니다!</h1>
    <button id="back-button" @click="goBack">이전으로 돌아가기</button>
    
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "NotFound404",
  methods: {
    ...mapActions(['goBack'])
  }
}
</script>

<style lang="scss" scoped>
.container-404 {
  @include flex(column);

  .main-title {
    @include main-title;
  }

  #back-button {
    @include back-btn1;
  }
}
</style>