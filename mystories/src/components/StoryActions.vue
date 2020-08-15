<template>
  <!-- Used when user is also author -->

  <span v-if="canModify">
    <v-btn text elevation="12">
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
    <RwvStoryFavorite :story="story"></RwvStoryFavorite>
  </span>
</template>

<script>
import { mapGetters } from "vuex";
import { STORY_DELETE, FETCH_PROFILE } from "@/store/actions.type.js";
import RwvStoryFavorite from "@/components/StoryFavorite.vue";

export default {
  name: "RwvStoryActions",
  data() {
    return {
      loader: null,
      loading: false,
      canModify: false
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
    ...mapGetters(["profile", "currentUser", "isAuthenticated"])
  },
  mounted() {
    this.$store.dispatch(FETCH_PROFILE, {
      username: this.story.author.username
    });
    this.canModify = this.currentUser.username === this.profile.username;
  },
  methods: {
    async deleteStory() {
      try {
        this.loading = true;
        await this.$store.dispatch(STORY_DELETE, this.story.slug);
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
