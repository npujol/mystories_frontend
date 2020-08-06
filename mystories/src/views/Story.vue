<template>
  <v-card outline>
    <v-img :src="story.image" class="white--text align-end" height="200px">
    </v-img>
    <v-list two-line>
      <v-list-item>
        <v-list-item-avatar
          @click="linkTo('profile', { username: story.author.username })"
          color="grey"
        >
          <img class="is-rounded" :src="story.author.image" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            ><router-link
              class="logo-font"
              :to="{
                name: 'profile',
                params: { username: story.author.username }
              }"
            >
              {{ story.author.username }}</router-link
            ></v-list-item-title
          >
          <v-list-item-subtitle>Author</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <RwvProfileFollow
            :username="story.author.username"
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
    <TagList :tags="story.tags" />
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
      <v-expansion-panel>
        <v-expansion-panel-header>Story</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div aling="center" v-html="parseMarkdown(story.bodyMarkdown)"></div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <RwvCommentslist :story="story"></RwvCommentslist>
    <!-- <div class="mx-auto" aling="center">
      <RwvCommentEditor
        v-if="isAuthenticated"
        :slug="slug"
        :userImage="currentUser.image"
      >
      </RwvCommentEditor>
      <p v-else>
        <router-link :to="{ name: 'login' }">Sign in</router-link>
        or
        <router-link :to="{ name: 'register' }">Sign up</router-link>
        to add comments on this story.
      </p>
      <v-spacer></v-spacer>
      <RwvComment
        v-for="(comment, index) in comments"
        :slug="slug"
        :comment="comment"
        :key="index"
      >
      </RwvComment>
    </div> -->
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import marked from "marked";
import store from "@/store";
import RwvProfileFollow from "@/components/ProfileFollow.vue";
// import RwvComment from "@/components/Comment.vue";
// import RwvCommentEditor from "@/components/CommentEditor.vue";
import RwvCommentslist from "@/components/CommentsList.vue";

import TagList from "../components/TagList.vue";
import RwvStoryActions from "../components/StoryActions.vue";

import { FETCH_STORY, FETCH_COMMENTS } from "@/store/actions.type.js";

export default {
  name: "rwv-story",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  components: {
    // RwvComment,
    // RwvCommentEditor,
    TagList,
    RwvStoryActions,
    RwvProfileFollow,
    RwvCommentslist
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(FETCH_STORY, to.params.slug),
      store.dispatch(FETCH_COMMENTS, to.params.slug)
    ]).then(() => {
      next();
    });
  },
  computed: {
    ...mapGetters(["story", "currentUser", "comments", "isAuthenticated"])
  },
  methods: {
    parseMarkdown(content) {
      return marked(content);
    },
    linkTo(route, params) {
      if (params.length === 0) {
        this.$router.push({ name: route });
      }
      this.$router.push({ name: route, params: params });
    },
    isCurrentUser() {
      if (this.currentUser.username && this.story.author.username) {
        return this.currentUser.username === this.story.author.username;
      }
    },
    toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      let action =
        this.story.favorited === "false" ? FAVORITE_ADD : FAVORITE_REMOVE;
      this.$store.dispatch(action, this.story.slug);
    }
  }
};
</script>
