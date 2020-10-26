<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        icon
        :color="color"
        @click="toggleFavorite"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </template>
    <span>{{ label }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import {
  STORY_FAVORITE_CREATE,
  STORY_FAVORITE_DELETE
} from "../store/actions.type.js";

export default {
  name: "StoryFavorite",
  props: {
    story: { type: Object, required: true }
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    label() {
      return this.story.favorited === "true"
        ? "Remove Favorite"
        : "Add Favorite";
    },
    color() {
      return this.story.favorited === "true" ? "error" : "white";
    }
  },
  methods: {
    async toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action =
        this.story.favorited === "true"
          ? STORY_FAVORITE_DELETE
          : STORY_FAVORITE_CREATE;
      const data = await this.$store.dispatch(action, this.story.slug);
    }
  }
};
</script>
