<template>
  <div
    class="column is-4 is-offset-1 has-margin-top-auto has-margin-bottom-auto"
  >
    <div class="info is-size-5">
      <div class="title">
        <h2 class="has-text-black is-family-secondary has-text-weight-bold">
          {{ history.title }}
        </h2>
      </div>

      <router-link
        :to="{
          name: 'profile',
          params: { username: history.author.username }
        }"
        class="author"
      >
        <h2>Author: {{ history.author.username }}</h2>
      </router-link>

      <h3>{{ history.createdAt | date }}</h3>
    </div>
    <p v-text="history.description" />
    <router-link :to="historyLink" class="preview-link">
      <span>Read more...</span>
    </router-link>

    <rwv-history-actions
      v-if="actions"
      :history="history"
      :canModify="isCurrentUser()"
    ></rwv-history-actions>
    <b-button
      v-else
      @click="toggleFavorite"
      :class="{
        'button is-primary': history.favorited,
        'button is-light': !history.favorited
      }"
    >
      <span class="counter"> {{ history.favoritesCount }} </span>
    </b-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RwvHistoryActions from "@/components/HistoryActions.vue";
import { FAVORITE_ADD, FAVORITE_REMOVE } from "@/store/actions.type.js";

export default {
  name: "RwvHistoryMeta",
  components: {
    RwvHistoryActions
  },
  props: {
    history: {
      type: Object,
      required: true
    },
    actions: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  methods: {
    isCurrentUser() {
      if (this.currentUser.username && this.history.author.username) {
        return this.currentUser.username === this.history.author.username;
      }
      return false;
    },
    toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action = this.history.favorited ? FAVORITE_REMOVE : FAVORITE_ADD;
      this.$store.dispatch(action, this.history.slug);
    }
  }
};
</script>
