<template>
  <div>
    

    <form
      @submit.prevent="signup(payload)"
      class="profile-form"
    >
      <h1>회원가입</h1>
      <v-file-input 
        v-model="profile.profile_image"
        class="file-input"
        label="프로필 사진 등록"></v-file-input>
      <input
        required type="text"
        placeholder="아이디"
        v-model="credentials.username"
        id="username" />
      
      <div class="password-section">
        <input
          required :type="pw1"
          placeholder="비밀번호"
          v-model="credentials.password1"
          class="password-input"
          id="password1" />
        <v-icon
          class="visiable-icon"
          v-if="showPW1"
          @click.prevent="toggleShow1()"
        >mdi-eye-off</v-icon>
        <v-icon
          class="visiable-icon"
          v-if="!showPW1"
          @click.prevent="toggleShow1()"
        >mdi-eye</v-icon>
      </div>

      <div class="password-section">
        <input
          required :type="pw2"
          placeholder="비밀번호 확인"
          v-model="credentials.password2"
          class="password-input"
          id="password2" />
        <v-icon
          class="visiable-icon"
          v-if="showPW2"
          @click.prevent="toggleShow2()"
        >mdi-eye-off</v-icon>
        <v-icon
          class="visiable-icon"
          v-if="!showPW2"
          @click.prevent="toggleShow2()"
        >mdi-eye</v-icon>
      </div>

      <input
        required type="email"
        placeholder="이메일"
        v-model="credentials.email"
        id="email" />
      <input
        required type="text"
        placeholder="닉네임"
        v-model="profile.nickname"
        id="nickname" />
      
      <!-- 에러 메시지 위치 -->
      <account-error-list v-if="authError"></account-error-list>

      <button class="submit-btn">회원가입</button>
      <div class="back-btn-section">
        <button
          class="back-btn"
          @click.prevent="goBack"
        >BACK</button>
      </div>
    </form>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AccountErrorList from '@/components/AccountErrorList.vue'
export default {
  components: { AccountErrorList },
  name: "SignupView",
  data() {
    return {
      pw1: 'password',
      pw2: 'password',
      showPW1: 'false',
      showPW2: 'false',
      payload: {
        credentials: {
          username: '',
          password1: '',
          password2: '',
          email: '',
      },
        profile: {
          profile_image: null,
          nickname: '',
        },
      }
    }
  },
  computed: {
    ...mapGetters(['authError']),
    profile () {
      return this.payload.profile
    },
    credentials () {
      return this.payload.credentials
    },
  },
  methods: {
    ...mapActions(['signup', 'goBack']),
    toggleShow1() {
      this.showPW1 = !this.showPW1;
      if (this.showPW1) {
        this.pw1 = 'password'
      } else {
        this.pw1 = 'text'
      }
    },
    toggleShow2() {
      this.showPW2 = !this.showPW2;
      if (this.showPW2) {
        this.pw2 = 'password'
      } else {
        this.pw2 = 'text'
      }
    }
  }
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
  }

  .back-btn-section {
    display: flex;
    justify-content: right;
    align-self: flex-end;
    .back-btn {
      @include back-btn1;
    }
  }

  .file-input {
    @include input-style1;
  }
}

// .visiable-icon {
//   position : absolute;
//   transform : translatey(-5%);
// }
</style>
