<template>
  <div
    class="column is-4 is-offset-1 has-margin-top-auto has-margin-bottom-auto"
  >
    <div class="info is-size-5">
      <div class="title">
        <h2 class="has-text-black is-family-secondary has-text-weight-bold">
          <router-link
            :to="{
              name: 'story',
              params: {
                slug: story.slug
              }
            }"
            class="preview-link"
          >
            {{ story.title }}
          </router-link>
        </h2>
      </div>

      <router-link
        :to="{
          name: 'profile',
          params: { username: story.author.username }
        }"
        class="author"
      >
        <p>Author: {{ story.author.username }}</p>
        <p></p
      ></router-link>

      <p>{{ story.createdAt | date }}</p>
    </div>
    <p v-text="story.description" />

    <rwv-story-actions
      v-if="actions"
      :story="story"
      :canModify="isCurrentUser()"
    ></rwv-story-actions>
    <button
      v-else
      @click="toggleFavorite"
      :class="{
        'button is-primary': story.favorited,
        'button is-light': !story.favorited
      }"
    >
      <span class="counter"> {{ story.favoritesCount }} </span>
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RwvStoryActions from "@/components/StoryActions.vue";
import { FAVORITE_ADD, FAVORITE_REMOVE } from "@/store/actions.type.js";

export default {
  name: "RwvStoryMeta",
  components: {
    RwvStoryActions
  },
  props: {
    story: {
      type: Object,
      required: true
    },
    actions: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  methods: {
    isCurrentUser() {
      if (this.currentUser.username && this.story.author.username) {
        return this.currentUser.username === this.story.author.username;
      }
      return false;
    },
    toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action = this.story.favorited ? FAVORITE_REMOVE : FAVORITE_ADD;
      this.$store.dispatch(action, this.story.slug);
    }
  }
};
</script>
