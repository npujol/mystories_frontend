<template>
  <v-card>
    <v-card-title class="d-flex text-center justify-center">
      <h3 class="d-flex font-weight-bold basil--text">Comments</h3>
    </v-card-title>
    <div class="mx-auto" aling="center">
      <CommentEditor v-if="isAuthenticated" :slug="story.slug"> </CommentEditor>
      <div class="d-flex justify-space-around" v-else>
        You have to
        <p
          class="text-decoration-underline primary--text"
          @click="linkTo('login', {})"
        >
          Log in
        </p>
        or
        <p
          class="text-decoration-underline primary--text"
          @click="linkTo('register', {})"
        >
          Sign up
        </p>
        to be able to comment on this story.
      </div>
    </div>
    <div class="d-flex text-center justify-center" v-if="isCommentsLoading">
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
      <div class="d-flex text-center justify-center" v-if="commentsCount === 0">
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
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Comment from "../components/Comment.vue";
import CommentEditor from "../components/CommentEditor.vue";
import { pagination } from "../components/mixins/pagination.js";
import { linkTo } from "../components/mixins/linkTo.js";
import { FETCH_COMMENTS } from "../store/actions.type.js";

export default {
  name: "CommentsList",
  mixins: [pagination, linkTo],
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
      required: true
    }
  },
  mounted() {
    this.fetchComments();
  },
  computed: {
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
      "isAuthenticated",
      "currentUser"
    ])
  },
  watch: {
    currentPage(newValue) {
      this.filters.offset = (newValue - 1) * this.limit;
      this.fetchComments();
    }
  },
  methods: {
    async fetchComments() {
      if (this.story.slug) {
        const data = await this.$store.dispatch(FETCH_COMMENTS, {
          slugStory: this.story.slug,
          filters: this.filters
        });
      }
    }
  }
};
</script>
