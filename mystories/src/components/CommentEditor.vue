<template>
  <v-card class="mx-auto" outlined>
    <v-card-title class="d-flex text-center justify-center"
      >Add comment</v-card-title
    >
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
      <v-btn elevation="12" color="primary accent-4" @click="onSubmit()"
        >OK</v-btn
      >
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
    content: { type: String, required: false }
  },
  data() {
    return {
      comment: this.content || null,
      errors: {}
    };
  },
  methods: {
    async onSubmit() {
      try {
        if (this.comment !== null) {
          const data = this.$store.dispatch(COMMENT_CREATE, {
            slug: this.slug,
            comment: this.comment
          });
        }
        this.comment = null;
        this.errors = {};
      } catch (error) {
        this.errors = error;
      }
    }
  }
};
</script>
