<template>
  <v-card>
    <StoryPreview :story="story" :isPreview="false" />
    <v-expansion-panels>
      <v-expansion-panel v-if="story.hadAudio">
        <v-expansion-panel-header>Audio</v-expansion-panel-header>
        <v-expansion-panel-content>
          <vuetify-audio
            :file="story.hadAudio"
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
import { FETCH_STORY } from "../store/actions.type.js";

export default {
  name: "StoryView",
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
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["story", "currentUser", "isAuthenticated"]),
    isCurrentUser() {
      return this.currentUser.username === this.story.owner.username;
    }
  },
  methods: {
    async getData() {
      await this.$store.dispatch(FETCH_STORY, { slug: this.slug });
    }
  }
};
</script>
