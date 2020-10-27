<template>
  <ValidationObserver ref="obs">
    <v-card slot-scope="{ invalid, validated }">
      <v-card-title class="d-flex text-center justify-center">
        <h3 class="d-flex font-weight-bold basil--text">Story</h3>
      </v-card-title>
      <v-alert v-if="errors && errors.error" dismissible type="error">
        {{ errors.error | error }}
      </v-alert>
      <v-card-text>
        <v-img aling="center" height="200px" class="is-rounded" :src="preview">
        </v-img>
        <v-file-input
          :error-messages="errors"
          :rules="[rules.photo]"
          name="image"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an image"
          prepend-icon="mdi-camera"
          label="image"
          hide-input
          @change="previewImage"
        >
        </v-file-input>

        <v-form>
          <ValidationProvider immediate name="title" rules="required|alpha_num">
            <v-text-field
              slot-scope="{ errors, valid }"
              :success="valid"
              :error-messages="errors"
              label="Title"
              name="title"
              type="text"
              v-model="story.title"
              placeholder="Title"
              prepend-icon="mdi-check"
              filled
            ></v-text-field>
          </ValidationProvider>
          <v-select
            :error-messages="errors"
            item-text="language"
            item-value="abbr"
            v-model="story.language"
            prepend-icon="mdi-spellcheck"
            :items="languages"
            label="Language"
            dense
          ></v-select>
          <v-layout wrap>
            <v-flex xs12>
              <v-combobox
                prepend-icon="mdi-tag"
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
            :error-messages="errors"
            prepend-icon="mdi-audiobook"
            v-if="!hadAudio"
            v-model="generateAudio"
            label="Generate Audio"
          ></v-checkbox>
          <ValidationProvider
            immediate
            name="description"
            rules="required|max:250"
          >
            <v-textarea
              slot-scope="{ errors, valid }"
              :success="valid"
              :error-messages="errors"
              prepend-icon="mdi-pencil"
              :counter="250"
              label="Description"
              v-model="story.description"
              rows="5"
            ></v-textarea>
          </ValidationProvider>
          <ValidationProvider immediate name="bodyMarkdown" rules="required">
            <v-textarea
              slot-scope="{ errors, valid }"
              :success="valid"
              :error-messages="errors"
              prepend-icon="mdi-pencil"
              label="Body"
              outlined
              full-width
              v-model="story.bodyMarkdown"
            ></v-textarea>
          </ValidationProvider>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="clear">Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="cancel">Cancel</v-btn>
        <v-btn color="primary" @click="submit" :disabled="invalid || !validated"
          >OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </ValidationObserver>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "@/store";
import {
  STORY_PUBLISH,
  FETCH_STORY,
  STORY_EDIT,
  TAG_STORY_EDIT_CREATE,
  TAG_STORY_EDIT_DELETE,
  STORY_RESET_STATE,
  FETCH_STORY_AUDIO
} from "../store/actions.type.js";
import { imageUpdate } from "../components/mixins/imageUpdate.js";
import { linkTo } from "../components/mixins/linkTo.js";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: "StoryFormBase",
  mixins: [imageUpdate, linkTo],
  components: { ValidationObserver, ValidationProvider },
  props: {
    isNew: {
      type: Boolean,
      required: true
    },
    story: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      input: "# hello",
      languages: [
        { abbr: "en", language: "English" },
        { abbr: "es", language: "Spanish" },
        { abbr: "de", language: "German" }
      ],
      search: "", //sync search
      generateAudio: false
    };
  },
  mounted() {
    if (!this.isNew) {
      if (this.story.image) {
        this.preview = this.story.image;
      }
    }
  },
  computed: {
    ...mapState({
      errors: (state) => state.auth.errors
    }),
    ...mapGetters(["storyAudio"]),
    hadAudio() {
      return this.storyAudio !== null;
    }
  },
  methods: {
    async clear() {
      await this.$store.dispatch(STORY_RESET_STATE);
      this.$nextTick(() => {
        this.$refs.obs.reset();
      });
    },
    async submit() {
      const validated = await this.$refs.obs.validate();
      if (validated) {
        try {
          const action = this.isNew ? STORY_PUBLISH : STORY_EDIT;
          const data = await this.$store.dispatch(action, {
            story: this.story,
            generateAudio: this.generateAudio,
            image: this.imageFile
          });
          this.$router.push({ name: "story", params: { slug: data.slug } });
        } catch (response) {
          const errors = JSON.parse(response.response.text).errors;
          this.$refs.obs.setErrors({
            title: errors.title,
            image: errors.image,
            description: errors.description,
            bodyMarkdown: errors.bodyMarkdown,
            language: errors.language
          });
        }
      }
    },
    cancel() {
      if (this.isNew) {
        this.$router.push({ name: "home" });
      } else {
        this.$router.push({ name: "story", params: { slug: this.story.slug } });
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
    async getEditData() {
      if (this.story.slug) {
        try {
          await this.$store.dispatch(FETCH_STORY_AUDIO, {
            slug: this.story.slug
          });
          this.generateAudio = this.storyAudio ? true : false;
        } catch {
          if (this.isNew) {
            this.$router.push({ name: "home" });
          } else {
            this.$router.push({ name: "story", params: { slug: data.slug } });
          }
        }
      }
    }
  }
};
</script>
