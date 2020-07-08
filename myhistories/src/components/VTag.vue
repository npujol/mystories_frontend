<template>
  <router-link :to="homeRoute" :class="className" v-text="tag"></router-link>
</template>

<script>
export default {
  name: "RwvTag",
  props: {
    tag: {
      type: String,
      required: true,
      default: () => ""
    },
    className: {
      type: String,
      default: "tag-pill tag-default"
    }
  },
  computed: {
    homeRoute() {
      return { name: "home-tag", params: { tag: this.tag } };
    }
  }
};
</script>
