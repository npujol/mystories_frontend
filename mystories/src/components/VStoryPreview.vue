<template>
  <v-card min-width="80%" class="mx-auto" aling="center" tile outlined>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title
          class="d-flex text-center justify-center headline"
          aling="center"
          @click="
            linkTo('story', {
              slug: story.slug
            })
          "
        >
          <h2 class="d-flex font-weight-bold basil--text text-center">
            {{ story.title }}
          </h2>
        </v-list-item-title>
        <v-spacer></v-spacer>
        <v-list-item-subtitle
          class="d-flex text-center justify-center headline"
          aling="center"
        >
          <h3 class="d-flex font-weight-bold basil--text text-center">
            by {{ story.author.username }}
          </h3>
          <v-list-item-avatar
            @click="linkTo('profile', { username: story.author.username })"
            color="grey"
          >
            <img class="is-rounded" :src="story.author.image" />
          </v-list-item-avatar>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
      height="194"
    ></v-img>

    <v-card-text class="mx-auto">
      <div class="aling-center mx-auto" aling="center">
        <h4 class="d-flex font-weight-bold basil--text text-center">
          {{ story.createdAt | date }}
        </h4>
      </div>
      <div class="d-flex  mx-auto" aling="center">
        <p class="d-flex font-weight-bold basil--text text-center">
          {{ story.description }}
        </p>
      </div>
      <TagList :tags="story.tags" />
      <router-view></router-view>
    </v-card-text>

    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
        @click="
          linkTo('story', {
            slug: story.slug
          })
        "
      >
        <span> Read more </span>
      </v-btn>
      <v-spacer></v-spacer>
      <RwvStoryActions :story="story" :canModify="isCurrentUser()" />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import TagList from "./TagList.vue";
import RwvStoryActions from "./StoryActions.vue";

export default {
  name: "RwvStoryPreview",
  components: {
    TagList,
    RwvStoryActions
  },
  props: {
    story: {
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
      if (this.currentUser.username && this.story.author.username) {
        return this.currentUser.username === this.story.author.username;
      }
    }
  }
};
</script>
