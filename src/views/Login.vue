<template>
  <v-card class="pa-6">
    <h2 class="mb-4">Login to dashboard</h2>
    <v-text-field
        v-model="email"
        :prepend-icon="mdiAccount"
        name="login"
        label="Login"
        type="email"
    />
    <v-text-field
        v-model="password"
        id="password"
        :prepend-icon="mdiLock"
        label="Password"
        type="password"
    />
    <div class="d-flex">
      <v-btn
          color="primary"
          @click="login()"
          :loading="requestPending"
      >
        Login
      </v-btn>
    </div>
  </v-card>
</template>

<script>

import {mdiAccount, mdiLock} from '@mdi/js';
import {loginApi} from "@/api/auth";
import {validateEmail} from "@/utils/dataManipulations";


export default {
  name: "Login",
  data: () => ({
    mdiAccount: mdiAccount,
    mdiLock: mdiLock,

    email: '',
    password: '',

    requestPending: false,
  }),
  methods: {
    login(){
      if(!this.email){
        this.$toast.error('E-mail is not filled');
        return;
      }

      if(!validateEmail(this.email)){
        this.$toast.error('E-mail is in incorrect format');
        return;
      }

      if(!this.password){
        this.$toast.error('Password is not filled');
        return;
      }

      this.requestPending = true;
      loginApi(this.email, this.password)
        .then(response => {
          let token = response.data.token;
          localStorage.setItem('authToken', token);
          this.$store.dispatch('auth/getAuthUser');
          this.$toast.success('Success login');
          this.$router.push({
            name: 'Main'
          })
        }).catch(error => {
          const errorCode = error.response.data.errorCode;
          if(errorCode === 'InvalidCredentials'){
            this.$toast.error('Invalid credentials');
          }else{
            this.$toast.error('Server error, try again later!');
          }
        }).finally(() => {
          this.requestPending = false;
        });
    }
  }
}
</script>

<style scoped>

</style>