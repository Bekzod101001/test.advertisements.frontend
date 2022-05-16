<template>
  <div>
    <h2>
      Welcome, {{ userIsAuthenticated ? user.email : 'Guest' }}

    </h2>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapGetters('auth', ['userIsAuthenticated']),
    ...mapState('auth', ['user'])
  }
}
</script>

<style scoped>

</style>