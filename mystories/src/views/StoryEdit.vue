<template>
  <v-card min-width="80%" class="elevation mx-auto" aling="center">
    <v-card-title class="headline">
      <h3 class="d-flex font-weight-bold basil--text">
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
          rows="5"
          v-model="story.description"
        ></v-textarea>
        <v-textarea label="Body" rows="5" v-model="story.body"></v-textarea>
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
  HISTORY_PUBLISH,
  HISTORY_EDIT,
  FETCH_HISTORY,
  HISTORY_EDIT_ADD_TAG,
  HISTORY_EDIT_REMOVE_TAG,
  HISTORY_RESET_STATE
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
    await store.dispatch(HISTORY_RESET_STATE);
    return next();
  },
  async beforeRouteEnter(to, from, next) {
    // SO: https://github.com/vuejs/vue-router/issues/1034
    // If we arrive directly to this url, we need to fetch the story
    await store.dispatch(HISTORY_RESET_STATE);
    if (to.params.slug !== undefined) {
      await store.dispatch(
        FETCH_HISTORY,
        to.params.slug,
        to.params.previousStory
      );
    }
    return next();
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch(HISTORY_RESET_STATE);
    next();
  },
  data() {
    return {
      inProgress: false,
      errors: {},
      valid: false,
      items: [],
      search: "" //sync search
    };
  },
  computed: {
    ...mapGetters(["story"])
  },
  methods: {
    onPublish(slug) {
      const action = slug ? HISTORY_EDIT : HISTORY_PUBLISH;
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
    }
  }
};
</script>
