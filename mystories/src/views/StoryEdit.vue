<template>
  <v-card class="pa-2 mx-auto" min-width="80%" oaling="center">
    <v-card-title class="d-flex text-center justify-center">
      <h3 class="font-weight-bold basil--text">
        Story
      </h3>
    </v-card-title>
    <v-img
      aling="center"
      class="white--text align-end"
      height="200px"
      :src="preview"
    >
    </v-img>
    <v-spacer></v-spacer>
    <v-card-text aling="center">
      <RwvListErrors :errors="errors" />
      <v-form>
        <v-file-input
          :rules="[rules.photo]"
          name="avatar"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Avatar"
          hide-input
          @change="previewImage"
        >
        </v-file-input>
        <v-text-field
          label="Title"
          name="title"
          type="text"
          v-model="story.title"
          placeholder="Title"
        ></v-text-field>
        <v-select
          v-model="story.language"
          :items="items"
          label="Language"
          dense
        ></v-select>
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
        <v-checkbox
          v-if="!story.slug"
          v-model="generateAudio"
          label="Generate Audio"
        ></v-checkbox>
      </v-form>
      <v-textarea label="Description" v-model="story.description"></v-textarea>
      <v-textarea
        label="Body"
        outlined
        full-width
        v-model="story.bodyMarkdown"
      ></v-textarea>
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
  FETCH_STORY_PRIVATE,
  TAG_STORY_EDIT_CREATE,
  TAG_STORY_EDIT_DELETE,
  STORY_RESET_STATE,
  STORY_AUDIO_CREATE
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
    if (to.params.slug) {
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
      items: ["en", "es", "de"],
      search: "", //sync search
      preview: "https://picsum.photos/510/300?random",
      rules: {
        photo: v =>
          !v || v.size < 2000000 || "Avatar size should be less than 2 MB!"
      },
      generateAudio: false
    };
  },
  mounted() {
    if (this.story.image) {
      this.preview = this.story.image;
    }
    this.getBodyMarkdown();
  },
  computed: {
    ...mapGetters(["story"])
  },
  methods: {
    async onPublish(slug) {
      try {
        const action = slug ? STORY_EDIT : STORY_PUBLISH;
        this.inProgress = true;
        var story = this.story;
        var generateAudio = this.generateAudio;
        const data = await this.$store.dispatch(action, {
          story,
          generateAudio
        });
        this.inProgress = false;
        this.$router.push({ name: "story", params: { slug: data.slug } });
      } catch (error) {
        this.inProgress = false;
        this.errors = JSON.parse(error.response.text).errors;
      }
    },
    updateTags() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(","));
        this.$nextTick(() => {
          this.search = "";
        });
      });
    },
    previewImage(file) {
      var reader = new FileReader();
      this.story.image = file;
      reader.onload = e => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async getBodyMarkdown() {
      if (this.story.slug) {
        try {
          const data = await this.$store.dispatch(FETCH_STORY_PRIVATE, {
            slug: this.story.slug
          });
          this.story.bodyMarkdown = data.bodyMarkdown;
        } catch (error) {
          this.errors = JSON.parse(error.response.text).errors;
        }
      }
    }
  }
};
</script>
