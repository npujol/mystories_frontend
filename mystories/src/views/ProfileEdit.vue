<template>
  <ValidationObserver ref="obs">
    <v-card slot-scope="{ invalid, validated }">
      <v-card-title class="d-flex text-center justify-center">
        <h3 class="d-flex font-weight-bold basil--text">
          Settings
        </h3>
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
          v-model="currentUser.username"
          label="Username"
          prepend-icon="mdi-account"
          disabled
          filled
        ></v-text-field>
        <v-text-field
          v-model="currentUser.email"
          label="E-mail"
          prepend-icon="mdi-mail"
          filled
          disabled
        ></v-text-field>
        <v-form>
          <ValidationProvider name="bio" rules="required">
            <v-textarea
              slot-scope="{ errors, valid }"
              :success="valid"
              :error-messages="errors"
              v-model="currentUser.profile.bio"
              :counter="250"
              auto-grow
              prepend-icon="mdi-pencil"
              label="Bio"
              rows="5"
            ></v-textarea>
          </ValidationProvider>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="clear">Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="linkTo('home', {})">Cancel</v-btn>
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
  LOGOUT,
  PROFILE_UPDATE,
  FETCH_PROFILE
} from "../store/actions.type.js";
import { imageUpdate } from "../components/mixins/imageUpdate.js";
import { linkTo } from "../components/mixins/linkTo.js";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: "ProfileEdit",
  mixins: [imageUpdate, linkTo],
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      rules: {
        photo: v =>
          !v || v.size < 2000000 || "Avatar size should be less than 2 MB!"
      }
    };
  },
  async beforeRouteUpdate(to, from, next) {
    await store.dispatch(FETCH_PROFILE, { username: to.params.username });
    return next();
  },
  async beforeRouteEnter(to, from, next) {
    await store.dispatch(FETCH_PROFILE, { username: to.params.username });
    return next();
  },
  mounted() {
    if (this.profile.image) {
      this.preview = this.profile.image;
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    ...mapGetters(["currentUser", "profile"])
  },
  methods: {
    async clear() {
      this.profile.bio = this.email = this.password = "";
      this.$nextTick(() => {
        this.$refs.obs.reset();
      });
    },
    async submit() {
      const validated = await this.$refs.obs.validate();
      if (validated) {
        try {
          const data = await store.dispatch(PROFILE_UPDATE, {
            currentUser: this.currentUser,
            image: this.imageFile
          });
          this.$router.push({ name: "home" });
        } catch (response) {
          const errors = JSON.parse(response.response.text).errors;
          this.$refs.obs.setErrors({
            username: errors.username,
            email: errors.email,
            bio: errors.bio,
            image: errors.image
          });
        }
      }
    }
  }
};
</script>
