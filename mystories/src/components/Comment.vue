<template>
  <v-card outlined>
    <v-card-title class="d-flex text-center justify-center">
      Comment
    </v-card-title>
    <v-list two-line>
      <v-list-item>
        <v-list-item-avatar
          @click="linkTo('profile', { username: comment.owner.username })"
          color="grey"
        >
          <img class="is-rounded" :src="comment.owner.image" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            ><router-link
              class="logo-font"
              :to="{
                name: 'profile',
                params: { username: comment.owner.username }
              }"
            >
              {{ comment.owner.username }}</router-link
            ></v-list-item-title
          >
          <v-list-item-subtitle>{{
            comment.createdAt | date
          }}</v-list-item-subtitle>
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
    <v-card-text class="d-flex text-center justify-center">
      {{ comment.body }}
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { COMMENT_DELETE } from "../store/actions.type.js";

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
      if (this.currentUser.username && this.comment.owner.username) {
        return this.comment.owner.username === this.currentUser.username;
      }
      return false;
    },
    ...mapGetters(["currentUser"])
  },
  methods: {
    async destroy(slug, commentId) {
      try {
        this.inProgress = true;
        await this.$store.dispatch(COMMENT_DELETE, { slug, commentId });
        this.inProgress = false;
        this.$router.go();
      } catch (err) {}
    },
    linkTo(route, params) {
      if (params.length === 0) {
        if (this.$router.currentRoute.name !== route) {
          this.$router.push({ name: route });
        }
      }
      if (this.$router.currentRoute.name !== route) {
        this.$router.push({ name: route, params: params });
      }
    }
  }
};
</script>
