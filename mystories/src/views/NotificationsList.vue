<template>
  <v-card color="basil" aling="center" class="mx-auto">
    <v-card-title class="d-flex text-center justify-center">
      <h3 class=" font-weight-bold basil--text">
        Notifications
      </h3>
    </v-card-title>
    <v-spacer></v-spacer>
    <div v-if="isMessagesLoading">
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
        v-else
        v-for="(msg, index) in messages"
        :message="msg"
        :key="index"
      />
    </div>
    <v-pagination
      v-if="pages > 0"
      :total-visible="5"
      v-model="currentPage"
      :length="pages"
    ></v-pagination>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import RwvNotification from "@/components/VNotification.vue";
import { FETCH_MESSAGES } from "../store/actions.type.js";

export default {
  name: "RwvNotificationsList",
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
      if (this.countMessages <= this.limit) {
        return 0;
      }
      return Math.ceil(this.countMessages / this.limit);
    },
    ...mapGetters(["messages", "limit", "isMessagesLoading", "countMessages"])
  },
  watch: {
    currentPage(newValue) {
      this.listConfig.filters.offset = (newValue - 1) * this.limit;
      this.fetchMessages();
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
