<template>
  <v-card class="pa-6">
    <div v-if="!fieldIsReadonly('images')">
      <p class="mb-3">Images</p>
      <div class="d-flex">
        <v-file-input
            accept=".jpg, .jpeg, .png"
            class="mb-4 mx-2"
            v-for="fileNum in MAX_FILES"
            :key="fileNum"
            v-model="advert.images[fileNum]"
            v-once
        />
      </div>
    </div>
    <v-text-field
        v-if="!fieldIsReadonly('title')"
        class="mb-4"
        v-model="advert.title"
        label="Title"
        :counter="255"
    />
    <v-textarea
        v-if="!fieldIsReadonly('description')"
        class="mb-4"
        no-resize
        v-model="advert.description"
        label="Description"
        auto-grow
        :counter="1024"
    />
    <v-btn
        color="primary"
        @click="runHandler()"
        :loading="actionPending"
    >
      {{ actionBtnLabel }}
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: "AdvertSingleManagement",
  data: () => ({
    MAX_FILES: 3,
    advert: {},
  }),
  props: {
    readonlyFields: {
      type: Array,
      default: () => []
    },
    advertForOverride: {
      type: Object,
      default: () => ({
        title: '',
        description: '',
        images: [],
      })
    },
    actionBtnLabel: {
      type: String,
      default: () => 'Submit'
    },
    actionHandler: {
      type: Function,
      default: () => () => {},
    },
    actionPending: {
      type: Boolean,
      default: () => false,
    }
  },
  computed: {

  },
  methods: {
    fieldIsReadonly(fieldKey) {
      return this.readonlyFields.includes(fieldKey);
    },
    validateEntries () {
      let validated = true;

      if(this.advert.title.length > 255) {
        this.$toast.error('Advert Title is Too Long');
        validated = false;
      }
      if(this.advert.description.length > 1024) {
        this.$toast.error('Advert Description is Too Long');
        validated = false;
      }

      return validated
    },
    async runHandler() {

      if(!this.validateEntries()) return

      this.actionHandler(this.advert);
    },
  },
  created() {
    this.advert = this.advertForOverride;
  }
}
</script>

<style scoped>

</style>