<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <v-card color="basil" class="mx-auto">
        <v-list-item>
          <v-list-item-avatar color="grey">
            <img class="is-rounded" :src="profile.image" />
          </v-list-item-avatar>
          <v-spacer></v-spacer>
          <v-list-item-content>
            <v-list-item-title>
              {{ profile.username }}
            </v-list-item-title>

            <v-list-item-subtitle>
              {{ profile.email }}
              <p>{{ profile.bio }}</p>
              <template v-if="isCurrentUser()">
                <v-btn icon :to="{ name: 'settings' }" v-if="isCurrentUser()">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <template v-else
                ><v-btn text @click="toggleFollow">
                  <v-icon>mdi-account</v-icon>
                  <span> {{ followUserLabel }}</span>
                </v-btn>
              </template>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab @click="linkTo('profile', {})">
            <v-icon>mdi-account</v-icon>
            My histories
          </v-tab>
          <v-tab
            v-if="isAuthenticated"
            @click="
              linkTo('profile-favorites', { username: currentUser.username })
            "
          >
            <v-icon>mdi-heart</v-icon>
            Favorites
          </v-tab>
        </v-tabs>
        <router-view></router-view>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_PROFILE,
  FETCH_PROFILE_FOLLOW,
  FETCH_PROFILE_UNFOLLOW
} from "@/store/actions.type.js";

export default {
  name: "RwvProfile",
  data() {
    return {
      tab: null
    };
  },
  computed: {
    ...mapGetters(["currentUser", "profile", "isAuthenticated"]),
    followUserLabel() {
      return `${this.profile.following === "true" ? "Following" : "Follow"} ${
        this.profile.username
        }`;
    }
  },
  methods: {
    isCurrentUser() {
      if (this.currentUser.username && this.profile.username) {
        return this.currentUser.username === this.profile.username;
      }
      return false;
    },
    toggleFollow() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action =
        this.profile.following === "true"
          ? FETCH_PROFILE_UNFOLLOW
          : FETCH_PROFILE_FOLLOW;
      this.$store.dispatch(action, {
        username: this.profile.username
      });
    },
    linkTo(route, params) {
      if (params.length === 0) {
        this.$router.push({ name: route });
      }
      this.$router.push({ name: route, params: params });
    }
  },
  watch: {
    $route(to) {
      this.$store.dispatch(FETCH_PROFILE, to.params);
    }
  }
};
</script>
