<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="12">
      <div v-if="isLoading" class="history-preview">Loading histories...</div>
      <div v-else>
        <div v-if="histories.length === 0" class="history-preview">
          No histories are here... yet.
        </div>
        <RwvHistoryPreview
          v-for="(history, index) in histories"
          :history="history"
          :key="history.title + index"
        />
        <VPagination :pages="pages" :currentPage.sync="currentPage" />
      </div> </v-col
  ></v-row>
</template>

<script>
import { mapGetters } from "vuex";
import RwvHistoryPreview from "./VHistoryPreview.vue";
import VPagination from "./VPagination.vue";
import { FETCH_HISTORIES } from "../store/actions.type.js";

export default {
  name: "RwvHistoryList",
  components: {
    RwvHistoryPreview,
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
      if (this.isLoading || this.historiesCount <= this.itemsPerPage) {
        return [];
      }
      return [
        ...Array(Math.ceil(this.historiesCount / this.itemsPerPage)).keys()
      ].map(e => e + 1);
    },
    ...mapGetters(["historiesCount", "isLoading", "histories"])
  },
  watch: {
    currentPage(newValue) {
      this.listConfig.filters.offset = (newValue - 1) * this.itemsPerPage;
      this.fetchHistories();
    },
    type() {
      this.resetPagination();
      this.fetchHistories();
    },
    author() {
      this.resetPagination();
      this.fetchHistories();
    },
    tag() {
      this.resetPagination();
      this.fetchHistories();
    },
    favorited() {
      this.resetPagination();
      this.fetchHistories();
    }
  },
  mounted() {
    this.fetchHistories();
  },
  methods: {
    fetchHistories() {
      this.$store.dispatch(FETCH_HISTORIES);
    },
    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    }
  }
};
</script>
