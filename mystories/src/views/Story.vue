<template>
  <v-card outline>
    <v-img :src="story.image" class="white--text align-end" height="200px">
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
            ><router-link
              class="logo-font"
              :to="{
                name: 'profile',
                params: { username: story.owner.username }
              }"
            >
              {{ story.owner.username }}</router-link
            ></v-list-item-title
          >
          <v-list-item-subtitle>Author</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <RwvProfileFollow
            v-if="!isCurrentUser()"
            :username="story.owner.username"
          ></RwvProfileFollow>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-list one-line>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="d-flex text-center justify-right headline"
            aling="center"
          >
            <h2 class="d-flex font-weight-bold basil--text text-center">
              {{ story.title }}
            </h2>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <rwv-story-actions
            :story="story"
            :isPreview="false"
          ></rwv-story-actions>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-chip-group class="flex ma-5" active-class="primary--text">
      <RwvTag v-for="(value, index) in story.tags" :tag="value" :key="index">
      </RwvTag>
    </v-chip-group>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>Info</v-expansion-panel-header>
        <v-expansion-panel-content>
          <dl>
            <dt>Created:</dt>
            <dd>{{ story.createdAt | date }}</dd>
            <dt>Updated:</dt>
            <dd>{{ story.updatedAt | date }}</dd>
            <dt>Language:</dt>
            <dd>{{ story.language }}</dd>
          </dl>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Description</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p class="text-center align-center">{{ story.description }}</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel v-if="storyAudio">
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
    <RwvCommentslist :story="story"></RwvCommentslist>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import marked from "marked";
import store from "@/store";
import RwvProfileFollow from "@/components/ProfileFollow.vue";
import RwvCommentslist from "@/components/CommentsList.vue";

import RwvTag from "@/components/VTag.vue";
import RwvStoryActions from "../components/StoryActions.vue";
import {
  FETCH_STORY,
  FETCH_COMMENTS,
  FETCH_STORY_AUDIO
} from "@/store/actions.type.js";

export default {
  name: "rwv-story",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  components: {
    RwvTag,
    RwvStoryActions,
    RwvProfileFollow,
    RwvCommentslist,
    VuetifyAudio: () => import("vuetify-audio")
  },
  data() {
    return {
      errors: []
    };
  },
  async beforeRouteEnter(to, from, next) {
    await store.dispatch(FETCH_STORY, to.params.slug);
    await store.dispatch(FETCH_STORY_AUDIO, to.params.slug);
    await store.dispatch(FETCH_COMMENTS, to.params.slug);
    next();
  },
  computed: {
    ...mapGetters([
      "story",
      "currentUser",
      "comments",
      "isAuthenticated",
      "storyAudio"
    ])
  },
  methods: {
    linkTo(route, params) {
      if (params.length === 0) {
        this.$router.push({ name: route });
      }
      this.$router.push({ name: route, params: params });
    },
    isCurrentUser() {
      if (this.currentUser.username && this.story.owner.username) {
        return this.currentUser.username === this.story.owner.username;
      }
    }
  }
};
</script>
