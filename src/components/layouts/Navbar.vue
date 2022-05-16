<template>

  <v-navigation-drawer
      permanent
      color="primary"
      dark
      app
  >
    <div class="d-flex align-center text--white pa-3">
      <div class="px-2 white--text">
        Adverts.com
      </div>

    </div>
    <v-list dense>
      <template v-for="item in navbarItems">
        <v-list-item
            :to="item.link"
            :key="item.label"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ item.label }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </template>


    </v-list>
  </v-navigation-drawer>

</template>

<script>
export default {
  name: "Navbar",

  computed: {
    navbarItems() {
      return [
        {
          label: 'Adverts',
          link: {
            name: 'Advert Index'
          }
        },
        {
          label: 'Profile',
          link: {
            name: 'Profile'
          }
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>