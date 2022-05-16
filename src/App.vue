<template>

  <v-app>
    <v-progress-linear
        indeterminate
        v-if="!loaded"
    />
    <div
        class="fill-height"
        v-else
    >
      <Header/>
      <Navbar/>
      <v-main>
        <div class="pa-8">
          <router-view/>
        </div>
      </v-main>
    </div>

  </v-app>
</template>

<script>
import Header from "@/components/layouts/Header";
import Navbar from "@/components/layouts/Navbar";

export default {
  name: "App",
  data: () => ({
    loaded: false
  }),
  components: {Navbar, Header},
  mounted() {
    this.$store.dispatch('auth/getAuthUser')
      .finally(() => {
        this.loaded = true;
      });
  }
}
</script>

<style lang="scss" src="./assets/app.scss"/>
