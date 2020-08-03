<template>
  <v-card class="elevation mx-auto" aling="center">
    <v-card-title class="d-flex text-center justify-center">
      <h3 class="d-flex font-weight-bold basil--text">
        Login
      </h3>
    </v-card-title>
    <v-spacer></v-spacer>
    <v-card-text>
      <RwvListErrors :errors="errors" />
      <v-form>
        <v-text-field
          label="Email"
          name="Email"
          prepend-icon="mdi-mail"
          :rules="[rules.email, rules.length(5), rules.required]"
          filled
          v-model="email"
        ></v-text-field>
        <v-text-field
          id="password"
          label="Password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          :rules="[rules.password, rules.length(5), rules.required]"
          filled
          v-model="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="onSubmit(email, password)">Sign in</v-btn>
    </v-card-actions>
    <v-spacer></v-spacer>
    <v-card-text>
      <p>
        <router-link :to="{ name: 'register' }">
          Need an account?
        </router-link>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { LOGIN } from "../store/actions.type.js";
import RwvListErrors from "../components/ListErrors.vue";

export default {
  name: "RwvLogin",
  components: { RwvListErrors },
  data() {
    return {
      email: null,
      password: null,
      valid: false,
      rules: {
        email: v =>
          !!(v || "").match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) || "Please enter a valid email",
        length: len => v =>
          (v || "").length >= len ||
          `Invalid character length, required ${len}`,
        password: v =>
          !!(v || "").match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
          ) ||
          "Password must contain an upper case letter, a numeric character, and a special character",
        required: v => !!v || "This field is required"
      }
    };
  },
  methods: {
    onSubmit(email, password) {
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
