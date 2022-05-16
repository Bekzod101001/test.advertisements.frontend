<template>
  <div>
    <div class="d-flex flex-wrap">
      <h2>
        <slot name="title"/>
      </h2>
      <div class="d-flex ml-auto">
        <slot name="buttons"/>
      </div>
    </div>
    <v-divider class="my-5"/>
  </div>
</template>

<script>
export default {
  name: "PageTitle"
}
</script>

<style scoped>

</style>