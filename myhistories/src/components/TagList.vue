<template>
  <v-chip-group column active-class="primary--text">
    <RwvTag v-for="tag in tags" :tag="tag.tag" :key="tag.pk"> </RwvTag>
  </v-chip-group>
</template>

<script>
import { mapGetters } from "vuex";
import RwvTag from "../components/VTag.vue";
import { FETCH_TAGS } from "../store/actions.type.js";

export default {
  name: "TagList",
  props: {
    tags: Array
  },
  components: {
    RwvTag
  }
};
</script>
