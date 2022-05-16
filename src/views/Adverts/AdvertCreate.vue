<template>
  <div>
    <page-title>
      <template #title>
        Create Advert
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
    <advert-single-management
      action-btn-label="Create"
      :action-pending="requestPending"
      :action-handler="createAdvert"
    />

  </div>
</template>

<script>
import {createAdvertApi} from "@/api/adverts";
import PageTitle from "@/components/PageTitle";
import AdvertSingleManagement from "@/components/Adverts/AdvertSingleManagement";

export default {
  name: "AdvertCreate",
  components: {AdvertSingleManagement, PageTitle},
  data: () => ({
    requestPending: false,

  }),
  methods: {
    createAdvert(advert){
      this.requestPending = true;

      let newAdvertFormData = new FormData();
      newAdvertFormData.append('title', advert.title);
      newAdvertFormData.append('description', advert.description);
      console.log(advert.images);
      advert.images.forEach(image => {
        newAdvertFormData.append('images[]', image);
      })

      createAdvertApi(newAdvertFormData)
        .then(() => {
          this.$toast.success('New Advert Created');
          this.$router.push({
            name: 'Advert Index'
          });
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.requestPending = false;
        });
    }
  }
}
</script>

<style scoped>

</style>