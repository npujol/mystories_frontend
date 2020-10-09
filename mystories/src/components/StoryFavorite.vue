<template>
  <v-btn icon elevation="12" @click="toggleFavorite()" :color="color">
    <v-icon>mdi-heart</v-icon>
    <span> {{ story.favoritesCount }} </span>
  </v-btn>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FAVORITE_ADD,
  FAVORITE_REMOVE,
  FETCH_PROFILE
} from "@/store/actions.type.js";

export default {
  name: "RwvStoryActions",
  props: {
    story: { type: Object, required: true }
  },
  computed: {
    ...mapGetters(["profile", "currentUser", "isAuthenticated"]),
    favoriteStoryLabel() {
      return this.story.favorited === "true" ? "Favorite" : "";
    },
    color() {
      return this.story.favorited === "true" ? "error" : "white";
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_PROFILE, {
      username: this.story.owner.username
    });
  },
  methods: {
    toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action =
        this.story.favorited === "true" ? FAVORITE_REMOVE : FAVORITE_ADD;
      this.$store.dispatch(action, this.story.slug);
    }
  }
};
</script>
