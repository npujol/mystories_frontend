<template>
  <div v-if="isLoading">Loading stories...</div>
  <div v-else>
    <div v-if="stories.length === 0">
      No stories are here... yet.
    </div>
    <RwvStoryPreview
      v-for="(story, index) in stories"
      :story="story"
      :key="story.title + index"
    />
    <VPagination :pages="pages" :currentPage.sync="currentPage" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RwvStoryPreview from "./VStoryPreview.vue";
import VPagination from "./VPagination.vue";
import { FETCH_HISTORIES } from "../store/actions.type.js";

export default {
  name: "RwvStoryList",
  components: {
    RwvStoryPreview,
    VPagination
  },
  props: {
    type: {
      type: String,
      required: false,
      default: "all"
    },
    author: {
      type: String,
      required: false
    },
    tag: {
      type: String,
      required: false
    },
    favorited: {
      type: String,
      required: false
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    listConfig() {
      const { type } = this;
      const filters = {
        offset: (this.currentPage - 1) * this.itemsPerPage,
        limit: this.itemsPerPage
      };
      if (this.author) {
        filters.author = this.author;
      }
      if (this.tag) {
        filters.tag = this.tag;
      }
      if (this.favorited) {
        filters.favorited = this.favorited;
      }
      return {
        type,
        filters
      };
    },
    pages() {
      if (this.isLoading || this.storiesCount <= this.itemsPerPage) {
        return [];
      }
      return [
        ...Array(Math.ceil(this.storiesCount / this.itemsPerPage)).keys()
      ].map(e => e + 1);
    },
    ...mapGetters(["storiesCount", "isLoading", "stories"])
  },
  watch: {
    currentPage(newValue) {
      this.listConfig.filters.offset = (newValue - 1) * this.itemsPerPage;
      this.fetchStories();
    },
    type() {
      this.resetPagination();
      this.fetchStories();
    },
    author() {
      this.resetPagination();
      this.fetchStories();
    },
    tag() {
      this.resetPagination();
      this.fetchStories();
    },
    favorited() {
      this.resetPagination();
      this.fetchStories();
    }
  },
  mounted() {
    this.fetchStories();
  },
  methods: {
    fetchStories() {
      this.$store.dispatch(FETCH_HISTORIES);
    },
    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    }
  }
};
</script>
