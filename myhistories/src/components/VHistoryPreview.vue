<template>
  <v-card
    style="min-width: 80%; max-width: 100%;"
    class="flex-grow-1 flex-shrink-0"
    tile
    outlined
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title
          class="d-flex text-center justify-center headline"
          @click="
            linkTo('history', {
              slug: history.slug
            })
          "
        >
          <h1 class="d-flex font-weight-bold basil--text text-center">
            {{ history.title }}
          </h1>
        </v-list-item-title>

        <v-list-item-subtitle>
          by
          <v-list-item-avatar
            @click="linkTo('profile', { username: history.author.username })"
            color="grey"
          >
            <img class="is-rounded" :src="history.author.image" />
          </v-list-item-avatar>
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
      <RwvHistoryActions :history="history" :canModify="isCurrentUser()" />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import TagList from "./TagList.vue";
import RwvHistoryActions from "./HistoryActions.vue";

export default {
  name: "RwvHistoryPreview",
  components: {
    TagList,
    RwvHistoryActions
  },
  props: {
    history: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
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
    }
  }
};
</script>
