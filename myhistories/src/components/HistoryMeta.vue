<template>
  <div class="history-meta">
    <router-link
      :to="{ name: 'profile', params: { username: history.author.username } }"
    >
      <img :src="history.author.image" />
    </router-link>
    <div class="info">
      <router-link
        :to="{ name: 'profile', params: { username: history.author.username } }"
        class="author"
      >
        {{ history.author.username }}
      </router-link>
      <span class="date">{{ history.createdAt | date }}</span>
    </div>
    <rwv-history-actions
      v-if="actions"
      :history="history"
      :canModify="isCurrentUser()"
    ></rwv-history-actions>
    <button
      v-else
      class="btn btn-sm pull-xs-right"
      @click="toggleFavorite"
      :class="{
        'btn-primary': history.favorited,
        'btn-outline-primary': !history.favorited
      }"
    >
      <i class="ion-heart"></i>
      <span class="counter"> {{ history.favoritesCount }} </span>
    </button>
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
