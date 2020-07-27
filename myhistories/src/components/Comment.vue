<template>
  <v-card class="mx-wigth" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Comment</div>
        <v-list-item-subtitle>
          {{ comment.createdAt | date }}
        </v-list-item-subtitle>
        <v-list-item-title class="headline mb-1">
          {{ comment.body }}
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
        :src="comment.author.image"
        ><img :src="comment.author.image" class="is-rounded"
      /></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn v-if="isCurrentUser" icon @click="destroy(slug, comment.id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { COMMENT_DESTROY } from "../store/actions.type.js";

export default {
  name: "RwvComment",
  props: {
    slug: { type: String, required: true },
    comment: { type: Object, required: true }
  },
  computed: {
    isCurrentUser() {
      if (this.currentUser.username && this.comment.author.username) {
        return this.comment.author.username === this.currentUser.username;
      }
      return false;
    },
    ...mapGetters(["currentUser"])
  },
  methods: {
    destroy(slug, commentId) {
      this.$store.dispatch(COMMENT_DESTROY, { slug, commentId });
    }
  }
};
</script>
