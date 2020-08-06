<template>
  <v-btn text elevation="12" @click="toggleFollow()">
    <v-icon>mdi-account</v-icon>
    <span> {{ followUserLabel }}</span>
  </v-btn>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_PROFILE_FOLLOW,
  FETCH_PROFILE_UNFOLLOW,
  FETCH_PROFILE
} from "@/store/actions.type.js";
import RwvListErrors from "@/components/ListErrors.vue";

export default {
  name: "RwvStoryActions",
  props: {
    username: { type: String, required: true }
  },
  mounted() {
    this.$store.dispatch(FETCH_PROFILE, {
      username: this.username
    });
  },
  computed: {
    ...mapGetters(["profile", "currentUser", "isAuthenticated", "errors"]),
    followUserLabel() {
      return `${this.profile.following === "true" ? "Following" : "Follow"}`;
    },
    color() {
      return this.story.favorited === "true" ? "error" : "white";
    }
  },
  methods: {
    toggleFollow() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action =
        this.profile.following === "true"
          ? FETCH_PROFILE_UNFOLLOW
          : FETCH_PROFILE_FOLLOW;
      console.log(action, this.profile.username);
      this.$store.dispatch(action, {
        username: this.profile.username
      });
    }
  }
};
</script>
