<template>
  <v-card color="basil" aling="center" class="mx-auto">
    <v-card-title class="d-flex text-center justify-center">
      <h3 class=" font-weight-bold basil--text">
        Notifications
      </h3>
    </v-card-title>
    <v-spacer></v-spacer>
    <div v-if="!messages">
      Loading notifications...
      <v-boilerplate
        v-for="(msg, index) in messages"
        :key="index"
        class="mb-2"
        name="loading"
        type="list-item-avatar, list-item-content, list-item-title, list-item-subtitle, image, actions"
      ></v-boilerplate>
    </div>
    <div v-else>
      <div v-if="messages.length === 0">
        No notifications are here... yet.
      </div>
      <RwvNotification
        v-for="(msg, index) in messages"
        :message="msg"
        :key="index"
      />
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import RwvNotification from "@/components/VNotification.vue";
import { FETCH_MESSAGES } from "../store/actions.type.js";

export default {
  name: "RwvStoryList",
  inject: ["theme"],
  components: {
    RwvNotification,
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
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    listConfig() {
      const filters = {
        offset: (this.currentPage - 1) * this.limit,
        limit: this.limit
      };
      return {
        filters
      };
    },
    pages() {
      if (this.messages.length <= this.limit) {
        return 0;
      }
      return Math.ceil(this.messages.length / this.limit);
    },
    ...mapGetters(["messages"])
  },
  watch: {
    currentPage(newValue) {
      this.listConfig.filters.offset = (newValue - 1) * this.limit;
      this.fetchStories();
    }
  },
  mounted() {
    this.fetchMessages();
  },
  methods: {
    fetchMessages() {
      this.$store.dispatch(FETCH_MESSAGES, this.listConfig);
    },
    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    }
  }
};
</script>
