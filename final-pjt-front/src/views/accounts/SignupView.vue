<template>
  <div>
    <account-error-list v-if="authError"></account-error-list>

    <form
      @submit.prevent="signup(payload)"
      class="profile-form"
    >
      <h1>회원가입</h1>
      <v-file-input 
        v-model="profile.profile_image"
        class="file-input"
        label="프로필 사진 추가"></v-file-input>
      <input
        required type="text"
        placeholder="아이디"
        v-model="credentials.username"
        id="username" />
      <input
        required type="password"
        placeholder="비밀번호"
        v-model="credentials.password1"
        id="password1" />
      <input
        required type="password"
        placeholder="비밀번호 확인"
        v-model="credentials.password2"
        id="password2" />
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

  input {
    @include input-style1;
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
</style>
