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
        <template v-if="isAuthenticated">
          <v-list-item
            @click="linkTo('story-edit', { username: currentUser.username })"
          >
            <h3 class="basil--text">
              <v-icon>mdi-pencil</v-icon>
              New story
            </h3>
          </v-list-item>
          <v-list-item @click="linkTo('profile', {})">
            <h3 class="basil--text">
              <v-icon>mdi-heart</v-icon>
              Favorited stories
            </h3>
          </v-list-item>
          <v-list-item @click="linkTo('profile-favorites')">
            <h3 class="basil--text">
              <v-icon>mdi-format-list-bulleted-square</v-icon>
              My stories
            </h3>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <h3 class="basil--text">
          MyStories
        </h3>
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
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-badge
              v-if="currentUser.profile"
              :content="messages.length"
              :value="messages"
              color="blue"
              overlap
            >
              <v-avatar
                v-bind="attrs"
                color="grey lighten-2"
                v-on="on"
                size="40"
              >
                <v-img :src="currentUser.profile.image"></v-img>
              </v-avatar>
            </v-badge>
            <v-badge
              v-else
              :content="messages"
              :value="messages"
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
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT, FETCH_MESSAGES } from "../store/actions.type.js";

export default {
  name: "RwvHeader",
  data: () => ({
    drawer: null,
    polling: null,
    preview: "https://picsum.photos/510/300?random"
  }),
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated", "messages"])
  },
  methods: {
    pollMessages() {
      this.polling = setInterval(() => {
        this.$store.dispatch(FETCH_MESSAGES);
      }, 9000);
    },
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
  },
  created() {
    this.pollMessages();
  },
  beforeDestroy() {
    clearInterval(this.polling);
  }
};
</script>
