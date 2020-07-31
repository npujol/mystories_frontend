<template>
  <!-- Used when user is also author -->

  <span v-if="canModify">
    <v-btn icon elevation="12">
      <v-icon>mdi-heart</v-icon>
      <span> {{ story.favoritesCount }} </span>
    </v-btn>
    <v-btn
      icon
      elevation="12"
      @click="linkTo('story-edit', { slug: story.slug })"
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn
      :loading="loading"
      :disabled="loading"
      icon
      elevation="12"
      @click="deleteStory()"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </span>
  <!-- Used in StoryView when not author -->
  <span v-else>
    <v-btn text elevation="12" @click="toggleFavorite" @color="color">
      <v-icon>mdi-heart</v-icon>
      <span> {{ favoriteStoryLabel }} </span>
    </v-btn>
    <v-btn text elevation="12" @click="toggleFollow" @color="color">
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
  name: "RwvStoryActions",
  data() {
    return {
      loader: null,
      loading: false
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  },
  props: {
    story: { type: Object, required: true }
  },
  computed: {
    ...mapGetters(["profile", "isAuthenticated"]),
    followUserLabel() {
      return `${this.profile.following === "true" ? "Following" : "Follow"} ${
        this.story.author.username
      }`;
    },
    favoriteStoryLabel() {
      return this.story.favorited === "true" ? "Favorite" : "";
    },
    color() {
      return this.story.favorited === "true" ? "success" : "blue-grey";
    },
    canModify() {
      return this.story.author.username === this.profile.username;
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_PROFILE, {
      username: this.story.author.username
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
        username: this.story.author.username
      });
    },
    async deleteStory() {
      try {
        this.loading = true;
        await this.$store.dispatch(HISTORY_DELETE, this.story.slug);
        this.loading = false;
        this.$router.go();
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
