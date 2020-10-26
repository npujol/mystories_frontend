<template>
  <v-container fluid>
    <v-fab-transition v-if="isAuthenticated">
      <v-btn
        fab
        color="red accent-2"
        button
        right
        fixed
        @click="linkTo('story-new', {})"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-card outlined>
      <v-img :src="preview" class="white--text align-end" height="200px">
        <v-container background-color="transparent">
          <v-row>
            <v-card-title class="headline font-weight-bold">
              {{ profile.username }}
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-tooltip v-if="isCurrentUser" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    @click="
                      linkTo('settings', { username: currentUser.username })
                    "
                  >
                    <v-icon>mdi-account-edit</v-icon>
                  </v-btn>
                </template>
                <span>Edit Profile</span>
              </v-tooltip>
              <v-tooltip v-if="!isCurrentUser" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    :color="followUserColor"
                    @click="toggleFollow"
                  >
                    <v-icon>mdi-account-check</v-icon>
                  </v-btn>
                </template>
                <span>{{ followUserMessage }}</span>
              </v-tooltip>
            </v-card-actions>
          </v-row>
        </v-container>
      </v-img>
      <v-card-title shrink class="headline font-weight-bold">
        <v-list two-line>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="primary--text">
                About {{ profile.username }}
              </v-list-item-title>
              <v-list-item-content>
                {{ profile.bio }}
              </v-list-item-content>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-title>
      <v-card-subtitle class="text-center aling-center justify-space-around">
        <h2 class="font-weight-bold basil--text text-center">
          A place to share yours stories
        </h2>
      </v-card-subtitle>
      <v-alert v-if="errors && errors.error" dismissible type="error">
        {{ errors.error | error }}
      </v-alert>
      <v-spacer></v-spacer>
      <template>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          grow
          centered
          icons
        >
          <v-tab
            class="white--text"
            @click="linkTo('profile', { username: profile.username })"
          >
            <v-icon>mdi-account</v-icon>
            Stories
          </v-tab>
          <v-tab
            v-if="isCurrentUser"
            class="white--text"
            @click="linkTo('profile-favorites', { username: profile.username })"
          >
            <v-icon color="white">mdi-heart</v-icon>
            Favorites
          </v-tab>
        </v-tabs>
      </template>
      <v-card-text>
        <router-view></router-view>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "@/store";
import { linkTo } from "../components/mixins/linkTo.js";

import {
  FETCH_PROFILE,
  PROFILE_FOLLOW,
  PROFILE_UNFOLLOW
} from "../store/actions.type.js";

export default {
  name: "ProfileView",
  mixins: [linkTo],
  data() {
    return {
      tab: null,
      preview: "https://picsum.photos/510/300?random"
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    ...mapGetters(["currentUser", "profile", "isAuthenticated"]),
    followUserColor() {
      return this.profile.following === "true" ? "error" : "white";
    },
    followUserMessage() {
      return this.profile.following === "true" ? "Unfollow" : "Follow";
    },
    isCurrentUser() {
      if (this.currentUser.username && this.profile.username) {
        return this.currentUser.username === this.profile.username;
      }
      return false;
    }
  },
  async beforeRouteUpdate(to, from, next) {
    await store.dispatch(FETCH_PROFILE, {
      username: to.params.username
    });
    return next();
  },
  async beforeRouteEnter(to, from, next) {
    await store.dispatch(FETCH_PROFILE, { username: to.params.username });
    return next();
  },
  mounted() {
    if (this.profile.image) {
      this.preview = this.profile.image;
    }
  },
  methods: {
    toggleFollow() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action =
        this.profile.following === "true" ? PROFILE_UNFOLLOW : PROFILE_FOLLOW;
      this.$store.dispatch(action, {
        username: this.profile.username
      });
    }
  },
  watch: {
    $route(to) {
      this.$store.dispatch(FETCH_PROFILE, to.params);
    }
  }
};
</script>
