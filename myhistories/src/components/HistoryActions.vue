<template>
  <!-- Used when user is also author -->

  <span v-if="canModify">
    <v-btn icon>
      <v-icon @color="color">mdi-heart</v-icon>
      <span> {{ history.favoritesCount }} </span>
    </v-btn>
    <v-btn icon @click="linkTo('history-edit', { slug: history.slug })">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn icon @click="deleteHistory()">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </span>
  <!-- Used in HistoryView when not author -->
  <span v-else>
    <v-btn text @click="toggleFavorite" @color="color">
      <v-icon>mdi-heart</v-icon>
      <span> {{ favoriteHistoryLabel }} </span>
    </v-btn>
    <v-btn text @click="toggleFollow" @color="color">
      <v-icon>mdi-account</v-icon>
      <span> {{ followUserLabel }}</span>
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
  FETCH_PROFILE_UNFOLLOW,
  FETCH_PROFILE
} from "@/store/actions.type.js";

export default {
  name: "RwvHistoryActions",
  props: {
    history: { type: Object, required: true },
    canModify: { type: Boolean, required: true }
  },
  computed: {
    ...mapGetters(["profile", "isAuthenticated"]),
    followUserLabel() {
      return `${this.profile.following === "true" ? "Following" : "Follow"} ${
        this.history.author.username
      }`;
    },
    favoriteHistoryLabel() {
      return this.history.favorited === "true" ? "Favorite" : "";
    },
    color() {
      return this.history.favorited === "true" ? "success" : "blue-grey";
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_PROFILE, {
      username: this.history.author.username
    });
  },
  methods: {
    toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action =
        this.history.favorited === "true" ? FAVORITE_REMOVE : FAVORITE_ADD;
      this.$store.dispatch(action, this.history.slug);
    },
    toggleFollow() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action =
        this.profile.following === "true"
          ? FETCH_PROFILE_UNFOLLOW
          : FETCH_PROFILE_FOLLOW;
      this.$store.dispatch(action, {
        username: this.history.author.username
      });
    },
    async deleteHistory() {
      try {
        await this.$store.dispatch(HISTORY_DELETE, this.history.slug);
        this.$router.push("/");
      } catch (err) {
        console.error(err);
      }
    },
    linkTo(route, params) {
      if (params.length === 0) {
        this.$router.push({ name: route });
      }
      this.$router.push({ name: route, params: params });
    }
  }
};
</script>
