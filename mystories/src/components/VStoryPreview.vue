<template>
  <v-card outlined>
    <v-list-item>
      <v-list-item-avatar
        color="grey"
        @click="linkTo('profile', { username: story.author.username })"
      >
        <img class="is-rounded" :src="story.author.image"
      /></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{
          story.title
        }}</v-list-item-title>
        <v-list-item-subtitle>
          by
          <router-link
            class="logo-font"
            :to="{
              name: 'profile',
              params: { username: story.author.username }
            }"
            >{{ story.author.username }}</router-link
          >
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-img :src="story.image" class="white--text align-end" height="200px">
    </v-img>
    <v-card-text>
      {{ story.description }}
    </v-card-text>
    <TagList :tags="story.tags" />
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
      <RwvStoryActions :isPreview="true" :story="story" />
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
    }
  }
};
</script>
