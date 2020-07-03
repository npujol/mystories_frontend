<template>
  <div class="history-preview">
    <RwvHistoryMeta isPreview :history="history" />
    <router-link :to="historyLink" class="preview-link">
      <h1 v-text="history.title" />
      <p v-text="history.description" />
      <span>Read more...</span>
      <TagList :tags="history.tagList" />
    </router-link>
  </div>
</template>

<script>
import RwvHistoryMeta from "./HistoryMeta.vue";
import TagList from "./TagList.vue";

export default {
  name: "RwvHistoryPreview",
  components: {
    RwvHistoryMeta,
    TagList
  },
  props: {
    history: { type: Object, required: true }
  },
  computed: {
    historyLink() {
      return {
        name: "history",
        params: {
          slug: this.history.slug
        }
      };
    }
  }
};
</script>
