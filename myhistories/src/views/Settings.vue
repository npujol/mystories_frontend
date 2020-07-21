<template>
  <v-row class="d-flex justify-center">
    <v-col>
      <v-card>
        <v-card-title class="headline" dark>Your Settings</v-card-title>
        <v-card-text>
          <v-form>
            <v-img height="200" width="200" :src="currentUser.profile.image">
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
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT, UPDATE_USER } from "../store/actions.type.js";

export default {
  name: "RwvSettings",
  data() {
    return {
      valid: false,
      rules: {
        photo: v =>
          !v || v.size < 2000000 || "Avatar size should be less than 2 MB!"
      }
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    updateSettings() {
      this.$store.dispatch(UPDATE_USER, this.currentUser).then(() => {
        this.$router.push({ name: "home" });
      });
    },
    previewImage(file) {
      var reader = new FileReader();
      reader.onload = e => {
        this.currentUser.profile.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>
