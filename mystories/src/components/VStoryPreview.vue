<template>
  <v-card outlined>
    <v-list-item>
      <v-list-item-avatar
        color="grey"
        @click="linkTo('profile', { username: story.owner.username })"
      >
        <img class="is-rounded" :src="story.owner.image"
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
              params: { username: story.owner.username }
            }"
            >{{ story.owner.username }}</router-link
          >
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-img :src="story.image" class="white--text align-end" height="200px">
    </v-img>
    <v-card-text>
      <p class="d-flex text-center justify-center">
        {{ story.description }}
      </p>
    </v-card-text>
    <v-chip-group class="flex ma-5" active-class="primary--text">
      <RwvTag v-for="(value, index) in story.tags" :tag="value" :key="index">
      </RwvTag>
    </v-chip-group>
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
import RwvTag from "./VTag.vue";
import RwvStoryActions from "./StoryActions.vue";

export default {
  name: "RwvStoryPreview",
  components: {
    RwvTag,
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
