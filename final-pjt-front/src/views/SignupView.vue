<template>
  <div>
    <h1>회원가입</h1>

    <account-error-list v-if="authError"></account-error-list>

    <form @submit.prevent="signup(payRoad)">
      <div>
        <label for="username">Username: </label>
        <input  v-model="payRoad.credentials.username" type="text" id="username" required/>
      </div>
      <div>
        <label for="password1">Password: </label>
        <input v-model="payRoad.credentials.password1" type="password" id="password1" required/>
      </div>
      <div>
        <label for="password2">Password Confirmation:</label>
        <input v-model="payRoad.credentials.password2" type="password" id="password2" required />
      </div>
      <div>
        <label for="email">email:</label>
        <input v-model="payRoad.credentials.email" type="email" id="email" required />
      </div>
      <div>
        <label for="nickname">nickname:</label>
        <input v-model="payRoad.profile.nickname" type="text" id="nickname" required />
      </div>
      <div>
        <button>Signup</button>
      </div>
    </form>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AccountErrorList from '../components/AccountErrorList.vue'
export default {
  components: { AccountErrorList },
  name: "SignupView",
  data() {
    return {
      payRoad: {
        credentials: {
          username: '',
          password1: '',
          password2: '',
          email: '',
       },
        profile: {
          nickname: '',
        },
      }
    }
  },
  computed: {
    ...mapGetters(['authError'])
  },
  methods: {
    ...mapActions(['signup']),
  }
}
</script>

<style>

</style>