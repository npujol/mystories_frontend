<template>
  <div class="history-page">
    <div class="banner">
      <div class="container">
        <h1>{{ history.title }}</h1>
        <RwvHistoryMeta :history="history" :actions="true"></RwvHistoryMeta>
      </div>
    </div>
    <div class="container page">
      <div class="row history-content">
        <div class="col-xs-12">
          <div v-html="parseMarkdown(history.body)"></div>
          <ul class="tag-list">
            <li v-for="tag of history.tags" :key="tag.tag + tag.pk">
              <RwvTag :tag="tag"></RwvTag>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="history-actions">
        <RwvHistoryMeta :history="history" :actions="true"></RwvHistoryMeta>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <RwvCommentEditor
            v-if="isAuthenticated"
            :slug="slug"
            :userImage="currentUser.image"
          >
          </RwvCommentEditor>
          <p v-else>
            <router-link :to="{ name: 'login' }">Sign in</router-link>
            or
            <router-link :to="{ name: 'register' }">sign up</router-link>
            to add comments on this history.
          </p>
          <RwvComment
            v-for="(comment, index) in comments"
            :slug="slug"
            :comment="comment"
            :key="index"
          >
          </RwvComment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import marked from "marked";
import store from "@/store";
import RwvHistoryMeta from "@/components/HistoryMeta.vue";
import RwvComment from "@/components/Comment.vue";
import RwvCommentEditor from "@/components/CommentEditor.vue";
import RwvTag from "@/components/VTag";
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
    RwvHistoryMeta,
    RwvComment,
    RwvCommentEditor,
    RwvTag
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
    }
  }
};
</script>
