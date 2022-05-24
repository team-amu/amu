<template>
  <div class="account-error-list">
    <ul v-for="(errors, field) in authError" :key="field">
      <li v-for="(error, idx) in errors" :key="idx">
        <v-icon>mdi-alert-circle-outline</v-icon> {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'AccountErrorList',
    computed: {
      ...mapGetters(['authError'])
    },
  }
</script>

<style lang="scss" scoped>
.account-error-list {
  display: flex;
  justify-content: left;
  ul {
    padding-top: 1em;
    li, i {
      list-style: none;
      color: $dm-pt-color1;
    }
  }
  
}
</style>
