<template>
  <section>
    <div>
      <h1>Your Settings</h1>
      <hr />

      <form @submit.prevent="updateSettings()">
        <section>
          <field class="file">
            <div
              class="image-preview"
              v-if="currentUser.profile.image.length > 0"
            >
              <figure class="image is-128x128">
                <img class="is-rounded" :src="currentUser.profile.image" />
              </figure>
            </div>
            <hr />
            <!-- <upload
              v-model="currentUser.profile.image"
              class="button is-primary"
              accept="image/*"
            >
              <icon icon="upload"></icon>
            </upload> -->
            <input
              type="file"
              icon="upload"
              class="button is-primary"
              @change.native="previewImage"
              accept="image/*"
            />
          </field>
          <field label="Email">
            <input
              type="email"
              v-model="currentUser.email"
              placeholder="Email"
              maxlength="30"
            />
          </field>

          <field label="Username">
            <input
              v-model="currentUser.profile.username"
              placeholder="Username"
              maxlength="30"
            />
          </field>

          <field label="Bio">
            <input
              maxlength="200"
              type="textarea"
              v-model="currentUser.profile.bio"
              placeholder="Short bio about you"
            />
          </field>
          <field>
            <button native-type="submit" class="button is-primary">
              Update
            </button>
          </field>
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
