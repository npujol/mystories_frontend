<template>
  <div>
    <v-row class="d-flex justify-center">
      <v-col>
        <v-card class="elevation mx-auto">
          <v-card-title class="headline" dark>Login</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                name="Email"
                prepend-icon="mdi-mail"
                :rules="[rules.email, rules.length(5)]"
                type="text"
                required
                filled
                v-model="email"
              ></v-text-field>
              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                :rules="[rules.password, rules.length(6)]"
                required
                filled
                v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="mr-4" @click="onSubmit(email, password)"
              >Sign in</v-btn
            >
          </v-card-actions>
          <v-spacer></v-spacer>
          <v-card-text>
            <p class="text-xs-center">
              <router-link :to="{ name: 'register' }">
                Need an account?
              </router-link>
            </p></v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { LOGIN } from "../store/actions.type.js";

export default {
  name: "RwvLogin",
  data() {
    return {
      email: null,
      password: null,
      valid: false,
      rules: {
        email: v => (v || "").match(/@/) || "Please enter a valid email",
        length: len => v =>
          (v || "").length >= len ||
          `Invalid character length, required ${len}`,
        password: v =>
          (v || "").match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
          ) ||
          "Password must contain an upper case letter, a numeric character, and a special character",
        required: v => !!v || "This field is required"
      }
    };
  },
  methods: {
    onSubmit(email, password) {
      console.log(email, password);
      this.$store
        .dispatch(LOGIN, { email, password })
        .then(() => this.$router.push({ name: "home" }));
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
};
</script>
