<template>
  <router-link :to="homeRoute">
    <a type="is-primary" attached> {{ tag }} </a>
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
