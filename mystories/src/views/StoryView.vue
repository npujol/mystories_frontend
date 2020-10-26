<template>
  <v-card>
    <StoryPreview :story="story" :isPreview="false" />
    <v-expansion-panels>
      <v-expansion-panel v-if="hadAudio">
        <v-expansion-panel-header>Audio</v-expansion-panel-header>
        <v-expansion-panel-content>
          <vuetify-audio
            :file="storyAudio.speechFile"
            color="info"
            downloadable
          ></vuetify-audio>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Body</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-html="story.body"></div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-spacer></v-spacer>
    <CommentsList :story="story"></CommentsList>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import marked from "marked";
import CommentsList from "../components/CommentsList.vue";
import StoryPreview from "../components/StoryPreview.vue";
import { linkTo } from "../components/mixins/linkTo.js";
import {
  FETCH_STORY,
  FETCH_COMMENTS,
  FETCH_STORY_AUDIO
} from "../store/actions.type.js";

export default {
  name: "rwv-story",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  components: {
    StoryPreview,
    CommentsList,
    VuetifyAudio: () => import("vuetify-audio")
  },
  data() {
    return {
      storyAudio: null
    };
  },
  mounted() {
    this.$store.dispatch(FETCH_STORY, this.slug);
    this.$store.dispatch(FETCH_COMMENTS, this.slug);
    this.getAudio();
  },
  computed: {
    ...mapGetters(["story", "currentUser", "isAuthenticated"]),
    hadAudio() {
      return this.storyAudio !== null;
    },
    isCurrentUser() {
      return this.currentUser.username === this.story.owner.username;
    }
  },
  methods: {
    async getAudio() {
      try {
        const data = await this.$store.dispatch(FETCH_STORY_AUDIO, {
          storySlug: this.slug
        });
        this.storyAudio = data;
      } catch (error) {
        this.storyAudio = null;
      }
    }
  }
};
</script>
