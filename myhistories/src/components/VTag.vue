<template>
  <v-chip label small draggable @click="linkTo('home', { tag: tag })">
    {{ tag }}
  </v-chip>
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
