<template>
  <v-card class="mx-auto" outlined>
    <v-card-title class="headline" dark>Add comment</v-card-title>
    <v-card-text>
      <RwvListErrors :errors="errors" />
      <v-form>
        <v-textarea
          v-model="comment"
          placeholder="Write a comment..."
          rows="3"
        ></v-textarea>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="mr-4" @click="onSubmit(slug, comment)">Post</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import RwvListErrors from "./ListErrors.vue";
import { COMMENT_CREATE } from "../store/actions.type.js";

export default {
  name: "RwvCommentEditor",
  components: { RwvListErrors },
  props: {
    slug: { type: String, required: true },
    content: { type: String, required: false },
    userImage: { type: String, required: false }
  },
  data() {
    return {
      comment: this.content || null,
      errors: {}
    };
  },
  methods: {
    onSubmit(slug, comment) {
      this.$store
        .dispatch(COMMENT_CREATE, { slug, comment })
        .then(() => {
          this.comment = null;
          this.errors = {};
        })
        .catch(response => {
          this.errors = response.errors;
        });
    }
  }
};
</script>
