<template>
  <div>
    <page-title>
      <template #title>
        Edit Advert
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
    <div>
      <v-progress-linear
          v-if="!loaded"
          indeterminate
      />
      <advert-single-management
          v-else
          :action-handler="updateAdvert"
          :action-pending="requestPending"
          :advert-for-override="advert"
          :readonly-fields="['images']"
          action-btn-label="Update"
      />
    </div>
  </div>
</template>

<script>
import {getAdvertApi, updateAdvertApi} from "@/api/adverts";
import PageTitle from "@/components/PageTitle";
import AdvertSingleManagement from "@/components/Adverts/AdvertSingleManagement";

export default {
  name: "AdvertEdit",
  components: {AdvertSingleManagement, PageTitle},
  data: () => ({
    loaded: false,

    requestPending: false,
    activeAdvertImage: false,
    advert: {}
  }),
  methods: {
    updateAdvert(advert) {
      this.requestPending = true;
      updateAdvertApi(this.$route.params.advertID, {
        title: advert.title,
        description: advert.description
      })
          .then(() => {
            this.$toast.success('Advert is updated');
            this.$router.push({
              name: 'Advert Index'
            })
          })
          .catch(error => {
            console.log(error);
            this.$toast.error('Unexpected error');
          })
          .finally(() => {
            this.requestPending = false;
          });
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