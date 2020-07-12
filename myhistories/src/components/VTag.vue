<template>
  <router-link :to="homeRoute">
    <b-tag type="is-primary" attached> {{ tag }} </b-tag>
  </router-link>
</template>

<script>
export default {
  name: "RwvTag",
  props: {
    tag: {
      type: String,
      required: true,
      default: () => ""
    }
  },
  computed: {
    homeRoute() {
      return { name: "home-tag", params: { tag: this.tag } };
    }
  }
};
</script>
