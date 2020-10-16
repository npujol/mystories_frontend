<!-- @format -->

<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item @click="linkTo('home', {})">
          <h3 class="basil--text align-center">
            <v-icon>mdi-view-dashboard</v-icon>
            Dashboard
          </h3>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title @click="linkTo('home', {})">
        <h3 class="basil--text">
          MyStories
        </h3>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="isAuthenticated && currentUser.profile">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-badge
              icon="mdi-email"
              :value="isNewMessage"
              color="blue"
              overlap
            >
              <v-avatar
                v-bind="attrs"
                color="grey lighten-2"
                v-on="on"
                size="40"
              >
                <v-img :src="preview"></v-img>
              </v-avatar>
            </v-badge>
          </template>
          <v-list>
            <v-list-item
              @click="linkTo('settings', { username: currentUser.username })"
            >
              <v-list-item-title>
                <v-icon>mdi-account-circle</v-icon> Profile
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="
                linkTo('notifications', { username: currentUser.username })
              "
            >
              <v-list-item-title>
                <v-icon>mdi-bell</v-icon> Notifications
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout()">
              <v-list-item-title
                ><v-icon>mdi-logout</v-icon> Logout</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-btn rounded color="error" @click="linkTo('register', {})">
          Sign up
        </v-btn>
        <v-btn rounded color="primary" @click="linkTo('login', {})">
          Log in
        </v-btn>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT, FETCH_OPENED_MESSAGES } from "../store/actions.type.js";

export default {
  name: "RwvHeader",
  data: () => ({
    drawer: null,
    polling: null
  }),
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated", "countNewMessages"]),
    isNewMessage() {
      if (this.countNewMessages) {
        return this.countNewMessages > 0 ? 1 : null;
      } else {
        return null;
      }
    },
    preview() {
      return this.currentUser.profile.image
        ? this.currentUser.profile.image
        : "https://picsum.photos/510/300?random";
    }
  },
  methods: {
    pollMessages() {
      if (this.isAuthenticated) {
        this.polling = setInterval(() => {
          this.$store.dispatch(FETCH_OPENED_MESSAGES);
        }, 15000);
      }
    },
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        if (this.$router.currentRoute.name !== "home") {
          this.$router.push({ name: "home" });
        } else {
          this.$router.go({ name: "home" });
        }
      });
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
  },
  created() {
    this.pollMessages();
  },
  beforeDestroy() {
    clearInterval(this.polling);
  }
};
</script>
