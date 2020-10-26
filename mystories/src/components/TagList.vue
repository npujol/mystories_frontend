<template>
  <div class="d-flex  mx-auto" aling="center">
    <v-chip-group
      column
      class="d-flex  mx-auto"
      aling="center"
      active-class="primary--text"
    >
      <Tag v-for="tag in tags" :tag="tag.tag" :key="tag.pk"> </Tag>
    </v-chip-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Tag from "../components/Tag.vue";
import { FETCH_TAGS } from "../store/actions.type.js";

export default {
  name: "TagList",
  props: {
    tags: Array
  },
  components: {
    Tag
  }
};
</script>
