<template>
  <v-chip draggable @click="linkTo('home', { tag: tag })"> {{ tag }} </v-chip>
  <!-- <router-link :to="homeRoute">
    <a type="is-primary" attached> {{ tag }} </a>
  </router-link> -->
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
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: "home" });
      });
    },
    linkTo(route, params) {
      if (params.length === 0) {
        this.$router.push({ name: route });
      }
      this.$router.push({ name: route, params: params });
    }
  }
};
</script>
