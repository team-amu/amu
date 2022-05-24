<template>
  <form
    @submit.prevent="login(credentials)"
    class="profile-form"
  >
    <h1>로그인</h1>
    <input
      v-model="credentials.username"
      required type="text" id="username"
      placeholder="ID"
    />
    
    <div class="password-section">
      <input
        required :type="pw"
        placeholder="PW"
        v-model="credentials.password"
        class="password-input"/>
      <v-icon
        class="visiable-icon"
        v-if="showPW"
        @click.prevent="toggleShow()"
      >mdi-eye-off</v-icon>
      <v-icon
        class="visiable-icon"
        v-if="!showPW"
        @click.prevent="toggleShow()"
      >mdi-eye</v-icon>
    </div>

    <!-- 에러 메시지 위치 -->
    <account-error-list v-if="authError"></account-error-list>

    <button class="submit-btn">로그인</button>
    <button
      class="signup-btn"
      @click.prevent="goSignup"
    >회원가입</button>

    <div class="back-btn-section">
      <button
        class="back-btn"
        @click.prevent="goBack"
      >BACK</button>
    </div>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import AccountErrorList from '@/components/AccountErrorList.vue'

  export default {
    name: 'LoginView',
    components: {
      AccountErrorList,
    },
    data() {
      return {
        pw: 'password',
        showPW: 'false',
        credentials: {
          username: '',
          password: '',
        }
      }
    },
  computed: {
      ...mapGetters(['authError'])
    },
    methods: {
      ...mapActions(['login', 'goBack']),
      toggleShow() {
        this.showPW = !this.showPW;
        if (this.showPW) {
          this.pw = 'password'
        } else {
          this.pw = 'text'
        }
      },
      goSignup () {
        if (confirm('회원가입 페이지로 이동하시겠습니까?')) {
          this.$router.push({ name: 'signup' })
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
.profile-form {
  @include profile-form;
  @include trans;
  @include f-5;

  h1 {
    margin-bottom: 1em;
  }

  & > input {
    @include input-style1;
  }

  .password-section {
    @include password-section1;
    gap: .5em;

    .password-input {
      @include input-style1;
      margin: 0;
      width: 3000px;
      flex-shrink: 1;
    }

    .visiable-icon {
      padding-right: .5em;
      opacity: .5;
    }
  }

  .submit-btn {
    @include pt-btn1;
    margin-top: 2em;
  }

  .signup-btn {
    @include blank-btn1;
  }

  .back-btn-section {
    display: flex;
    justify-content: right;
    align-self: flex-end;
    .back-btn {
      @include back-btn1;
    }
  }
}
</style>
