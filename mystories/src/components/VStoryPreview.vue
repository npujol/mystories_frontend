<template>
  <v-card
    class="flex-grow-0 flex-shrink-0 pa-2 mx-auto"
    elevation="12"
    outlined
    tile
  >
    <v-img :src="story.image" class="white--text align-end" height="200px">
      <v-card-title>
        {{ story.title }} by {{ story.author.username }}
      </v-card-title>
    </v-img>

    <v-card-text class="aling-self-center justify-self-center">
      <div>
        Created: {{ story.createdAt | date }} - Updated
        {{ story.updatedAt | date }}
      </div>
      <h1 class="display-1 text--primary">
        {{ story.title }}
      </h1>
      by {{ story.author.username }}
      <v-avatar
        @click="linkTo('profile', { username: story.author.username })"
        color="grey"
      >
        <img class="is-rounded" :src="story.author.image" />
      </v-avatar>
      <div class="text--primary">
        {{ story.description }}
      </div>
      <TagList :tags="story.tags" />
    </v-card-text>
    <router-view></router-view>

    <v-card-actions>
      <v-btn
        elevation="12"
        color="primary accent-4"
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
