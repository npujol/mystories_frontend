<template>
  <div>
    <div v-if="isLoading">
      <v-boilerplate
        v-for="(story, index) in stories"
        :key="index"
        name="loading"
        type="list-item-avatar, list-item-content, list-item-title, list-item-subtitle, image, actions"
      ></v-boilerplate>
    </div>
    <div v-else>
      <div class="text--aling-center" v-if="stories.length === 0">
        No stories are here... yet.
      </div>
      <StoryPreview
        :story="story"
        :isPreview="true"
        v-for="(story, index) in stories"
        :key="story.title + index"
        class="ma-2"
      />
    </div>
    <v-pagination
      v-if="pages > 0"
      v-model="currentPage"
      :total-visible="5"
      :length="pages"
    ></v-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StoryPreview from "./StoryPreview.vue";
import { FETCH_STORIES } from "../store/actions.type.js";

export default {
  name: "RwvStoryList",
  inject: ["theme"],
  components: {
    StoryPreview,
    VBoilerplate: {
      functional: true,
      render(h, { data, props, children }) {
        return h(
          "v-skeleton-loader",
          {
            ...data,
            props: {
              boilerplate: true,
              elevation: 2,
              ...props
            }
          },
          children
        );
      }
    }
  },
  props: {
    type: {
      type: String,
      required: false,
      default: "all"
    },
    owner: {
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
        offset: (this.currentPage - 1) * this.limit,
        limit: this.limit
      };
      if (this.owner) {
        filters.ownerUserUsername = this.owner;
      }
      if (this.tag) {
        filters.tagsTag = this.tag;
      }
      if (this.favorited) {
        filters.favoritedByUserUsername = this.favorited;
      }
      return {
        type,
        filters
      };
    },
    pages() {
      if (this.isLoading || this.storiesCount <= this.limit) {
        return 0;
      }
      return Math.ceil(this.storiesCount / this.limit);
    },
    ...mapGetters(["storiesCount", "isLoading", "stories", "limit"])
  },
  watch: {
    currentPage(newValue) {
      this.listConfig.filters.offset = (newValue - 1) * this.limit;
      this.fetchStories();
    },
    type() {
      this.resetPagination();
      this.fetchStories();
    },
    owner() {
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
      this.$store.dispatch(FETCH_STORIES, this.listConfig);
    },
    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    }
  }
};
</script>
