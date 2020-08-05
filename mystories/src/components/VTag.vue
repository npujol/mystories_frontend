<template>
  <v-chip
    label
    small
    draggable
    :disabled="disabled"
    @click="linkTo('home-tag', { tag: tag })"
  >
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
    },
    disabled: {
      type: Boolean,
      required: true,
      default: () => false
    }
  },
  methods: {
    linkTo(route, params) {
      if (params.length === 0) {
        this.$router.push({ name: route });
      }
      this.$router.push({ name: route, params: params });
    }
  }
};
</script>
