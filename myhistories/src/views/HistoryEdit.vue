<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="12">
      <v-card>
        <v-card-title class="headline" dark>New History</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Title"
              name="title"
              prepend-icon="mdi-pencil"
              type="text"
              v-model="history.title"
              placeholder="Title"
            ></v-text-field>
            <v-textarea
              prepend-icon="mdi-pencil"
              label="Description"
              rows="5"
              v-model="history.description"
            ></v-textarea>
            <v-textarea
              label="Body"
              prepend-icon="mdi-pencil"
              rows="5"
              v-model="history.body"
            ></v-textarea>
            <v-layout wrap>
              <v-flex xs12>
                <v-combobox
                  multiple
                  v-model="history.tags"
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
            class="mr-4"
            :disabled="inProgress"
            @click="onPublish(history.slug)"
            >Aceptar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
// import RwvListErrors from "@/components/ListErrors.vue";
import {
  HISTORY_PUBLISH,
  HISTORY_EDIT,
  FETCH_HISTORY,
  HISTORY_EDIT_ADD_TAG,
  HISTORY_EDIT_REMOVE_TAG,
  HISTORY_RESET_STATE
} from "@/store/actions.type.js";

export default {
  name: "RwvHistoryEdit",
  // components: { RwvListErrors },
  props: {
    previousHistory: {
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
    // If we arrive directly to this url, we need to fetch the history
    await store.dispatch(HISTORY_RESET_STATE);
    if (to.params.slug !== undefined) {
      await store.dispatch(
        FETCH_HISTORY,
        to.params.slug,
        to.params.previousHistory
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
      select: ["add-tags-with", "enter", "tab", "paste"],
      items: [],
      search: "" //sync search
    };
  },
  computed: {
    ...mapGetters(["history"])
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
            name: "history",
            params: { slug: data.slug }
          });
        })
        .catch(response => {
          this.inProgress = false;
          this.errors = response.errors;
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
