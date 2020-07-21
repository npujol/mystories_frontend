<template>
  <!-- Used when user is also author -->
  <span v-if="canModify">
    <router-link class="btn btn-sm btn-outline-secondary" :to="editHistoryLink">
      <i class="ion-edit"></i> <span>&nbsp;Edit</span>
    </router-link>
    <span>&nbsp;&nbsp;</span>
    <v-btn class="btn btn-outline-danger btn-sm" @click="deleteHistory">
      <i class="ion-trash-a"></i> <span>&nbsp;Delete</span>
    </v-btn>
  </span>
  <!-- Used in HistoryView when not author -->
  <span v-else>
    <v-btn class="btn btn-sm btn-outline-secondary" @click="toggleFollow">
      <i class="ion-plus-round"></i> <span>&nbsp;</span>
      <span v-text="followUserLabel" />
    </v-btn>
    <span>&nbsp;&nbsp;</span>
    <v-btn
      class="btn btn-sm"
      @click="toggleFavorite"
      :class="toggleFavoriteButtonClasses"
    >
      <i class="ion-heart"></i> <span>&nbsp;</span>
      <span v-text="favoriteHistoryLabel" /> <span>&nbsp;</span>
      <span class="counter" v-text="favoriteCounter" />
    </v-btn>
  </span>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FAVORITE_ADD,
  FAVORITE_REMOVE,
  HISTORY_DELETE,
  FETCH_PROFILE_FOLLOW,
  FETCH_PROFILE_UNFOLLOW
} from "@/store/actions.type.js";

export default {
  name: "RwvHistoryActions",
  props: {
    history: { type: Object, required: true },
    canModify: { type: Boolean, required: true }
  },
  computed: {
    ...mapGetters(["profile", "isAuthenticated"]),
    editHistoryLink() {
      return { name: "history-edit", params: { slug: this.history.slug } };
    },
    toggleFavoriteButtonClasses() {
      return {
        "btn-primary": this.history.favorited,
        "btn-outline-primary": !this.history.favorited
      };
    },
    followUserLabel() {
      return `${this.profile.following ? "Unfollow" : "Follow"} ${
        this.history.author.username
      }`;
    },
    favoriteHistoryLabel() {
      return this.history.favorited ? "Unfavorite History" : "Favorite History";
    },
    favoriteCounter() {
      return `(${this.history.favoritesCount})`;
    }
  },
  methods: {
    toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action = this.history.favorited ? FAVORITE_REMOVE : FAVORITE_ADD;
      this.$store.dispatch(action, this.history.slug);
    },
    toggleFollow() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action = this.history.following
        ? FETCH_PROFILE_UNFOLLOW
        : FETCH_PROFILE_FOLLOW;
      this.$store.dispatch(action, {
        username: this.profile.username
      });
    },
    async deleteHistory() {
      try {
        await this.$store.dispatch(HISTORY_DELETE, this.history.slug);
        this.$router.push("/");
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>
