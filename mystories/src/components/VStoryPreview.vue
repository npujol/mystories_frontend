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
        <v-list-item-title class="headline align-center">
          {{ story.title }}
        </v-list-item-title>
        <v-list-item-subtitle
          class="text-decoration-underline primary--text"
          @click="linkTo('profile', { username: story.owner.username })"
        >
          {{ story.owner.username }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-img :src="story.image" height="200px"> </v-img>
    <v-card-text>
      <p class="d-flex text-center justify-center">
        {{ story.description }}
      </p>
    </v-card-text>
    <v-chip-group class="flex pa-5" show-arrows>
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
      <RwvStoryActions
        v-if="isAuthenticated"
        :isPreview="true"
        :story="story"
      />
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
        if (this.$router.currentRoute.name !== route) {
          this.$router.push({ name: route });
        }
      }
      if (this.$router.currentRoute.name !== route) {
        this.$router.push({ name: route, params: params });
      }
    }
  }
};
</script>
