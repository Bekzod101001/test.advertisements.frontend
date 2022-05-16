<template>
  <div>
    <page-title>
      <template #title>
        Adverts
      </template>
      <template #buttons>
        <v-btn
            :to="{
              name: 'Advert Create'
            }"
            color="primary"
        >
          Create advert
        </v-btn>
      </template>
    </page-title>


    <p>Found adverts: {{pagination.totalElements}}</p>

    <v-data-table
        class="elevation-3"
        :loading="!loaded"
        :items-per-page="ITEMS_PER_PAGE"
        :headers="headers"
        :items="adverts"
        :options.sync="options"
        hide-default-footer
        :page.sync="pagination.activePage"
        :server-items-length="pagination.totalElements"
        @page-count="pageCount = $event"
        @update:options="getAdverts()"

    >
      <template v-slot:item.actions="{item}">
        <v-btn
            icon
            x-large
            color="primary"
            class="ml-2"
            :to="{
              name: 'Advert Single',
              params: {
                advertID: item.id
              }
            }"
        >
          <v-icon>
            mdi-eye
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-pagination
        class="mt-4"
        v-model="pagination.activePage"
        :length="pagination.totalPages"
    />


  </div>
</template>

<script>
import {getAdvertsApi} from "@/api/adverts";
import PageTitle from "@/components/PageTitle";

export default {
  name: "AdvertIndex",
  components: {PageTitle},
  data: () => ({
    ITEMS_PER_PAGE: 10,

    options: {},

    loaded: false,

    adverts: [],
    pagination: {
      activePage: 1,
      totalPages: 0,
      totalElements: 0,
    },

    headers: [
      {
        text: 'Title',
        value: 'title',
      },
      {
        text: 'Created At',
        value: 'created_at',
        width: 150,
      },
      {
        text: 'Author',
        value: 'author',
        width: 150,
        sortable: false
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false
      },
    ]
  }),
  computed: {
    sortBy() {
      if(this.options.sortBy.length === 0) return null

      return this.options.sortBy[0]
    },
    sortType() {
      if(!this.sortBy) return null
      if(this.options.sortDesc.length === 0) return null

      return this.options.sortDesc[0] ? 'desc' : 'asc'
    }
  },
  methods: {
    getAdverts(){
      this.loaded = false;
      console.log(this.options);
      getAdvertsApi({
          sortBy: this.sortBy,
          sortType: this.sortType,
          page: this.pagination.activePage,
          itemsPerPage: this.ITEMS_PER_PAGE
        })
        .then(response => {
          this.adverts = response.data.items;
          this.pagination = response.data.pagination;
        })
        .catch(error => {
          console.log('error on loading projects', error);
          this.$toast.error('Error on loading projects');
        })
        .finally(() => {
          this.loaded = true;
        })
    }
  }
}
</script>

<style scoped>

</style>