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
import { linkTo } from "./mixins/linkTo.js";
export default {
  name: "Tag",
  mixins: [linkTo],
  props: {
    tag: {
      type: String,
      required: true,
      default: () => ""
    },
    disabled: {
      type: Boolean,
      required: false,
      default: () => false
    }
  }
};
</script>
