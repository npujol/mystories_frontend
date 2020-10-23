<template>
  <div v-if="isAuthenticated">
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RwvNotification from "./Notification.vue";
import { FETCH_MESSAGES } from "../store/actions.type.js";
import { pagination } from "./mixins/pagination.js";

export default {
  name: "NotificationsList",
  mixins: [pagination],
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
  computed: {
    pages() {
      if (this.countMessages <= this.limit) {
        return 0;
      }
      return Math.ceil(this.countMessages / this.limit);
    },
    ...mapGetters([
      "messages",
      "isMessagesLoading",
      "countMessages",
      "isAuthenticated"
    ])
  },
  watch: {
    currentPage(newValue) {
      this.listConfig.offset = (newValue - 1) * this.limit;
      this.fetchMessages();
    }
  },
  mounted() {
    this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      await this.$store.dispatch(FETCH_MESSAGES, this.listConfig);
    }
  }
};
</script>
