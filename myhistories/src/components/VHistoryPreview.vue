<template>
  <v-card max-width="344" class="mx-auto">
    <v-list-item>
      <v-list-item-avatar color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title
          class="headline"
          @click="
            linkTo('history', {
              slug: history.slug
            })
          "
        >
          {{ history.title }}
        </v-list-item-title>

        <v-list-item-subtitle>
          by

          <v-avatar
            @click="linkTo('profile', { username: history.author.username })"
          >
            <img class="is-rounded" :src="history.author.image" />
          </v-avatar>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
      height="194"
    ></v-img>

    <v-card-text>
      <p>{{ history.createdAt | date }}</p>
      <p>{{ history.description }}</p>
      <TagList :tags="history.tags" />
      <router-view></router-view>
    </v-card-text>

    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
        @click="
          linkTo('history', {
            slug: history.slug
          })
        "
      >
        <span> Read more </span>
      </v-btn>
      <v-spacer></v-spacer>
      <template v-if="isCurrentUser()">
        <v-btn icon @click="linkTo('history-edit', { slug: history.slug })">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon @color="color">mdi-heart</v-icon>
          <span> {{ history.favoritesCount }} </span>
        </v-btn>
      </template>
      <template v-else>
        <v-btn icon @click="toggleFavorite">
          <v-icon @color="color">mdi-heart</v-icon>
          <span> {{ history.favoritesCount }} </span>
        </v-btn>
      </template>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import TagList from "./TagList.vue";
import {
  FAVORITE_ADD,
  FAVORITE_REMOVE,
  FETCH_PROFILE_FOLLOW,
  FETCH_PROFILE_UNFOLLOW
} from "@/store/actions.type.js";

export default {
  name: "RwvHistoryPreview",
  components: {
    TagList
  },
  props: {
    history: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"]),
    color() {
      let color = this.history.favorited === "true" ? "success" : "blue-grey";
      return color;
    }
  },
  methods: {
    linkTo(route, params) {
      if (params.length === 0) {
        this.$router.push({ name: route });
      }
      this.$router.push({ name: route, params: params });
    },
    isCurrentUser() {
      if (this.currentUser.username && this.history.author.username) {
        return this.currentUser.username === this.history.author.username;
      }
    },
    toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      let action =
        this.history.favorited === "false" ? FAVORITE_ADD : FAVORITE_REMOVE;
      this.$store.dispatch(action, this.history.slug);
    }
  }
};
</script>
