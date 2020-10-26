<template>
  <v-card>
    <v-img :src="story.image" class="white--text align-end" height="200px">
      <v-container>
        <v-row>
          <v-card-title shrink class="headline font-weight-bold basil--text">
            {{ story.title }}
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-actions
            ><rwv-story-actions
              :story="story"
              :isPreview="false"
            ></rwv-story-actions
          ></v-card-actions>
        </v-row>
      </v-container>
    </v-img>
    <v-list two-line>
      <v-list-item>
        <v-list-item-avatar
          @click="linkTo('profile', { username: story.owner.username })"
        >
          <img class="is-rounded" :src="story.owner.image" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            class="text-decoration-underline primary--text"
            @click="linkTo('profile', { username: story.owner.username })"
          >
            {{ story.owner.username }}
          </v-list-item-title>
          <v-list-item-subtitle>Author</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-chip-group show-arrows class="flex pa-2">
      <Tag v-for="(value, index) in story.tags" :tag="value" :key="index">
      </Tag>
    </v-chip-group>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>Description</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p class="text-center align-center">{{ story.description }}</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
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
    <Commentslist class="pa-2" :story="story"></Commentslist>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import marked from "marked";
import Commentslist from "../components/CommentsList.vue";
import RwvStoryActions from "../components/StoryActions.vue";
import Tag from "../components/Tag.vue";
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
    Tag,
    RwvStoryActions,
    Commentslist,
    VuetifyAudio: () => import("vuetify-audio")
  },
  data() {
    return {
      errors: []
    };
  },
  mounted() {
    this.$store.dispatch(FETCH_STORY, this.slug);
    this.$store.dispatch(FETCH_COMMENTS, this.slug);
    this.$store.dispatch(FETCH_STORY_AUDIO, this.slug);
  },
  computed: {
    ...mapGetters(["story", "currentUser", "isAuthenticated", "storyAudio"]),
    hadAudio() {
      return this.storyAudio !== null;
    },
    isCurrentUser() {
      return this.currentUser.username === this.story.owner.username;
    }
  },
  methods: {
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
