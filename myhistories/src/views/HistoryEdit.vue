<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <RwvListErrors :errors="errors" />
          <form @submit.prevent="onPublish(history.slug)">
            <fieldset :disabled="inProgress">
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="history.title"
                  placeholder="History Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="history.description"
                  placeholder="What's this history about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  v-model="history.body"
                  placeholder="Write your history (in markdown)"
                >
                </textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tagInput"
                  @keypress.enter.prevent="addTag(tagInput)"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="(tag, index) of history.tagList"
                    :key="tag + index"
                  >
                    <i class="ion-close-round" @click="removeTag(tag)"> </i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
            </fieldset>
            <button
              :disabled="inProgress"
              class="btn btn-lg pull-xs-right btn-primary"
              type="submit"
            >
              Publish History
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
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
  name: "RwvHistoryEdit",
  components: { RwvListErrors },
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
      tagInput: null,
      inProgress: false,
      errors: {}
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
    removeTag(tag) {
      this.$store.dispatch(HISTORY_EDIT_REMOVE_TAG, tag);
    },
    addTag(tag) {
      this.$store.dispatch(HISTORY_EDIT_ADD_TAG, tag);
      this.tagInput = null;
    }
  }
};
</script>
