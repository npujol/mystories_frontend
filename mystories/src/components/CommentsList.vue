<template>
  <div>
    <div class="mx-auto" aling="center">
      <CommentEditor class="mb-2" v-if="isAuthenticated" :slug="story.slug">
      </CommentEditor>
      <p class="pa-2" aling="center" v-else>
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
      <div class="mb-2 justify-center" v-if="comments.length === 0">
        No comments are here... yet.
      </div>
      <div class="mx-auto" aling="center">
        <v-spacer></v-spacer>
        <Comment
          class="mb-2"
          v-for="(comment, index) in comments"
          :slug="story.slug"
          :comment="comment"
          :key="index"
        >
        </Comment>
      </div>
    </div>
    <v-pagination
      v-if="pages > 0"
      :total-visible="5"
      v-model="currentPage"
      :length="pages"
    ></v-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RwvStoryPreview from "./VStoryPreview.vue";
import Comment from "../components/Comment.vue";
import CommentEditor from "../components/CommentEditor.vue";
import { FETCH_COMMENTS } from "../store/actions.type.js";

export default {
  name: "RwvStoryList",
  inject: ["theme"],
  components: {
    Comment,
    CommentEditor,
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
  mounted() {
    this.fetchComments();
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
