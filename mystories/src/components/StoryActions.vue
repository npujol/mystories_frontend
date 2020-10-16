<template>
  <!-- Used when user is also the owner -->
  <span v-if="isCurrentUser">
    <v-btn icon @click="linkTo('story', { slug: story.slug })">
      <v-icon>mdi-eye</v-icon>
    </v-btn>

    <v-btn icon @click="linkTo('story-edit', { slug: story.slug })">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <v-btn :loading="loading" :disabled="loading" icon @click="deleteStory()">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </span>
  <!-- Used in StoryView when user is not the owner -->
  <span v-else>
    <RwvStoryFavorite v-if="!isCurrentUser" :story="story"></RwvStoryFavorite>
  </span>
</template>

<script>
import { mapGetters } from "vuex";
import { STORY_DELETE } from "../store/actions.type.js";
import RwvStoryFavorite from "../components/StoryFavorite.vue";

export default {
  name: "RwvStoryActions",
  data() {
    return {
      loader: null,
      loading: false
    };
  },
  props: {
    story: { type: Object, required: true },
    isPreview: { type: Boolean, required: true }
  },
  components: {
    RwvStoryFavorite
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
    }
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"]),
    isCurrentUser() {
      return this.currentUser.username === this.story.owner.username;
    }
  },
  methods: {
    async deleteStory() {
      try {
        this.loading = true;
        await this.$store.dispatch(STORY_DELETE, this.story.slug);
        this.loading = false;
        if (this.isPreview) {
          this.$router.go();
        } else {
          this.$router.push({ name: "home" });
        }
      } catch (err) {
        this.$router.go();
      }
    },
    linkTo(route, params) {
      if (params.length === 0) {
        if (this.$router.currentRoute.name !== route) {
          this.$router.push({ name: route });
        }
      }
      if (this.$router.currentRoute.name !== route) {
        this.$router.push({ name: route, params: params });
      }
    }
  }
};
</script>
