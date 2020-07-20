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
              Dashboard
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-if="isAuthenticated">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title @click="linkTo('settings', {})"
                >Profile
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
                  linkTo('history-edit', { username: currentUser.username })
                "
              >
                New History
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-heart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title @click="linkTo('profile', {})">
                Favorited Histories
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title @click="linkTo('profile-favorites')">
                My Histories
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-btn color="primary" fab small dark @click="linkTo('home', {})">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="!isAuthenticated">
        <v-btn rounded color="primary" dark @click="linkTo('register', {})">
          Sign up
        </v-btn>
        <hr />
        <v-btn rounded color="normal" dark @click="linkTo('login', {})">
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
        this.$router.push({ name: "home" });
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
