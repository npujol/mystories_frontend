<template>
  <v-card class="pa-2 mx-auto" outlined tile>
    <v-card-title>
      <h3 class="font-weight-bold basil--text">
        New story
      </h3>
    </v-card-title>
    <v-spacer></v-spacer>
    <v-card-text>
      <RwvListErrors :errors="errors" />
      <v-form>
        <v-text-field
          label="Title"
          name="title"
          type="text"
          v-model="story.title"
          placeholder="Title"
        ></v-text-field>
        <v-textarea
          label="Description"
          v-model="story.description"
        ></v-textarea>
        <v-textarea
          label="Body"
          @input="update"
          outlined
          full-width
          v-model="story.body"
        ></v-textarea>
        <div elevation="12" v-html="compiledMarkdown"></div>
        <v-layout wrap>
          <v-flex xs12>
            <v-combobox
              multiple
              v-model="story.tags"
              label="Tags"
              append-icon
              chips
              deletable-chips
              class="tag-input"
              :search-input.sync="search"
              @keyup.tab="updateTags"
              @paste="updateTags"
            >
            </v-combobox>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        :disabled="inProgress"
        @click="onPublish(story.slug)"
        >Aceptar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import RwvListErrors from "@/components/ListErrors.vue";
import {
  STORY_PUBLISH,
  STORY_EDIT,
  FETCH_STORY,
  STORY_EDIT_ADD_TAG,
  STORY_EDIT_REMOVE_TAG,
  STORY_RESET_STATE
} from "@/store/actions.type.js";

export default {
  name: "RwvStoryEdit",
  components: { RwvListErrors },
  props: {
    previousStory: {
      type: Object,
      required: false
    }
  },
  async beforeRouteUpdate(to, from, next) {
    // Reset state if user goes from /editor/:id to /editor
    // The component is not recreated so we use to hook to reset the state.
    await store.dispatch(STORY_RESET_STATE);
    return next();
  },
  async beforeRouteEnter(to, from, next) {
    // SO: https://github.com/vuejs/vue-router/issues/1034
    // If we arrive directly to this url, we need to fetch the story
    await store.dispatch(STORY_RESET_STATE);
    if (to.params.slug !== undefined) {
      await store.dispatch(
        FETCH_STORY,
        to.params.slug,
        to.params.previousStory
      );
    }
    return next();
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch(STORY_RESET_STATE);
    next();
  },
  data() {
    return {
      inProgress: false,
      errors: {},
      valid: false,
      input: "# hello",
      items: [],
      search: "" //sync search
    };
  },
  computed: {
    ...mapGetters(["story"]),
    compiledMarkdown: function() {
      return marked(this.story.body, { sanitize: true });
    }
  },
  methods: {
    onPublish(slug) {
      const action = slug ? STORY_EDIT : STORY_PUBLISH;
      this.inProgress = true;
      this.$store
        .dispatch(action)
        .then(data => {
          this.inProgress = false;
          this.$router.push({
            name: "story",
            params: { slug: data.slug }
          });
        })
        .catch(response => {
          this.inProgress = false;
          this.errors = JSON.parse(response.response.text).errors;
        });
    },
    updateTags() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(","));
        this.$nextTick(() => {
          this.search = "";
        });
      });
    },
    update() {
      _.debounce(function(e) {
        this.story.body = e.target.value;
      }, 300);
    }
  }
};
</script>
