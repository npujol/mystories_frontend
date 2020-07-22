<template>
  <v-card min-width="80%" class="mx-auto" aling="center" tile outlined>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title
          class="d-flex text-center justify-center headline"
          aling="center"
          @click="
            linkTo('history', {
              slug: history.slug
            })
          "
        >
          <h2 class="d-flex font-weight-bold basil--text text-center">
            {{ history.title }}
          </h2>
        </v-list-item-title>
        <v-spacer></v-spacer>
        <v-list-item-subtitle
          class="d-flex text-center justify-center headline"
          aling="center"
        >
          <h3 class="d-flex font-weight-bold basil--text text-center">
            by {{ history.author.username }}
          </h3>
          <v-list-item-avatar
            @click="linkTo('profile', { username: history.author.username })"
            color="grey"
          >
            <img class="is-rounded" :src="history.author.image" />
          </v-list-item-avatar>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
      height="194"
    ></v-img>
    <v-card-actions>
      <v-spacer></v-spacer>
      <rwv-history-actions
        :history="history"
        :canModify="isCurrentUser()"
      ></rwv-history-actions>
    </v-card-actions>

    <v-card-text class="mx-auto" aling="center">
      <p class="text-center align-center">{{ history.createdAt | date }}</p>
      <p class="text-center align-center">{{ history.description }}</p>
      <TagList :tags="history.tags" />
      <div aling="center" v-html="parseMarkdown(history.body)"></div>
      <div min-width="80%" class="row mx-auto" aling="center">
        <div min-width="80%" class="mx-auto" aling="center">
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
            to add comments on this history.
          </p>
          <v-spacer></v-spacer>
          <RwvComment
            v-for="(comment, index) in comments"
            :slug="slug"
            :comment="comment"
            :key="index"
          >
          </RwvComment>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import marked from "marked";
import store from "@/store";
import RwvComment from "@/components/Comment.vue";
import RwvCommentEditor from "@/components/CommentEditor.vue";
import TagList from "../components/TagList.vue";
import RwvHistoryActions from "../components/HistoryActions.vue";

import { FETCH_HISTORY, FETCH_COMMENTS } from "@/store/actions.type.js";

export default {
  name: "rwv-history",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  components: {
    RwvComment,
    RwvCommentEditor,
    TagList,
    RwvHistoryActions
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(FETCH_HISTORY, to.params.slug),
      store.dispatch(FETCH_COMMENTS, to.params.slug)
    ]).then(() => {
      next();
    });
  },
  computed: {
    ...mapGetters(["history", "currentUser", "comments", "isAuthenticated"])
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
      if (this.currentUser.username && this.history.author.username) {
        return this.currentUser.username === this.history.author.username;
      }
    },
    toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      let action =
        this.history.favorited === "false" ? FAVORITE_ADD : FAVORITE_REMOVE;
      this.$store.dispatch(action, this.history.slug);
    }
  }
};
</script>
