Add<template>
  <div>
    <div class="mx-auto" aling="center">
      <RwvCommentEditor
        class="mb-2"
        v-if="isAuthenticated"
        :slug="story.slug"
        :userImage="currentUser.image"
      >
      </RwvCommentEditor>
      <p v-else>
        <router-link :to="{ name: 'login' }">Sign in</router-link>
        or
        <router-link :to="{ name: 'register' }">Sign up</router-link>
        to add comments on this story.
      </p>
    </div>
    <div v-if="isCommentsLoading">
      Loading comments...
      <v-boilerplate
        v-for="(story, index) in comments"
        :key="index"
        class="mb-2"
        name="loading"
        type="list-item-avatar, list-item-content, list-item-title, list-item-subtitle, image, actions"
      ></v-boilerplate>
    </div>
    <div v-else>
      <div v-if="comments.length === 0">
        No comments are here... yet.
      </div>
      <div class="mx-auto" aling="center">
        <RwvComment
          class="mb-2"
          v-for="(comment, index) in comments"
          :slug="story.slug"
          :comment="comment"
          :key="index"
        >
        </RwvComment>
      </div>
    </div>
    <v-pagination v-model="currentPage" :length="pages"></v-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RwvStoryPreview from "./VStoryPreview.vue";
import RwvComment from "@/components/Comment.vue";
import RwvCommentEditor from "@/components/CommentEditor.vue";
import { FETCH_COMMENTS } from "../store/actions.type.js";

export default {
  name: "RwvStoryList",
  inject: ["theme"],
  components: {
    RwvComment,
    RwvCommentEditor,
    VBoilerplate: {
      functional: true,

      render(h, { data, props, children }) {
        return h(
          "v-skeleton-loader",
          {
            ...data,
            props: {
              boilerplate: true,
              elevation: 2,
              ...props
            }
          },
          children
        );
      }
    }
  },
  props: {
    story: {
      type: Object,
      required: false,
      default: null
    }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(FETCH_COMMENTS, {
        slugStory: to.params.slug,
        filters: { offset: 0, limit: 10 }
      })
    ]).then(() => {
      next();
    });
  },
  computed: {
    listConfig() {
      const slugStory = this.story.slug;
      const filters = {
        offset: (this.currentPage - 1) * this.limit,
        limit: this.limit
      };
      return {
        slugStory,
        filters
      };
    },
    pages() {
      if (this.isCommentsLoading || this.commentsCount <= this.limit) {
        return 0;
      }
      return Math.ceil(this.commentsCount / this.limit);
    },
    ...mapGetters([
      "commentsCount",
      "isCommentsLoading",
      "comments",
      "limit",
      "isAuthenticated",
      "currentUser"
    ])
  },
  watch: {
    currentPage(newValue) {
      this.listConfig.filters.offset = (newValue - 1) * this.limit;
      this.fetchComments();
    }
  },
  methods: {
    fetchComments() {
      this.$store.dispatch(FETCH_COMMENTS, this.listConfig);
    },
    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    }
  }
};
</script>
