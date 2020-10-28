<template>
  <div v-if="isAuthenticated">
    <div v-if="isMessagesLoading">
      <v-boilerplate
        v-for="(msg, index) in messages"
        :key="index"
        type=" list-item-content, list-item-title, list-item-avatar,list-item-subtitle, image, actions"
      ></v-boilerplate>
    </div>
    <div v-else>
      <div
        class="d-flex text-center justify-center"
        v-if="messages.length === 0"
      >
        No notifications are here... yet.
      </div>
      <Notification
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Notification from "./Notification.vue";
import { pagination } from "./mixins/pagination.js";
import { FETCH_MESSAGES } from "../store/actions.type.js";

export default {
  name: "NotificationsList",
  mixins: [pagination],
  inject: ["theme"],
  components: {
    Notification,
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
  computed: {
    pages() {
      if (this.countMessages <= this.limit) {
        return 0;
      }
      return Math.ceil(this.countMessages / this.limit);
    },
    ...mapGetters([
      "isMessagesLoading",
      "countMessages",
      "messages",
      "isAuthenticated"
    ])
  },
  mounted() {
    this.fetchMessages();
  },
  watch: {
    currentPage(newValue) {
      this.filters.offset = (newValue - 1) * this.limit;
      this.fetchMessages();
    }
  },
  methods: {
    async fetchMessages() {
      await this.$store.dispatch(FETCH_MESSAGES, this.filters);
    }
  }
};
</script>
