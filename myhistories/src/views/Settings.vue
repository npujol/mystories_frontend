<template>
  <section>
    <div>
      <h1>Your Settings</h1>
      <hr />

      <form @submit.prevent="updateSettings()">
        <section>
          <b-field class="file">
            <div
              class="image-preview"
              v-if="currentUser.profile.image.length > 0"
            >
              <figure class="image is-128x128">
                <img class="is-rounded" :src="currentUser.profile.image" />
              </figure>
            </div>
            <hr />
            <!-- <b-upload
              v-model="currentUser.profile.image"
              class="button is-primary"
              accept="image/*"
            >
              <b-icon icon="upload"></b-icon>
            </b-upload> -->
            <b-input
              type="file"
              icon="upload"
              class="button is-primary"
              @change.native="previewImage"
              accept="image/*"
            />
          </b-field>
          <b-field label="Email">
            <b-input
              type="email"
              v-model="currentUser.email"
              placeholder="Email"
              maxlength="30"
            >
            </b-input>
          </b-field>

          <b-field label="Username">
            <b-input
              v-model="currentUser.profile.username"
              placeholder="Username"
              maxlength="30"
            ></b-input>
          </b-field>

          <b-field label="Bio">
            <b-input
              maxlength="200"
              type="textarea"
              v-model="currentUser.profile.bio"
              placeholder="Short bio about you"
            ></b-input>
          </b-field>
          <b-field>
            <b-button native-type="submit" class="button is-primary">
              Update
            </b-button>
          </b-field>
        </section>
      </form>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT, UPDATE_USER } from "../store/actions.type.js";

export default {
  name: "RwvSettings",
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    updateSettings() {
      this.$store.dispatch(UPDATE_USER, this.currentUser).then(() => {
        this.$router.push({ name: "home" });
      });
    },
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: "home" });
      });
    },
    previewImage(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.currentUser.profile.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
  }
};
</script>
