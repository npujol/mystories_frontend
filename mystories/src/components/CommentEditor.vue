<template>
  <ValidationObserver ref="obs">
    <v-card slot-scope="{ invalid, validated }">
      <v-card-title class="d-flex text-center justify-center">
        <h3 class="d-flex font-weight-bold basil--text">Add comment</h3>
      </v-card-title>
      <v-card-text>
        <v-form>
          <ValidationProvider immediatename="comment" rules="required">
            <v-text-field
              slot-scope="{ errors, valid }"
              v-model="comment"
              :error-messages="errors"
              :success="valid"
              prepend-icon="mdi-comment"
              required
            ></v-text-field>
          </ValidationProvider>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="clear">Cancel</v-btn>
        <v-btn color="primary" @click="submit" :disabled="invalid || !validated"
          >OK</v-btn
        >
      </v-card-actions>
    </v-card>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { COMMENT_CREATE } from "../store/actions.type.js";

export default {
  name: "CommentEditor",
  components: { ValidationProvider, ValidationObserver },
  props: {
    slug: { type: String, required: true },
    content: { type: String, required: false }
  },
  data() {
    return {
      comment: this.content || null
    };
  },
  methods: {
    async clear() {
      this.email = this.password = "";
      this.$nextTick(() => {
        this.$refs.obs.reset();
      });
    },
    async submit() {
      const validated = await this.$refs.obs.validate();

      if (validated) {
        try {
          const data = await this.$store.dispatch(COMMENT_CREATE, {
            slugStory: this.slug,
            comment: this.comment
          });
          this.comment = null;
        } catch (response) {
          const errors = JSON.parse(response.response.text).errors;
          this.$refs.obs.setErrors({
            comment: errors.body
          });
        }
      }
    }
  }
};
</script>
