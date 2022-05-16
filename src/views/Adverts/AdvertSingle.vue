<template>
  <div>
    <page-title>
      <template #title>
        Article Single
      </template>
      <template #buttons>
        <v-btn
            :to="{
              name: 'Advert Index'
            }"
        >
          Back to adverts list
        </v-btn>
      </template>
    </page-title>

    <v-progress-linear
        v-if="!loaded"
        indeterminate
    />
    <v-card
        v-else
        class="pa-6"
    >
      <div class="d-flex mb-2" v-if="advert.editableForAuthUser">
        <v-btn
            color="red"
            class="mr-2"
            @click="deleteAdvert()"
            :loading="deleteRequestPending"
            light
        >
          Delete
        </v-btn>
        <v-btn
            color="green"
            :to="{
                name: 'Advert Edit',
                params: {
                  advertID: advert.id
                }
              }"
        >
          Update
        </v-btn>
      </div>
      <v-carousel
          v-if="advert.images.length > 0"
          v-model="activeAdvertImage"
          height="300px"
          class="my-5"
      >
        <v-carousel-item
            v-for="advert in advert.images"
            :key="advert.path"
        >
          <img :src="advert.path" style="width: 100%;height: 300px;object-fit: contain"/>
        </v-carousel-item>
      </v-carousel>
      <h2>{{ advert.title }}</h2>
      <h6 class="my-2">{{ advert.created_at }}</h6>

      <p class="my-2">{{advert.description}}</p>
    </v-card>
  </div>
</template>

<script>
import {deleteAdvertApi, getAdvertApi} from "@/api/adverts";
import PageTitle from "@/components/PageTitle";

export default {
  name: "AdvertSingle",
  components: {PageTitle},
  data: () => ({
    loaded: false,
    activeAdvertImage: null,
    advert: {},

    deleteRequestPending: false,
  }),
  methods: {
    deleteAdvert() {
      this.deleteRequestPending = true;
      deleteAdvertApi(this.advert.id)
        .then(() => {
          this.$router.push({
            name: "Advert Index"
          })
        })
        .catch(error => {
          console.log('error while deleting project', error);
          this.$toast.error('Error while deleting project, something went wrong');
        })
        .finally(() => {
          this.deleteRequestPending = false;
        })
    }
  },
  async mounted() {
    await getAdvertApi(this.$route.params.advertID)
        .then(response => {
          this.advert = response.data;
        })
        .catch(error => {
          console.log(error);
          this.$toast.error('Unexpected error on loading project');
        })
        .finally(() => {
          this.loaded = true;
        });
  }
}
</script>

<style scoped>

</style>