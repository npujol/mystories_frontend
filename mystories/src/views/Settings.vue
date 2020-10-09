<template>
  <v-card min-width="80%" class="pa-2 mx-auto" aling="center">
    <v-card-title class="d-flex text-center justify-center">
      <h3 class=" font-weight-bold basil--text">
        Yours settings
      </h3>
    </v-card-title>
    <v-spacer></v-spacer>
    <v-card-text aling="center">
      <RwvListErrors :errors="errors" />
      <v-form>
        <v-img aling="center" height="200px" class="is-rounded" :src="preview">
        </v-img>
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
          label="Username"
          name="username"
          prepend-icon="mdi-account"
          type="text"
          v-model="currentUser.username"
          disabled
        ></v-text-field>
        <v-text-field
          label="Email"
          name="Email"
          v-model="currentUser.email"
          prepend-icon="mdi-mail"
          type="text"
          disabled
        ></v-text-field>
        <v-textarea
          auto-grow
          label="Bio"
          rows="5"
          v-model="currentUser.profile.bio"
        ></v-textarea>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="mr-4" @click="updateSettings()">Update</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { LOGOUT, UPDATE_USER, FETCH_PROFILE } from "../store/actions.type.js";
import RwvListErrors from "../components/ListErrors.vue";

export default {
  name: "RwvSettings",
  components: { RwvListErrors },
  data() {
    return {
      errors: {},
      valid: false,
      preview: "https://picsum.photos/510/300?random",
      imagefile: null,
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
    ...mapGetters(["currentUser", "profile"])
  },
  methods: {
    async updateSettings() {
      try {
        const data = await store.dispatch(UPDATE_USER, {
          currentUser: this.currentUser,
          image: this.imagefile
        });
        this.$router.push({ name: "home" });
      } catch (error) {
        console.log(error);
        this.inProgress = false;
        // this.errors = JSON.parse(error.response.text).errors;
      }
    },
    previewImage(file) {
      var reader = new FileReader();
      this.imagefile = file;
      reader.onload = e => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>
