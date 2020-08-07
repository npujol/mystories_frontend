<template>
  <v-card outlined>
    <v-card-title>
      <h3 class="d-flex text-center justify-center">
        COMMENT
      </h3>
    </v-card-title>
    <v-list two-line>
      <v-list-item>
        <v-list-item-avatar
          @click="linkTo('profile', { username: comment.author.username })"
          color="grey"
        >
          <img class="is-rounded" :src="comment.author.image" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            ><router-link
              class="logo-font"
              :to="{
                name: 'profile',
                params: { username: comment.author.username }
              }"
            >
              {{ comment.author.username }}</router-link
            ></v-list-item-title
          >
          <v-list-item-subtitle>Author</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            v-if="isCurrentUser"
            :disabled="inProgress"
            icon
            @click="destroy(slug, comment.id)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-card-text>
      <p class="d-flex text-center justify-center">
        {{ comment.body }}
      </p>
      <p>Date: {{ comment.createdAt | date }}</p>
    </v-card-text>
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
  data() {
    return {
      inProgress: false
    };
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
    async destroy(slug, commentId) {
      try {
        this.inProgress = true;
        await this.$store.dispatch(COMMENT_DESTROY, { slug, commentId });
        this.inProgress = false;
        this.$router.go();
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>
