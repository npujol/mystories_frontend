<template>
  <!-- Used when user is also the owner -->
  <div v-if="isCurrentUser">
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
          @click="linkTo('story', { slug: story.slug })"
        >
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>
      <span>View</span>
    </v-tooltip>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
          @click="linkTo('story-edit', { slug: story.slug })"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <span>Edit</span>
    </v-tooltip>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          :disabled="inProgress"
          color="error"
          icon
          @click="destroy()"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <span>Delete</span>
    </v-tooltip>
  </div>
  <!-- Used in StoryView when user is not the owner -->
  <div v-else>
    <RwvStoryFavorite v-if="!isCurrentUser" :story="story"></RwvStoryFavorite>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { STORY_DELETE } from "../store/actions.type.js";
import RwvStoryFavorite from "../components/StoryFavorite.vue";
import { linkTo } from "./mixins/linkTo.js";

export default {
  name: "StoryActions",
  mixins: [linkTo],
  data() {
    return {
      inProgress: false
    };
  },
  props: {
    story: { type: Object, required: true },
    isPreview: { type: Boolean, required: true }
  },
  components: {
    RwvStoryFavorite
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"]),
    isCurrentUser() {
      return this.currentUser.username === this.story.owner.username;
    }
  },
  methods: {
    async destroy() {
      this.inProgress = true;
      await this.$store.dispatch(STORY_DELETE, {
        slug: this.story.slug
      });
      this.inProgress = false;
      if (this.isPreview) {
        this.$router.go();
      } else {
        this.$router.push({ name: "home" });
      }
    }
  }
};
</script>
