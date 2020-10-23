<template>
  <v-card class="mx-auto" dark outlined>
    <v-card-title>
      <v-icon medium left>
        mdi-comment
      </v-icon>
      <span class="title font-weight-light"> Comment</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      {{ comment.body }}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            :src="comment.owner.image"
            class="elevation-6"
            alt=""
            @click="linkTo('profile', { username: comment.owner.username })"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="text-decoration-underline primary--text"
            @click="linkTo('profile', { username: comment.owner.username })"
          >
            {{ comment.owner.username }}
          </v-list-item-title>
        </v-list-item-content>
        <v-spacer></v-spacer>
        <v-tooltip v-if="isCurrentUser" top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              class="subheading mr-1"
              :disabled="inProgress"
              color="error"
              icon
              small
              @click="destroy()"
            >
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
          <span>Delete</span>
        </v-tooltip>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { COMMENT_DELETE } from "../store/actions.type.js";
import { linkTo } from "./mixins/linkTo.js";

export default {
  name: "Comment",
  mixins: [linkTo],
  props: {
    slug: { type: String, required: true },
    comment: { type: Object, required: true }
  },
  data() {
    return {
      inProgress: false,
      preview: "https://picsum.photos/510/300?random"
    };
  },
  mounted() {
    if (this.comment.owner.image) {
      this.preview = this.comment.owner.image;
    }
  },
  computed: {
    isCurrentUser() {
      if (this.currentUser.username && this.comment.owner.username) {
        return this.comment.owner.username === this.currentUser.username;
      }
      return false;
    },
    ...mapGetters(["currentUser"])
  },
  methods: {
    async destroy() {
      this.inProgress = true;
      await this.$store.dispatch(COMMENT_DELETE, {
        slug: this.slug,
        commentId: this.comment.id
      });
      this.inProgress = false;
      this.$router.go();
    }
  }
};
</script>
