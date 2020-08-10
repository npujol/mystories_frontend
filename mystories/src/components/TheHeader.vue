<!-- @format -->

<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="linkTo('home', {})">
              <h3 class="basil--text">
                Dashboard
              </h3>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-if="isAuthenticated">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                @click="linkTo('settings', { username: currentUser.username })"
              >
                <h3 class="basil--text">
                  Profile
                </h3>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                @click="
                  linkTo('story-edit', { username: currentUser.username })
                "
              >
                <h3 class="basil--text">
                  New Story
                </h3>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-heart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title @click="linkTo('profile', {})">
                <h3 class="basil--text">
                  Favorited stories
                </h3>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title @click="linkTo('profile-favorites')">
                <h3 class="basil--text">
                  My Stories
                </h3>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-btn color="white" icon @click="linkTo('home', {})">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="!isAuthenticated">
        <v-btn rounded color="error" @click="linkTo('register', {})">
          Sign up
        </v-btn>
        <v-btn rounded color="primary" @click="linkTo('login', {})">
          Log in
        </v-btn>
      </template>
      <template v-else>
        <v-btn color="primary" fab small dark @click="logout()">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "../store/actions.type.js";

export default {
  name: "RwvHeader",
  data: () => ({
    drawer: null
  }),
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.go({ name: "home" });
      });
    },
    linkTo(route, params) {
      if (params.length === 0) {
        this.$router.push({ name: route });
      }
      this.$router.push({ name: route, params: params });
    }
  }
};
</script>
