<template>
  <v-app-bar
    flat
    app
  >
    <h2>Test task - adverts</h2>
    <div class="ml-auto">
      <template v-if="userIsAuthenticated">
        {{user.email}}
        <v-btn
            icon
            class="ml-auto"
            :to="{
              name: 'Profile'
            }"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn
            class="ml-auto"
            icon
            @click="logout()"
        >
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          :to="{
            'name': 'Login'
          }"
        >
          Login
        </v-btn>
      </template>
    </div>
  </v-app-bar>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['userIsAuthenticated'])
  },
  methods: {
    logout(){
      this.$store.dispatch('auth/logout')
          .then(() => {
            this.$router.push({
              name: 'Main'
            })
            localStorage.removeItem('authToken');
          })
    }
  }
}
</script>

<style scoped>

</style>